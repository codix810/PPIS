import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lid/db';
import News from '../../../../models/News';

export async function GET() {
  try {
    await connectDB();

    // جلب كل الأخبار مرتبة حسب الأحدث أولاً
    const news = await News.find().sort({ createdAt: -1 });

    return NextResponse.json({ news });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching news' }, { status: 500 });
  }
}
