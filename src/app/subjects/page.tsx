"use client";
import React from "react";
import {
  FaLaptopCode,
  FaBalanceScale,
  FaMicrochip,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Subjects = () => {
  const subjects = [
    {
      icon: <FaLaptopCode className="text-5xl text-blue-500" />,
      title: "Programming",
      desc: "Learn coding, software development, and algorithms.",
      link: "/programming",
    },
    {
      icon: <FaBalanceScale className="text-5xl text-red-500" />,
      title: "Politics",
      desc: "Understand political systems, law, and governance.",
      link: "/politics",
    },
    {
      icon: <FaMicrochip className="text-5xl text-green-500" />,
      title: "Technology",
      desc: "Explore modern tech trends and innovations.",
      link: "/technology",
    },
    {
      icon: <FaChartLine className="text-5xl text-yellow-400" />,
      title: "Commerce",
      desc: "Study trade, business, and economic strategies.",
      link: "/commerce",
    },
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-tr from-blue-950 via-black to-red-950 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-14">
        Our Study Subjects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-3xl transition-all duration-300"
          >
                <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="mb-4"
                >
                {subject.icon}
                </motion.div>
            <Link href={`/subjects/${subject.link}`}>
                <h3 className="text-2xl font-bold mt-2">{subject.title}</h3>
                <p className="mt-3 text-gray-300 text-sm">{subject.desc}</p>
                <button className="mt-6 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-red-800 hover:opacity-90 transition-opacity cursor-pointer">
                Learn More
                </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Subjects;
