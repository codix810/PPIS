"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type IntPro = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  link?: string;
};

export default function Page() {
  const [intPro, setIntPro] = useState<IntPro[]>([]);
  const [loading, setLoading] = useState(true);

  const truncateWords = (text: string, wordLimit: number) => {
    const words = text.split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  useEffect(() => {
    const fetchIntPro = async () => {
      try {
        const res = await fetch("/api/IntPro");
        const data = await res.json();
        setIntPro(data || []);
      } catch (error) {
        console.error("Failed to fetch IntPro", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIntPro();
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

  if (intPro.length === 0) {
    return (
      <p className="text-center mt-20 text-red-500">
        No student intPro found.
      </p>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-red-950 via-black to-blue-950 min-h-screen py-16 px-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Internship Programming
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {intPro.map((item, index) => {
          const hasLink = item.link && item.link.trim() !== "";

          const CardContent = (
            <>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">
                  {truncateWords(item.content, 4)}
                </h3>
                <p className="text-gray-300 text-sm">
                  {truncateWords(item.content, 50)}
                </p>
              </div>
            </>
          );

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/10 rounded-xl shadow-lg overflow-hidden border border-white/10 hover:bg-white/20 transition"
            >
              <Link
                href={hasLink ? item.link! : `/activities/Internship-Programming/${item._id}`}
                target={hasLink ? "_blank" : "_self"}
              >
                {CardContent}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
