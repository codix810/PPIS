'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type NewsItem = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
};

const colors = {
  pageBg: '#000000ff',
  cardBg: '#FFFFFF',
  titleColor: '#ffff',
  textColor: '#ffff',
  // titleColor: '#1E293B',
  // textColor: '#475569',
  buttonBg: '#ef1717ff',
  buttonHoverBg: '#7F1D1D',
  shadow: 'rgba(30, 64, 175, 0.15)',
};

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  fetch('/api/getNews')
    .then((res) => res.json())
    .then((data) => {
      console.log('Fetched news data:', data);
      setNews(Array.isArray(data) ? data : []); // هنا التعديل
      setLoading(false);
    })
    .catch((err) => {
      console.error('Fetch error:', err);
      setLoading(false);
    });
}, []);


  if (loading)
    return (
      <div className="flex justify-center bg-black items-center h-screen">
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

  return (
    <div
      className="min-h-screen bg-gradient-to-tr from-red-950 via-black to-blue-950 py-16 px-6 md:px-12 flex flex-col items-start"
      style={{ backgroundColor: colors.pageBg, fontFamily: "'Poppins', sans-serif" }}
    >
      <h1
        className="text-5xl font-bold mb-14 text-start"
        style={{ color: colors.buttonBg }}
      >|News      </h1>

      <p
        className="text-1xl font-bold mb-2 text-start"
        style={{ color: colors.titleColor }}
      >Latest News     </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] w-full">
        
        {news.slice(0, 6).map(({ _id, title, content, imageUrl }, idx) => (
          <motion.div
            key={_id}
            className="flex flex-col bg-gray-900 rounded-lg shadow-md overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
            style={{ boxShadow: `0 4px 12px ${colors.shadow}` }}
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h2
                className="text-xl font-semibold mb-3"
                style={{ color: colors.titleColor }}
                title={title}
              >
                {title}
              </h2>

              <p
                className="text-white mb-6 flex-grow"
                style={{ color: colors.textColor, fontSize: '0.95rem', lineHeight: '1.4' }}
                title={content}
              >
                {content.length > 140 ? content.slice(0, 140) + '...' : content}
              </p>
<Link
  href={`/News/${_id}`}
  className="self-center bg-red-600 text-white px-4 py-1 font-semibold transition-colors duration-300 hover:bg-red-800 text-center block"
  style={{ borderRadius: '22px' }}
>
  View More
</Link>


            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
