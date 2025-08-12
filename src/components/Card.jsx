import { link } from "fs";
import Link from "next/link";
import React from "react";
import { FaLaptopCode, FaRunning, FaRegNewspaper, FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";

const Card = () => {
  const cards = [
    {
      icon: <FaLaptopCode className="text-4xl text-blue-200" />,
      title: "Programs",
      desc: "Types of corporate programs",
      bg: "bg-gradient-to-tr from-blue-700 via-blue-800 to-blue-200",
      link: "/subjects",
    },
    {
      icon: <FaUsers className="text-4xl text-green-200" />,
      title: "Activity",
      desc: "Various corporate activities",
      bg: "bg-gradient-to-tr from-green-700 via-green-800 to-green-00",
      link: "/activities",
    },
    {
      icon: <FaRegNewspaper className="text-4xl text-yellow-200" />,
      title: "News",
      desc: "Latest corporate updates",
      bg: "bg-gradient-to-tr from-yellow-700 via-yellow-800 to-yellow-200",
      link: "/news",
    },
    {
      icon: <FaUniversity className="text-4xl text-red-200" />,
      title: "Faculty",
      desc: "Meet our professionals",
      bg: "bg-gradient-to-tr from-red-700 via-red-800 to-red-00",
      link: "/about",

    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-20 px-8 bg-black">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} text-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300`}
        >
          {card.icon}
          <h3 className="text-xl font-bold mt-4">{card.title}</h3>
          <p className="mt-2">{card.desc}</p>
         <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-tr from-red-700 via-black to-blue-700 hover:opacity-90 transition-opacity duration-200 cursor-pointer ">
            <Link href={card.link}>
            View More
            </Link>
         </button>

        </div>
      ))}
    </div>
  );
};

export default Card;
