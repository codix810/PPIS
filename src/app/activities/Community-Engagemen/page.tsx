"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "../../../../public/منظمات.jpg";
import img2 from "../../../../public/مياه.jpg";
import img3 from "../../../../public/Screenshot 2025-08-11 054806.png";
import img4 from "../../../../public/معتز و نردين.jpg";

import Link from "next/link";

export default function Page() {
  const allCards = [
    {
      id: 1,
      name: "المنتدى الحضري العالمي الثاني عشر",
      description:
       "يشارك شباب برنامج نظم معلومات السياسات العامة في المنتدى الحضري العالمي الثاني عشر، تحت إشراف رئيس الجمهورية. وتهدف مشاركة الطلاب إلى تعزيز الانفتاح على الثقافات الأخرى. ويركز المنتدى الحضري العالمي الثاني عشر على توطين أهداف التنمية المستدامة، وإلقاء الضوء على الإجراءات والمبادرات المحلية اللازمة للحد من التحديات العالمية الراهنة التي تؤثر على الحياة اليومية للناس، بما في ذلك ارتفاع تكاليف السكن، وتغير المناخ.",
      image: img1,
      link: "https://www.facebook.com/share/1WNtJMnSdZ/",
    },
    {
      id: 2,
      name: "أسبوع القاهرة للمياه",
      description:
        "شارك طلاب مدرسة PPIS في  الحوارات المائية الثانية للعام الثاني على التوالي.يُنظم هذا الحدث وفد الاتحاد الأوروبي ووزارة الموارد المائية والري المصرية سنويًا تحت عنوان أسبوع القاهرة للمياه تحت عنوان المياه والمناخ : بناء مجتمعات مرنةيُركز هذا الحدث على الدور المحوري لإدارة المياه في معالجة الآثار المتصاعدة لتغير المناخ.",
      image: img2,
      link: "https://www.facebook.com/share/19PA9pkyHL/",
    },
    // {
    //   id: 3,
    //   name: "فوز طلاب و طالبات برنامج نظم معلومات السياسات PPIS في مسابقة الطالب  المثالي",
    //   description:
    //     "انجاز جديد لبرنامج نظم معلومات السياسات العامة PPIS:فوز طلاب و طالبات برنامج نظم معلومات السياسات PPIS بالمركز الأول و الثاني و التاسع في مسابقة الطالب  المثالي على مستوى الجامعة .",
    //   image: img3,
    //   link: "https://www.facebook.com/share/1AvXRo6zpH/",
    // },
    // {
    //   id: 4,
    //   name: "معتز و ناردين سفراء برنامج نظم معلومات السياسات العامة PPIS",
    //   description:
    //     "معتز و ناردين سفراء برنامج نظم معلومات السياسات العامة PPIS في برنامج السياسة الخارجية المنعقد بوزارة الخارجية و الهجرة بالعاصمة الإدارية الجديدة.تحت رعاية ",
    //   image: img4,
    //   link: "https://www.facebook.com/share/1BF2JdNkE6/",
    // },
   
  ];

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
