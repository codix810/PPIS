import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db';
import StuActiv from '../../../../../models/StuActiv';
import { v2 as cloudinary } from 'cloudinary';

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🟢 GET خبر واحد
export async function GET(request, { params }) {
  try {
    await connectDB();
    const stuActivDoc = await StuActiv.findById(params.id).lean();

    if (!stuActivDoc) {
      return NextResponse.json({ message: 'stuActiv not found' }, { status: 404 });
    }

    return NextResponse.json({ stuActiv: stuActivDoc }, { status: 200 });
  } catch (error) {
    console.error('GET stuActiv error:', error);
    return NextResponse.json({ message: 'Failed to fetch stuActiv' }, { status: 500 });
  }
}

// 🟡 PUT تعديل خبر
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedStuActiv = await StuActiv.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).lean();

    if (!updatedStuActiv) {
      return NextResponse.json({ message: 'stuActiv not found' }, { status: 404 });
    }

    return NextResponse.json({ stuActiv: updatedStuActiv }, { status: 200 });
  } catch (error) {
    console.error('PUT stuActiv error:', error);
    return NextResponse.json({ message: 'Error updating stuActiv' }, { status: 500 });
  }
}

// 🔴 DELETE حذف خبر + صورة
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const doc = await StuActiv.findById(params.id);
    if (!doc) {
      return NextResponse.json({ message: 'stuActiv not found' }, { status: 404 });
    }

    // لو فيه صورة، نحذفها من Cloudinary
    if (doc.imageUrl) {
      const urlParts = doc.imageUrl.split('/');
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      const publicPathParts = urlParts.slice(uploadIndex + 1);
      const filteredParts = publicPathParts.filter(part => !part.startsWith('v'));
      const fileName = filteredParts.pop();
      const publicId = [...filteredParts, fileName.split('.').slice(0, -1).join('.')].join('/');
      await cloudinary.uploader.destroy(publicId);
    }

    // حذف الخبر من قاعدة البيانات
    await doc.deleteOne();

    return NextResponse.json({ message: 'stuActiv and image deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete stuActiv error:', error);
    return NextResponse.json({ message: 'Failed to delete stuActiv' }, { status: 500 });
  }
}
