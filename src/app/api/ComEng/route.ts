import type { NextRequest} from 'next/server';
import { connectDB } from '../../../../lid/db';
import ComEng from '../../../../models/ComEng';
import { NextResponse } from 'next/server';

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

    const ComEngDoc = new ComEng({
      title,
      content,
      imageUrl,
      createdAt: new Date(),
    });

    await ComEngDoc.save();

    return new Response(JSON.stringify({ message: 'ComEng added', ComEng: ComEngDoc }), {
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
export async function GET() {
  try {
    await connectDB();
    const comEng = await ComEng.find();
    return NextResponse.json(comEng); // لازم تكون Array
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching comEng' }, { status: 500 });
  }
}