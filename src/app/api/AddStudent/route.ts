import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../../lid/db';
import TopStudent from '../../../../models/TopStudent';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, imageUrl } = await req.json();

    if (!name || !description || !imageUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
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
