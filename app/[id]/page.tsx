import { Metadata } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import MicrositeClient from './MicrositeClient';
import { ShieldAlert } from 'lucide-react';

interface RouteParams {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Lumina Havelock Experience`,
    description: `Retrieve, share and download your captured memory from the Lumina Havelock experience.`,
    openGraph: {
      title: 'Lumina Havelock Experience',
      description: 'Your captured memory is ready. View, share or download your photo.',
      type: 'website',
    },
  };
}

export default async function MicrositePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;

  if (!id || id.trim() === '') {
    return <ErrorState message="Request missing image identifier." />;
  }

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch (err) {
    return <ErrorState message="The scanned link contains an invalid identifier format." />;
  }

  try {
    const client = await clientPromise;
    const db = client.db('lux-havelock');
    const imageDoc = await db.collection('images').findOne({ _id: objectId });

    if (!imageDoc) {
      return <ErrorState message="We couldn't find your image. It may have expired or been removed." />;
    }

    const image = {
      id: imageDoc._id.toString(),
      imageUrl: imageDoc['image-url'],
      status: imageDoc.status || null,
      whatsappNumber: imageDoc['whatsapp-number'] || null,
    };

    return <MicrositeClient image={image} />;
  } catch (error) {
    console.error('Failed to fetch image from db:', error);
    return <ErrorState message="A database connection error occurred. Please try again later." />;
  }
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 text-center shadow-2xl relative z-10">
        <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-5 border border-red-500/20">
          <ShieldAlert className="w-6 h-6 text-red-400" />
        </div>
        
        <h2 className="text-xl font-semibold text-white tracking-tight mb-2">
          Unable to Retrieve Image
        </h2>
        
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          {message}
        </p>

        <div className="text-xs text-zinc-500 border-t border-zinc-800/80 pt-4">
          Please check the URL or try scanning the experience QR code once more.
        </div>
      </div>
    </main>
  );
}
