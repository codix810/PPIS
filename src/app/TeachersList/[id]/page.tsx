'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type TeachersItem = {
  _id: string;
  name: string;
  specialty: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TeachersDetail({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [teachersItem, setTeachersItem] = React.useState<TeachersItem | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    fetch(`/api/teacher/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTeachersItem(data.teacher);
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

  if (!teachersItem)
    return (
      <p className="text-center mt-20 text-red-600 text-xl">المدرب غير موجود</p>
    );

  const createdAt = teachersItem.createdAt
    ? new Date(teachersItem.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="w-full font-sans bg-gradient-to-tr from-red-950 via-black to-blue-950">

      {/* الصورة: واضحة ومناسبة لأي حجم */}
      <motion.div
        className="w-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={teachersItem.imageUrl}
          alt={teachersItem.name}
          className="w-full h-auto object-contain max-h-[80vh]"
        />
      </motion.div>

      {/* المحتوى تحت الصورة */}
      <motion.div
        className="max-w-4xl mx-auto text-center px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {teachersItem.name}
        </h1>
        <p className="text-lg md:text-xl text-white mt-2">
          {teachersItem.specialty}
        </p>
        <p className="text-base md:text-lg text-white mt-4 leading-relaxed">
          {teachersItem.description}
        </p>

        {/* Footer: Back button + تاريخ */}
        <div className="flex justify-between items-center py-6 ">
          <button
            onClick={() => router.back()}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            Back
          </button>
          <span className="text-white text-sm">{createdAt}</span>
        </div>
      </motion.div>
    </div>
  );
}
