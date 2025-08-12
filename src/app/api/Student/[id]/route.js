import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db';
import Student from '../../../../../models/TopStudent';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ===== GET طالب =====
export async function GET(_request, { params }) {
  try {
    await connectDB();
    const student = await Student.findById(params.id).lean();

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ student }, { status: 200 });
  } catch (error) {
    console.error('GET student error:', error);
    return NextResponse.json({ message: 'Failed to fetch student' }, { status: 500 });
  }
}

// ===== تحديث طالب =====
export async function PUT(request, { params }) {
  try {
    const { name, description, imageUrl } = await request.json();

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

    return NextResponse.json(
      { message: 'Student updated', student: updatedStudent },
      { status: 200 }
    );
  } catch (error) {
    console.error('PUT student error:', error);
    return NextResponse.json({ message: 'Failed to update student' }, { status: 500 });
  }
}

// ===== حذف طالب =====
export async function DELETE(_request, { params }) {
  try {
    await connectDB();

    const student = await Student.findById(params.id);
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    const imageUrl = student.imageUrl;
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    const publicPathParts = urlParts.slice(uploadIndex + 1);
    const filteredParts = publicPathParts.filter(part => !part.startsWith('v'));
    const fileName = filteredParts.pop();
    const publicId = [...filteredParts, fileName.split('.').slice(0, -1).join('.')].join('/');

    await cloudinary.uploader.destroy(publicId);
    await Student.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Student and image deleted' }, { status: 200 });
  } catch (error) {
    console.error('DELETE student error:', error);
    return NextResponse.json({ message: 'Failed to delete student' }, { status: 500 });
  }
}
