"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type ComEng = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  link?: string;
};

export default function Page() {
  const [comEng, setComEng] = useState<ComEng[]>([]);
  const [loading, setLoading] = useState(true);

  // دالة تقطع النص عند 100 كلمة
  const truncateWords = (text: string, wordLimit: number) => {
    const words = text.split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  useEffect(() => {
    const fetchComEng = async () => {
      try {
        const res = await fetch("/api/ComEng");
        const data = await res.json();
        setComEng(data || []);
      } catch (error) {
        console.error("Failed to fetch ComEng", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComEng();
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

  if (comEng.length === 0) {
    return (
      <p className="text-center mt-20 text-red-500">
        No student comEng found.
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
          Community Engagemen
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {comEng.map((item, index) => {
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
          <Link href={`/activities/Community-Engagemen/${item._id}`}>
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/10 rounded-xl shadow-lg overflow-hidden border border-white/10 hover:bg-white/20 transition"
            >
              {hasLink ? (
                <Link href={item.link!} target="_blank">
                  {CardContent}
                </Link>
              ) : (
                CardContent
              )}
            </motion.div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
