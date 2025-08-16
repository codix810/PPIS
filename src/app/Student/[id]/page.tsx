'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type StudentItem = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function StudentDetail({ params }: PageProps) {
  const resolvedParams = React.use(params); // هنا فك الـ Promise
  const { id } = resolvedParams;
  const [studentItem, setStudentItem] = React.useState<StudentItem | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    fetch(`/api/Student/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentItem(data.student);
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

  if (!studentItem)
    return (
      <p className="text-center mt-20 text-red-600 text-xl">المدرب غير موجود</p>
    );

  const createdAt = studentItem.createdAt
    ? new Date(studentItem.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="w-full font-sans">

      {/* الصورة: واضحة ومناسبة لأي حجم */}
      <motion.div
        className="w-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={studentItem.imageUrl}
          alt={studentItem.name}
          className="w-full h-auto object-contain max-h-[80vh]"
        />
      </motion.div>

      {/* المحتوى تحت الصورة */}
      <motion.div
        className="max-w-4xl mx-auto px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {studentItem.name}
        </h1>
        <p className="text-base md:text-lg text-gray-700 mt-4 leading-relaxed">
          {studentItem.description}
        </p>

        {/* Footer: Back button + تاريخ */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => router.back()}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            Back
          </button>
          <span className="text-gray-500 text-sm">{createdAt}</span>
        </div>
      </motion.div>
    </div>
  );
}