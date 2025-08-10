import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db';
import News from '../../../../../models/News';
import { v2 as cloudinary } from 'cloudinary';

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 🟢 GET خبر واحد
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const news = await News.findById(params.id).lean();
    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }
    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch news' }, { status: 500 });
  }
}

// 🟡 PUT تعديل خبر
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedNews = await News.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating news' }, { status: 500 });
  }
}

// 🔴 DELETE حذف خبر + صورة
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const news = await News.findById(params.id);
    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    // استخراج public_id من رابط الصورة
    const imageUrl = news.imageUrl;
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    const publicPathParts = urlParts.slice(uploadIndex + 1);
    const filteredParts = publicPathParts.filter(part => !part.startsWith('v'));
    const fileName = filteredParts.pop()!;
    const publicId = [...filteredParts, fileName.split('.').slice(0, -1).join('.')].join('/');

    // حذف الصورة من Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // حذف الخبر من قاعدة البيانات
    await News.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'News and image deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete news error:', error);
    return NextResponse.json({ message: 'Failed to delete news' }, { status: 500 });
  }
}
