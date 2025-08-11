'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';

type Article = {
  _id: string;
  title: string;
};

export default function Footer() {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/getNews');
        const data = await res.json();
        setLatestArticles(data.news.slice(0, 3));
      } catch {
        setLatestArticles([]);
      }
    };
    fetchArticles();
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gray-950 text-white py-12 px-8 sm:px-16 font-sans text-sm"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* About PPIS */}
        <div>
          <h3 className="text-xl font-bold mb-4">About US</h3>
          <p className="leading-relaxed text-gray-300">
            PPIS is a platform dedicated to delivering the latest news and reliable information quickly. We aim to provide rich and relevant content that meets user needs.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Info</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaPhone className="text-lg text-gray-400" />
              <span className="text-gray-300">+1 234 567 8900</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-lg text-gray-400" />
              <span className="text-gray-300">contact@ppis.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaWhatsapp className="text-lg text-gray-400" />
              <span className="text-gray-300">+1 987 654 3210</span>
            </li>
            <li className="mt-2 text-gray-300">
              123 Knowledge St., Cairo, Egypt
            </li>
          </ul>
        </div>

        {/* Latest News */}
        <div>
          <h3 className="text-xl font-bold mb-4">Important Links</h3>
          <ul className="space-y-2">
            {latestArticles.length === 0 && (
              <li className="italic text-gray-400">No news available right now</li>
            )}
            {latestArticles.map(article => (
              <li
                key={article._id}
                onClick={() => router.push(`/news/${article._id}`)}
                className="cursor-pointer hover:text-red-500 transition truncate"
                title={article.title}
              >
                • {article.title.length > 50 ? article.title.slice(0, 47) + '...' : article.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PPIS Logo */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-8 gap-6">
        <div className="flex items-center space-x-4">
          <span className="text-5xl font-bold text-red-500 tracking-wide">PPIS</span>
          <img
            src="/ppis.jpg" 
            alt="PPIS Logo"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-600"></div>

      {/* Copyright */}
      <p className="max-w-7xl mx-auto text-center text-gray-400 mt-6 select-none">
        &copy; 2025 PPIS. All rights reserved.
      </p>
    </motion.footer>
  );
}
