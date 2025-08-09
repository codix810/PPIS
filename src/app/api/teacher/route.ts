import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lid/db';
import Teacher from '../../../../models/Teacher';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, specialty, imageUrl, description} = body;

  if (!name || !specialty || !imageUrl || !description) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  await connectDB();

  const teacher = new Teacher({
    name,
    specialty,
    imageUrl,
    description,
    createdAt: new Date(),
  });

  await teacher.save();

  return NextResponse.json({ message: 'Teacher added', teacher }, { status: 201 });
}

export async function GET() {
  try {
    await connectDB();

    const teachers = await Teacher.find().sort({ createdAt: -1 }).limit(20).lean();

    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch teachers:', error);
    return NextResponse.json({ message: 'Failed to fetch teachers' }, { status: 500 });
  }
}