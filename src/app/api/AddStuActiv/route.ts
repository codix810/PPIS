import type { NextRequest } from 'next/server';
import { connectDB } from '../../../../lid/db';
import StuActiv from '../../../../models/StuActiv';

export async function POST(req: NextRequest) {
  try {
    const { title, content, imageUrl } = await req.json();

    if (!title || !content || !imageUrl) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const StuActivDoc = new StuActiv({
      title,
      content,
      imageUrl,
      createdAt: new Date(),
    });

    await StuActivDoc.save();

    return new Response(JSON.stringify({ message: 'StuActiv added', StuActiv: StuActivDoc }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
