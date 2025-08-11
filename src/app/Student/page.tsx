'use client';

import { useEffect, useState } from 'react';

type TopStudent = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export default function TopStudentsList() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/Student');
        const data = await res.json();
        setStudents(data.students);
      } catch (error) {
        console.error('Failed to fetch students', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center bg-black  items-center h-screen">
        {/* 3 نقاط حمراء متحركة */}
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="w-4 h-4 bg-red-600  rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );

  if (students.length === 0) {
    return <p className="text-center text-red-500">No top students found.</p>;
  }

  return (
    <>
        <div className=" py-6 px-6 md:px-12 items-start  ">
          <h1 className="text-4xl font-bold mt-5 mb-2 text-start" style={{ color:"red" }}
          >|Students      </h1></div>
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-6">
      {students.map(({ _id, name, description, imageUrl }) => (
        <div
          key={_id}
          className="relative bg-white shadow-md p-2 flex flex-col items-center text-center"
          style={{
            borderTopLeftRadius: '100% 70px', 
            borderTopRightRadius: '100% 70px',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            overflow: 'visible',
            marginTop: 60, 
          }}
        >
          
          {/* الصورة فوق القبة */}
          <div
            className="relative rounded-full border-4 border-red-600 overflow-hidden shadow-lg"
            style={{
              width: 140,
              height: 140,
              marginTop: -60, 
              zIndex: 10,
              backgroundColor: '#a20000ff',
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>

          <h3 className="mt-8 text-2xl font-semibold z-10">{name}</h3>
          <p className="text-gray-600 text-sm mt-2 z-10">{description}</p>
        </div>
      ))}
    </div>
    </>
  );
}
