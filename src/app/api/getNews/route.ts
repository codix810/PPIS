import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lid/db';
import News from '../../../../models/News';


export async function GET() {
  try {
    await connectDB();
    const news = await News.find();
    return NextResponse.json(news); // لازم تكون Array
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching news' }, { status: 500 });
  }
}
