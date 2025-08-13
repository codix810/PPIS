import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db';
import ComEng from '../../../../../models/ComEng';
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
    const ComEngDoc = await ComEng.findById(params.id).lean();

    if (!ComEngDoc) {
      return NextResponse.json({ message: 'ComEng not found' }, { status: 404 });
    }

    return NextResponse.json({ comEng: ComEngDoc }, { status: 200 });
  } catch (error) {
    console.error('GET ComEng error:', error);
    return NextResponse.json({ message: 'Failed to fetch ComEng' }, { status: 500 });
  }
}

// 🟡 PUT تعديل خبر
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedComEng = await ComEng.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).lean();

    if (!updatedComEng) {
      return NextResponse.json({ message: 'ComEng not found' }, { status: 404 });
    }

    return NextResponse.json({ ComEng: updatedComEng }, { status: 200 });
  } catch (error) {
    console.error('PUT ComEng error:', error);
    return NextResponse.json({ message: 'Error updating ComEng' }, { status: 500 });
  }
}

// 🔴 DELETE حذف خبر + صورة
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const doc = await ComEng.findById(params.id);
    if (!doc) {
      return NextResponse.json({ message: 'ComEng not found' }, { status: 404 });
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

    return NextResponse.json({ message: 'ComEng and image deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete ComEng error:', error);
    return NextResponse.json({ message: 'Failed to delete ComEng' }, { status: 500 });
  }
}
