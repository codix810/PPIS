import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lid/db';
import StuActiv from '../../../../models/StuActiv';


export async function GET() {
  try {
    await connectDB();
    const stuActiv = await StuActiv.find();
    return NextResponse.json(stuActiv); // لازم تكون Array
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching stuActiv' }, { status: 500 });
  }
}
