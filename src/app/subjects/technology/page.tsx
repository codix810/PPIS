import React from "react";
import { FaNetworkWired, FaDatabase, FaCode, FaRobot, FaCloud, FaMobileAlt, FaShieldAlt, FaMicrochip } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";

const TechnologySubjects = () => {
  const years = [
    {
      year: "First Year",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "Introduction to Technology", icon: <FaMicrochip /> },
            { name: "Computer Networks Basics", icon: <FaNetworkWired /> },
            { name: "Fundamentals of Programming", icon: <FaCode /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Database Fundamentals", icon: <FaDatabase /> },
            { name: "Cloud Computing Basics", icon: <FaCloud /> },
            { name: "Cybersecurity Principles", icon: <FaShieldAlt /> },
          ],
        },
      ],
    },
    {
      year: "Second Year",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "Mobile App Development", icon: <FaMobileAlt /> },
            { name: "IoT Fundamentals", icon: <FaRobot /> },
            { name: "Advanced Networking", icon: <FaNetworkWired /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Advanced Databases", icon: <FaDatabase /> },
            { name: "Web Development", icon: <FaCode /> },
            { name: "Cloud Infrastructure", icon: <FaCloud /> },
          ],
        },
      ],
    },
    {
      year: "Third Year",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "AI Fundamentals", icon: <FaRobot /> },
            { name: "Machine Learning", icon: <FaMicrochip /> },
            { name: "Cybersecurity Advanced", icon: <FaShieldAlt /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Mobile App Advanced", icon: <FaMobileAlt /> },
            { name: "Data Analytics", icon: <FaDatabase /> },
            { name: "Cloud Security", icon: <FaCloud /> },
          ],
        },
      ],
    },
    {
      year: "Fourth Year",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "Blockchain Technology", icon: <FaDatabase /> },
            { name: "AI Applications", icon: <FaRobot /> },
            { name: "Ethical Hacking", icon: <FaShieldAlt /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Capstone Project", icon: <FaCode /> },
            { name: "Future Tech Trends", icon: <FaMicrochip /> },
            { name: "Entrepreneurship in Tech", icon: <FaLaptopCode /> },
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-16 px-8 bg-gradient-to-tr from-green-900 via-black to-blue-950 text-white">
      <h2 className="text-3xl font-bold text-center mb-12">Technology Subjects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {years.map((year, index) => (
          <div
            key={index}
            className="rounded-xl shadow-lg bg-gradient-to-tl from-white/20 via-black to-white/30 p-6 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6">{year.year}</h3>
            {year.terms.map((term, tIndex) => (
              <div key={tIndex} className="mb-6">
                <h4 className="text-lg font-semibold mb-3">{term.term}</h4>
                <ul className="space-y-2">
                  {term.subjects.map((subject, sIndex) => (
                    <li
                      key={sIndex}
                      className="flex items-center gap-3 bg-gradient-to-tr from-green-800/60 to-blue-900/60 p-3 rounded-lg hover:opacity-90 transition"
                    >
                      <span className="text-2xl text-green-300">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologySubjects;
