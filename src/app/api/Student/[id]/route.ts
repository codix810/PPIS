import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db'; // عدل حسب مسار اتصال الداتا بيز عندك
import Student from '../../../../../models/TopStudent';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    await connectDB();
    const student = await Student.findById(id).lean();
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json({ student }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch student' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, description, imageUrl } = body;

    if (!name || !description || !imageUrl) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const updatedStudent = await Student.findByIdAndUpdate(
      params.id,
      { name, description, imageUrl, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedStudent) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student updated', student: updatedStudent }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update student' }, { status: 500 });
  }
}

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const student = await Student.findById(params.id);

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    // استخراج public_id من رابط الصورة
    const imageUrl = student.imageUrl;
    const urlParts = imageUrl.split('/');
    // حذف الجزء قبل upload/ وأخذ باقي المسار
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    const publicPathParts = urlParts.slice(uploadIndex + 1);
    // publicPathParts قد يكون مثل: ['v1687283345', 'ppis-top-students', 'abc123.jpg']
    // نحذف الجزء اللي يبدأ بـ v لأن Cloudinary لا يحتاجه
    const filteredParts = publicPathParts.filter(part => !part.startsWith('v'));
    // نحذف الامتداد
    const fileName = filteredParts.pop()!;
    const publicId = [...filteredParts, fileName.split('.').slice(0, -1).join('.')].join('/');

    // حذف الصورة من Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // حذف الطالب من قاعدة البيانات
    await Student.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Student and image deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete student error:', error);
    return NextResponse.json({ message: 'Failed to delete student' }, { status: 500 });
  }
}
