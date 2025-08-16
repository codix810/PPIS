'use client';

import { use } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type IntProItem = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt?: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IntProDetail({ params }: PageProps) {
  const { id } = use(params); // هنا اتحلت المشكلة ✅

  const [intProItem, setIntProItem] = useState<IntProItem | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/IntPro/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIntProItem(data.intPro);
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

  if (!intProItem) {
    return (
      <p className="text-center mt-20 text-red-600 text-xl"> برمجة التدريب الداخلي  غير موجود</p>
    );
  }

  const createdAt = intProItem.createdAt
    ? new Date(intProItem.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className='bg-gradient-to-tr from-red-950 via-black to-blue-950'>
      <div className="max-w-4xl mx-auto p-6 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-14 text-start" style={{ color:"#ef1717ff" }}>|Internship-Programming</h1>
        
        <img
          src={intProItem.imageUrl}
          alt={intProItem.title}
          className="w-full h-[380px] object-cover rounded-md mb-6"
        />

        <h1 className="text-4xl font-bold mb-4 text-white">{intProItem.title}</h1>

        <p className="text-lg leading-relaxed text-white whitespace-pre-line mb-6">
          {intProItem.content}
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
