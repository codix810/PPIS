import React from "react";
import { 
  FaNetworkWired, 
  FaDatabase, 
  FaCode, 
  FaRobot, 
  FaCloud, 
  FaMobileAlt, 
  FaShieldAlt, 
  FaMicrochip 
} from "react-icons/fa";
import {  
  FaBrain, 
  FaServer, 
  FaLock, 
  FaChartLine, 
  FaLightbulb 
} from "react-icons/fa6";
import { FaLaptopCode, FaCogs, FaProjectDiagram } from "react-icons/fa";


const TechnologySubjects = () => {
  const years = [
    {
      year: "Level One",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "Computer Basics", icon: <FaLaptopCode /> },
            { name: "Fundamental of Information", icon: <FaLightbulb /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Computer Networks", icon: <FaNetworkWired /> },
            { name: "Fundamentals of Programming", icon: <FaCode /> },
          ],
        },
      ],
    },
    {
      year: "Level Two",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "Analysis and Design of Information Systems", icon: <FaProjectDiagram /> },
            { name: "Programming 2", icon: <FaLaptopCode /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Databases", icon: <FaDatabase /> },
            { name: "Data Structures and Algorithm", icon: <FaServer /> },
            // { name: "Cloud Infrastructure", icon: <FaCloud /> },
          ],
        },
      ],
    },
    {
      year: "Level Three",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "Fundamental of Artificial Intelligence", icon: <FaBrain /> },
            { name: "Managerial Information System", icon: <FaChartLine /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Learning From Data and Machine Learning", icon: <FaRobot /> },
            { name: "Advanced Databases", icon: <FaDatabase /> },
          ],
        },
      ],
    },
    {
      year: "Level Four",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { name: "Data Mining and Big Data Analytics", icon: <FaServer /> },
            { name: "Data and Information Security", icon: <FaLock /> },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { name: "Capstone Project", icon: <FaLaptopCode /> },
            { name: "Future Tech Trends", icon: <FaLightbulb /> },
            // { name: "Entrepreneurship in Tech", icon: <FaChartLine /> },
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-16 px-8 bg-gradient-to-tr from-green-900 via-black to-blue-950 text-white">
      <h2 className="text-3xl font-bold text-center mb-12">Technology Subjects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {years.map((year, index) => (
          <div
            key={index}
            className="rounded-xl shadow-lg bg-gradient-to-br from-white/10 to-white/5 p-6 hover:scale-105 transition-transform duration-300"
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
