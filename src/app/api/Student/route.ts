import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../../lid/db';
import TopStudent from '../../../../models/TopStudent';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const students = await TopStudent.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ students }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error fetching top students' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
