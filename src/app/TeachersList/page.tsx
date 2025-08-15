'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from 'next/link';

type Teacher = {
  _id: string;
  name: string;
  specialty: string;
  imageUrl: string;
};

export default function ProgramDirectors() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("/api/teacher");
        const data = await res.json();
        setTeachers(data.teachers || []);
      } catch (error) {
        console.error("Failed to fetch teachers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
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

  if (teachers.length === 0) {
    return (
      <p className="text-center mt-20 text-red-500">
        No teachers found.
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
          Program Directors
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {teachers.map((teacher, i) => (
<motion.div
  key={teacher._id}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: i * 0.2 }}
  className="bg-gray-900 shadow-lg p-6 rounded-xl hover:shadow-2xl transition"
>
<Link href={`/TeachersList/${teacher._id}`}>
  <img
    src={teacher.imageUrl}
    alt={teacher.name}
    className="rounded-full mx-auto mb-4 object-cover"
    width={200}
    height={200}
    loading="lazy"
  />
  </Link>
  <h3 className="text-xl font-semibold text-white">{teacher.name}</h3>
  <p className="text-gray-400">{teacher.specialty}</p>
</motion.div>

          ))}
        </div>
      </div>
    </section>
  );
}
