"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "../../../../public/تكريم.jpg";
import img2 from "../../../../public/مجلس.jpg";
import img3 from "../../../../public/Screenshot 2025-08-11 054806.png";
import img4 from "../../../../public/معتز و نردين.jpg";

import Link from "next/link";

export default function Page() {
  const allCards = [
    {
      id: 1,
      name: "تهنئة مستحقة للطالب محمد علي ومحمد عبد الجواد لمشاركتهما المتميزة وتكريمه من نائب وزير الشباب",
      description:
        "يتقدم برنامج نظم المعلومات السياسات العامة (PPIS) بخالص التهاني والتبريكات للطالب محمد علي ، و محمد عبد الجواد الطالبان بالمستوى الثالث بالبرنامج ، وذلك لمشاركته الفعالة",
      image: img1,
      link: "https://www.facebook.com/share/16jCK5vwQ8/",
    },
    {
      id: 2,
      name: " نموذج محاكاة مجلس الوزراء المصري ",
      description:
        "طلاب المستوى الأول برنامج نظم معلومات السياسات العامة يحصدون المركز الثاني في نموذج محاكاة مجلس الوزراء المصري – الموسم الثالث عشرفي إنجاز جديد يُضاف إلى سجل تميزهم، فاز فريق طلاب برنامج نظم معلومات السياسات العامة (PPIS) بكلية التجارة ",
      image: img2,
      link: "https://www.facebook.com/share/1BAMLH7vqM/",
    },
    {
      id: 3,
      name: "فوز طلاب و طالبات برنامج نظم معلومات السياسات PPIS في مسابقة الطالب  المثالي",
      description:
        "انجاز جديد لبرنامج نظم معلومات السياسات العامة PPIS:فوز طلاب و طالبات برنامج نظم معلومات السياسات PPIS بالمركز الأول و الثاني و التاسع في مسابقة الطالب  المثالي على مستوى الجامعة .",
      image: img3,
      link: "https://www.facebook.com/share/1AvXRo6zpH/",
    },
    {
      id: 4,
      name: "معتز و ناردين سفراء برنامج نظم معلومات السياسات العامة PPIS",
      description:
        "معتز و ناردين سفراء برنامج نظم معلومات السياسات العامة PPIS في برنامج السياسة الخارجية المنعقد بوزارة الخارجية و الهجرة بالعاصمة الإدارية الجديدة.تحت رعاية ",
      image: img4,
      link: "https://www.facebook.com/share/1BF2JdNkE6/",
    },
   
  ];

  return (
    <div className="bg-gradient-to-tr from-red-950 via-black to-blue-950 min-h-screen py-16 px-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
       Student Activities
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {allCards.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white/10 rounded-xl shadow-lg overflow-hidden border border-white/10 hover:bg-white/20 transition"
          >
            <Link href={item.link} target="_blank">
                <Image
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
                />
                <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
