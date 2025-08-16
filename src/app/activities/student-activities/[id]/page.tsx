'use client';

import { use } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type StuActivItem = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt?: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StuActivDetail({ params }: PageProps) {
  const { id } = use(params); // هنا اتحلت المشكلة ✅

  const [stuActivItem, setStuActivItem] = useState<StuActivItem | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/StuActiv/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStuActivItem(data.stuActiv);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
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
  }

  if (!stuActivItem) {
    return (
      <p className="text-center mt-20 text-red-600 text-xl">النشاط الطلابي  غير موجود</p>
    );
  }

  const createdAt = stuActivItem.createdAt
    ? new Date(stuActivItem.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className='bg-gradient-to-tr from-red-950 via-black to-blue-950'>
      <div className="max-w-4xl mx-auto p-6 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-14 text-start" style={{ color:"#ef1717ff" }}>|Student Activities</h1>
        
        <img
          src={stuActivItem.imageUrl}
          alt={stuActivItem.title}
          className="w-full h-[380px] object-cover rounded-md mb-6"
        />

        <h1 className="text-4xl font-bold mb-4 text-white">{stuActivItem.title}</h1>

        <p className="text-lg leading-relaxed text-white whitespace-pre-line mb-6">
          {stuActivItem.content}
        </p>

        <hr className="border-red-600 border-1 mb-8 w-35 mx-auto" />

        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            Back
          </button>
          <span className="text-white text-sm">{createdAt}</span>
        </div>
      </div>
    </div>
  );
}
