import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lid/db';
import Event from '../../../../../models/Event';
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
    const EventDoc = await Event.findById(params.id).lean();

    if (!EventDoc) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ event: EventDoc }, { status: 200 });
  } catch (error) {
    console.error('GET Event error:', error);
    return NextResponse.json({ message: 'Failed to fetch Event' }, { status: 500 });
  }
}

// 🟡 PUT تعديل خبر
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedEvent = await Event.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).lean();

    if (!updatedEvent) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ Event: updatedEvent }, { status: 200 });
  } catch (error) {
    console.error('PUT Event error:', error);
    return NextResponse.json({ message: 'Error updating Event' }, { status: 500 });
  }
}

// 🔴 DELETE حذف خبر + صورة
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const doc = await Event.findById(params.id);
    if (!doc) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
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

    return NextResponse.json({ message: 'Event and image deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete Event error:', error);
    return NextResponse.json({ message: 'Failed to delete Event' }, { status: 500 });
  }
}
