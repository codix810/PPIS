import Link from "next/link";
import React from "react";
import { FaLaptopCode, FaBalanceScale, FaMicrochip, FaChartLine } from "react-icons/fa";

const Subjects = () => {
  const subjects = [
    {
      icon: <FaLaptopCode className="text-4xl text-blue-600" />,
      title: "Programming",
      link: "/subjects/programming",
      desc: "Learn coding, software development, and algorithms.",
    },
    {
      icon: <FaBalanceScale className="text-4xl text-red-600" />,
      title: "Politics",
       link: "/subjects/politics",
      desc: "Understand political systems, law, and governance.",
    },
    {
      icon: <FaMicrochip className="text-4xl text-green-500" />,
      title: "Technology",
      link: "/subjects/technology",
      desc: "Explore modern tech trends and innovations.",
    },
    {
      icon: <FaChartLine className="text-4xl text-yellow-400" />,
      title: "Commerce",
      link: "/subjects/commerce",
      desc: "Study trade, business, and economic strategies.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gradient-to-tr from-red-950 via-black to-blue-950 text-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        Our Study Subjects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className=" text-white rounded-lg shadow-2xl bg-gradient-to-tl cursor-pointer from-white/20 via-black to-white/50 p-6 flex flex-col items-center text-center hover:shadow-2xl  hover:scale-105 transition-transform duration-300"
          >
            {subject.icon}
            <Link href={subject.link} >
            <h3 className="text-xl font-bold mt-4">{subject.title}</h3>
            <p className="text-white mt-2">{subject.desc}</p>
            <button className="mt-4 px-4 py-2 rounded-lg text-white bg-gradient-to-tr from-red-900  to-blue-950 hover:opacity-90 transition-opacity">
              Learn More
            </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subjects;
