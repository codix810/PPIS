'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type TopStudent = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export default function TopStudentsList() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/Student');
        const data = await res.json();
        setStudents(data.students || []);
      } catch (error) {
        console.error('Failed to fetch students', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

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

  if (students.length === 0) {
    return (
      <p className="text-center mt-20 text-red-500">
        No top students found.
      </p>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-tr from-red-950 via-black to-blue-950">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl text-white font-bold mb-10"
        >
          Students
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {students.map((student, i) => {
            // نجيب أول 50 كلمة من الوصف
            const shortDescription = student.description
              .split(" ")
              .slice(0, 20)
              .join(" ") + (student.description.split(" ").length > 20 ? "..." : "");

            return (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-gray-900 shadow-lg p-6 rounded-xl hover:shadow-2xl transition"
              >
                <img
                  src={student.imageUrl}
                  alt={student.name}
                  className="rounded-full mx-auto mb-4 object-cover cursor-pointer"
                  width={200}
                  height={200}
                  loading="lazy"
                  onClick={() => router.push(`/Student/${student._id}`)}
                />
                <h3 className="text-xl font-semibold text-white">{student.name}</h3>
                <p className="text-gray-400">{shortDescription}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
