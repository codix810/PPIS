import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db';
import News from '../../../../../models/News';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;

    // جلب خبر واحد بالـ ID
    const newsItem = await News.findById(id);

    if (!newsItem) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ news: newsItem });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching news' }, { status: 500 });
  }
}
