import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../../lid/db';
import News from '../../../../models/News';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, content, date, notes, imageUrl } = await req.json();

    if (!title || !content || !date || !imageUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await connectDB();

    const newsDoc = new News({
      title,
      content,
      date,
      notes: notes || '',
      imageUrl,
      createdAt: new Date(),
    });

    await newsDoc.save();

    return new Response(JSON.stringify({ message: 'News added', news: newsDoc }), {
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
