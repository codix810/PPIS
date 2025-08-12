"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "../../../../public/محاسبه.jpg";
import img2 from "../../../../public/اتخاذ قرار.jpg";
import img3 from "../../../../public/بنك.jpg";
import img4 from "../../../../public/python.jpg";

import Link from "next/link";

export default function Page() {
  const allCards = [
    {
      id: 1,
      name: "دوراتها للمحاسبة الإلكترونية",
      description:
        "تُطلق أولى دوراتها للمحاسبة الإلكترونية على نظام #أونكس_ERP لبرنامج نظم معلومات السياسات العامة(PPIS) بكلية التجارة -جامعة اسيوط- بحضور أ.د/ علاء عبد الحفيظ عميد كلية التجارة،  أ.د.م/ أحمد الشورى أبوزيد المنسق العام للبرنامج، أ.د/ نسمة حشمت وكيل الدراسات العليا للكلية، استكمالاً لتدريب وتطوير مهارات الطلبة من خلال أنظمة شركة الحلول النهائية المحاسبية والإدارية🌐",
      image: img1,
      link: "https://www.facebook.com/share/1AmQJWR7Si/",
    },
    {
      id: 2,
      name: "لدورة  التدريبية التى نظمها منتدى السياسات العامة التابع لمركز المعلومات ودعم اتخاذ القرار ",
      description:
        "مشاركة متميزة لطلاب برنامج PPIS في الدورة  التدريبية التى نظمها منتدى السياسات العامة التابع لمركز المعلومات ودعم اتخاذ القرار  ، بالعاصمة الإدارية الجديدة ",
      image: img2,
      link: "https://www.facebook.com/share/16z8DNitLp/",
    },
    {
      id: 3,
      name: "التدريبات في البنوك (بنك مصر -بنك CIB  -بنك الزراعي -بنك ناصر الاجتماعي -الاهلي-بنك فيصل الاسلامي)",
      description:
        "الجانب التطبيقي بالتوازي مع الجانب الأكاديمي من أولويات برنامج نظم معلومات السياسات العامة PPIS سعداء بمشاركتكم في عرض بعض النماذج المتميزة لطلبة البرنامج أثناء التدريبات في البنوك (بنك مصر -بنك CIB  -بنك الزراعي -بنك ناصر الاجتماعي -الاهلي-بنك فيصل الاسلامي) ",
        image: img3,
      link: "https://www.facebook.com/share/14H4AN7Ljyx/",
    },
    {
      id: 4,
      name: "لفاعليات التدريب الصيفي للبرنامج. دورة التدريبية استخدام لغة البايثون في تحليل البيانات.",
      description:
        " متابعة د/ أحمد الشورى أبوزيد منسق العام لبرنامج PPIS, و الدكتور / أحمد همام المسجل العام للبرنامج لفاعليات التدريب الصيفي للبرنامج. دورة التدريبية استخدام لغة البايثون في تحليل البيانات.",
      image: img4,
      link: "https://www.facebook.com/share/164NchVyiv/",
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
      Internship Programming
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
