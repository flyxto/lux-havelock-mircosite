import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || id.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(id);
    } catch (err) {
      return NextResponse.json(
        { success: false, error: 'Invalid MongoDB ObjectId' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('lux-havelock');
    const imageDoc = await db.collection('images').findOne({ _id: objectId });

    if (!imageDoc || !imageDoc['image-url']) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      );
    }

    const imageUrl = imageDoc['image-url'];
    
    // Fetch the image from the CDN
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch image from CDN' },
        { status: 502 }
      );
    }

    const blob = await response.blob();
    const contentType = blob.type || 'image/jpeg';
    
    // Derive filename from URL or fall back to ID
    const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1) || `image-${id}.jpg`;

    // Create a streaming response
    return new NextResponse(blob.stream(), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('Error in download api route:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
