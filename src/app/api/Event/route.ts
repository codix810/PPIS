import type { NextRequest} from 'next/server';
import { connectDB } from '../../../../lid/db';
import Event from '../../../../models/Event';
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

    const EventDoc = new Event({
      title,
      content,
      imageUrl,
      createdAt: new Date(),
    });

    await EventDoc.save();

    return new Response(JSON.stringify({ message: 'Event added', Event: EventDoc }), {
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
    const event = await Event.find();
    return NextResponse.json(event); // لازم تكون Array
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching event' }, { status: 500 });
  }
}