import { NextResponse } from 'next/server';
import axios from 'axios';

const IMGUR_CLIENT_ID = '14856f7d90ba140'; // Thay bằng Client ID của bạn

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ message: 'Invalid content type' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;

    if (!file) {
      return NextResponse.json({ message: 'Image data is required' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString('base64');

    const response = await axios.post(
      'https://api.imgur.com/3/image',
      {
        image: base64String,
        type: 'base64',
        title: title || 'Untitled',
        description: description || '',
      },
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      }
    );

    const imageUrl = response.data.data.link;
    return NextResponse.json({ link: imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { message: 'Error uploading image', error: (error as any).message },
      { status: 500 }
    );
  }
}
