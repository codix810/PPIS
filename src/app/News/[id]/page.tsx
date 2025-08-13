'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type NewsItem = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt?: string;
  notes?: string; // لو عندك نوت في البيانات
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function NewsDetail({ params }: PageProps) {
  const resolvedParams = React.use(params); // هنا فك الـ Promise
  const { id } = resolvedParams;
  const [newsItem, setNewsItem] = React.useState<NewsItem | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    fetch(`/api/getNews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNewsItem(data.news);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center bg-black items-center h-screen">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="w-4 h-4 bg-red-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );

  if (!newsItem)
    return (
      <p className="text-center mt-20 text-red-600 text-xl">الخبر غير موجود</p>
    );

  const createdAt = newsItem.createdAt
    ? new Date(newsItem.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className='bg-gradient-to-tr from-red-950 via-black to-blue-950'>
      <div
        className="max-w-4xl  mx-auto p-6 font-sans"
        style={{ fontFamily: "'Poppins', sans-serif" }}>
          <h1 className="text-4xl font-bold mb-14 items-start text-start"style={{ color:"#ef1717ff", }}>|News</h1>
        <img
          src={newsItem.imageUrl}
          alt={newsItem.title}
          className="w-full h-[380px] object-cover rounded-md mb-6"
        />

        <h1 className="text-4xl font-bold mb-4 text-white">{newsItem.title}</h1>

        <p className="text-lg leading-relaxed text-white whitespace-pre-line mb-6">
          {newsItem.content}
        </p>

        {/* خط أحمر صغير */}
        <hr className="border-red-600 border-1 mb-8 w-35 mx-auto" />

        {/* النوت */}
        {newsItem.notes && (
          <p className="text-md text-white italic mb-8">{newsItem.notes}</p>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-Back-700 transition"
          >
            Back
          </button>

          <span className="text-white text-sm">{createdAt}</span>
        </div>
      </div>
    </div>
  );
}
