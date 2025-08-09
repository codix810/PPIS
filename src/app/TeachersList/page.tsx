'use client';

import { useEffect, useState } from 'react';

type Teacher = {
  _id: string;
  name: string;
  specialty: string;
  imageUrl: string;
};

export default function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teacher'); // API لجلب المعلمين
        const data = await res.json();
        setTeachers(data.teachers);
      } catch (error) {
        console.error('Failed to fetch teachers', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        {/* 3 نقاط حمراء متحركة */}
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
  if (teachers.length === 0)
    return <p className="text-center mt-20 text-red-500">No teachers found.</p>;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
      {teachers.map(({ _id, name, specialty, imageUrl }) => (
        <div
          key={_id}
          className="relative bg-white shadow-md p-6 flex flex-col items-center text-center rounded-t-[80px] rounded-b-[8px] overflow-visible"
          style={{ marginTop: 40 }}
        >
          <div
            className="relative rounded-full border-4 border-red-600 overflow-hidden shadow-lg"
            style={{ width: 140, height: 140, marginTop: -70, zIndex: 10, backgroundColor: '#a20000ff' }}
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>

          <h3 className="mt-8 text-2xl font-semibold z-10">{name}</h3>
          <p className="text-gray-600 text-sm mt-2 z-10">{specialty}</p>
        </div>
      ))}
    </div>
  );
}
