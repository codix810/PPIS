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
      className="bg-[#EEF8F8] text-black py-16 px-10 sm:px-20 font-sans"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* About PPIS */}
        <div>
          <h3 className="text-3xl font-extrabold mb-6">About US</h3>
          <p className="text-lg leading-relaxed">
            PPIS is a platform dedicated to delivering the latest news and reliable information quickly. We aim to provide rich and relevant content that meets user needs.
          </p>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-3xl font-extrabold mb-6">Contact Info</h3>
          <ul className="space-y-5 text-lg">
            <li className="flex items-center gap-4">
              <FaPhone className="text-xl" />
              <span>+1 234 567 8900</span>
            </li>
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-xl" />
              <span>contact@ppis.com</span>
            </li>
            <li className="flex items-center gap-4">
              <FaWhatsapp className="text-xl" />
              <span>+1 987 654 3210</span>
            </li>
            <li className="mt-4 text-lg font-semibold">
              123 Knowledge St., Cairo, Egypt
            </li>
          </ul>
        </div>

        {/* Latest News */}
        <div>
          <h3 className="text-3xl font-extrabold mb-6">Important Links</h3>
          <ul className="space-y-4 text-lg">
            {latestArticles.length === 0 && (
              <li className="italic text-gray-600">No news available right now</li>
            )}
            {latestArticles.map(article => (
              <li
                key={article._id}
                onClick={() => router.push(`/news/${article._id}`)}
                className="cursor-pointer hover:text-blue-600 transition truncate"
                title={article.title}
              >
                • {article.title.length > 50 ? article.title.slice(0, 47) + '...' : article.title}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* PPIS Logo and Text */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-8 gap-8">
        <div className="flex items-center space-x-6">
            <span className="text-4xl font-bold text-red-600 tracking-wide">PPIS</span>
          <img
            src="/ppis.jpg" 
            alt="PPIS Logo"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Divider Line */}
      <div className="max-w-7xl mx-auto mt-14 border-t-2 border-black"></div>
      {/* Copyright */}
      <p className="max-w-7xl mx-auto text-center text-lg text-black mt-8 select-none font-semibold">
        &copy; 2025 PPIS. All rights reserved.
      </p>
    </motion.footer>
  );
}
