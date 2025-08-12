"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "../../../../public/528380190_733902772737548_8925659672226531010_n.jpg";
import img2 from "../../../../public/iti.jpg";
import img3 from "../../../../public/اثار.jpg";
import img4 from "../../../../public/قرار.jpg";
import img5 from "../../../../public/مؤتمر.jpg";
import img6 from "../../../../public/سفير.jpg";
import Link from "next/link";

export default function Page() {
  const allCards = [
    {
      id: 1,
      name: "مؤتمر الإسكوا",
      description:
        "عميد كلية التجارة يكرم عدداً من طلاب برنامج نظم معلومات السياسات العامة PPIS لمشاركتهم المتميزة في مؤتمر الإسكوا",
      image: img1,
      link: "https://www.facebook.com/share/16kxhm6kkF/",
    },
    {
      id: 2,
      name: " زيارة معهد تكنولوجيا المعلومات  بالعاصمة الإدارية (ITI)",
      description:
        "جامعة أسيوط تنظم زيارة ميدانية لطلاب برنامج نظم معلومات السياسات العامة PPIS بكلية التجارة لمعهد تكنولوجيا المعلومات ITI بالعاصمة الإدارية",
      image: img2,
      link: "https://www.facebook.com/share/1A1JGWaQUH/",
    },
    {
      id: 3,
      name: "فاعليات معرض تراثنا ",
      description:
        "حضور مميز لطلاب و طالبات برنامج نظم معلومات السياسات العامة PPIS لفاعليات معرض تراثنا - برعاية وحضور فخامة رئيس الجمهورية - أرض المعارض بالقاهرة ١٨ ديسمبر ٢٠٢٤",
      image: img3,
      link: "https://www.facebook.com/share/16TMUqNWAz/",
    },
    {
      id: 4,
      name: "مركز المعلومات ودعم  اتخاذ القرار التابع لمجلس الوزراء ",
      description:
        "فاعليات مؤثرة : لأول مرة في جامعة أسيوط ، زيارة عدد كبير من طلاب وطالبات برنامج نظم معلومات السياسات العامة PPIS لمركز المعلومات ودعم  اتخاذ القرار التابع لمجلس الوزراء بالعاصمة الإدارية الجديدة (مارس ٢٠٢٤)",
      image: img4,
      link: "https://www.facebook.com/share/16vBb67VvQ/",
    },
    {
      id: 5,
      name: "مؤتمر لجنة الأمم المتحدة الاقتصادية والاجتماعية",
      description:
        "المنسق العام لبرنامج نظم المعلومات السياسات العامة PPIS وطلاب البرنامج يشاركون في مؤتمر لجنة الأمم المتحدة الاقتصادية والاجتماعية لغرب آسيا ",
      image: img5,
      link: "https://www.facebook.com/share/1AWqmDPLA6/",
    },
    {
      id: 6,
      name: "سفير الاتحاد الأوروبي في الإسكندرية",
      description:
        "جانب من المشاركة المتميزة لطلاب برنامج نظم معلومات السياسات العامة PPIS مع سفير الاتحاد الأوروبي في الإسكندرية",
      image: img6,
      link: "https://www.facebook.com/share/1GHMbDJqnx/",
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
       College Events
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
