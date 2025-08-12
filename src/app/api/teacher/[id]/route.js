import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db';
import Teacher from '../../../../../models/Teacher';
import { v2 as cloudinary } from 'cloudinary';

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  await connectDB();
  const teacher = await Teacher.findById(params.id);
  if (!teacher) {
    return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
  }
  return NextResponse.json({ teacher });
}

export async function PUT(request, { params }) {
  try {
    const { name, specialty, imageUrl, description } = await request.json();

    if (!name || !specialty || !imageUrl || !description) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await connectDB();
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      params.id,
      { name, specialty, imageUrl, description, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTeacher) {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Teacher updated', teacher: updatedTeacher });
  } catch (error) {
    console.error('Update teacher error:', error);
    return NextResponse.json({ message: 'Failed to update teacher' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const teacher = await Teacher.findById(params.id);

    if (!teacher) {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }

    // استخراج public_id من رابط الصورة
    const imageUrl = teacher.imageUrl;
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    const publicPathParts = urlParts.slice(uploadIndex + 1);
    const filteredParts = publicPathParts.filter(part => !part.startsWith('v'));
    const fileName = filteredParts.pop();
    const publicId = [...filteredParts, fileName.split('.').slice(0, -1).join('.')].join('/');

    // حذف الصورة من Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // حذف المدرس من قاعدة البيانات
    await Teacher.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Teacher and image deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete teacher error:', error);
    return NextResponse.json({ message: 'Failed to delete teacher' }, { status: 500 });
  }
}
