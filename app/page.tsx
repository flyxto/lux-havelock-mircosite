import { Metadata } from 'next';
import { Camera, QrCode, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lumina Havelock Experience Portal',
  description: 'Access your high-quality souvenirs and digital memories from the Lumina Havelock experience.',
};

export default function RootPage() {
  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-center py-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-400">Lumina Havelock</span>
        </div>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10">
        <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-[2.5rem] p-8 text-center shadow-2xl flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
            <Camera className="w-8 h-8 text-white" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Capture Your Souvenir
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed px-2">
              Scan the custom QR code presented at the terminal display at the end of your Lumina experience.
            </p>
          </div>

          <div className="w-full border-t border-zinc-900 my-2" />

          {/* Guide Steps */}
          <div className="w-full flex flex-col gap-4 text-left">
            <div className="flex items-start gap-4 p-3 bg-zinc-900/30 rounded-xl border border-white/[0.02]">
              <div className="w-8 h-8 bg-violet-500/10 border border-violet-500/20 rounded-lg flex items-center justify-center text-violet-400 text-xs font-semibold shrink-0">
                1
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Scan QR Code</h3>
                <p className="text-xs text-zinc-500">Scan the QR code displayed at the photo booth with your phone's camera.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 bg-zinc-900/30 rounded-xl border border-white/[0.02]">
              <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/20 rounded-lg flex items-center justify-center text-teal-400 text-xs font-semibold shrink-0">
                2
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">View & Save</h3>
                <p className="text-xs text-zinc-500">Save the digital copy directly to your photo album or share it with friends.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 relative z-10">
        <p className="text-[10px] text-zinc-600 tracking-wider">
          © {new Date().getFullYear()} Lumina Havelock • Powered by FLYXTO
        </p>
      </footer>
    </main>
  );
}
