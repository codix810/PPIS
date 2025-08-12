import type { NextRequest } from 'next/server';
import { connectDB } from '../../../../lid/db';
import TopStudent from '../../../../models/TopStudent';

export async function POST(req: NextRequest) {
  try {
    const { name, description, imageUrl } = await req.json();

    if (!name || !description || !imageUrl) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const studentDoc = new TopStudent({
      name,
      description,
      imageUrl,
      createdAt: new Date(),
    });

    await studentDoc.save();

    return new Response(JSON.stringify({ message: 'Top student added', student: studentDoc }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
