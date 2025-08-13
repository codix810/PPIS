import type { NextRequest} from 'next/server';
import { connectDB } from '../../../../lid/db';
import IntPro from '../../../../models/IntPro';
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

    const IntProDoc = new IntPro({
      title,
      content,
      imageUrl,
      createdAt: new Date(),
    });

    await IntProDoc.save();

    return new Response(JSON.stringify({ message: 'IntPro added', IntPro: IntProDoc }), {
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
    const intPro = await IntPro.find();
    return NextResponse.json(intPro); // لازم تكون Array
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching intPro' }, { status: 500 });
  }
}