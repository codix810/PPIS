import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lid/db';
import TopStudent from '../../../../models/TopStudent';

export async function GET(_request: NextRequest) {
  try {
    await connectDB();

    const students = await TopStudent.find().sort({ createdAt: -1 });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching top students' }, { status: 500 });
  }
}
