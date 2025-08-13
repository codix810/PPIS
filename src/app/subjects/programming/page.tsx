import React from "react";
import { FaCode, FaDatabase, FaLaptopCode, FaProjectDiagram, FaServer, FaCogs } from "react-icons/fa";

const ProgrammingSubjects = () => {
  const years = [
    {
      year: "First Year",
      terms: [
        {
          term: "First Term",
          subjects: [
            { name: "Introduction to Programming", icon: <FaLaptopCode className="text-2xl text-blue-500" /> },
            { name: "Mathematics for Computing", icon: <FaProjectDiagram className="text-2xl text-green-500" /> },
            { name: "Computer Fundamentals", icon: <FaCogs className="text-2xl text-yellow-500" /> },
          ],
        },
        {
          term: "Second Term",
          subjects: [
            { name: "Object-Oriented Programming", icon: <FaCode className="text-2xl text-purple-500" /> },
            { name: "Data Structures", icon: <FaDatabase className="text-2xl text-red-500" /> },
            { name: "Web Fundamentals", icon: <FaServer className="text-2xl text-orange-500" /> },
          ],
        },
      ],
    },
    {
      year: "Second Year",
      terms: [
        {
          term: "First Term",
          subjects: [
            { name: "Algorithms", icon: <FaProjectDiagram className="text-2xl text-teal-500" /> },
            { name: "Database Systems", icon: <FaDatabase className="text-2xl text-red-500" /> },
            { name: "Networking Basics", icon: <FaServer className="text-2xl text-indigo-500" /> },
          ],
        },
        {
          term: "Second Term",
          subjects: [
            { name: "Mobile App Development", icon: <FaLaptopCode className="text-2xl text-pink-500" /> },
            { name: "Operating Systems", icon: <FaCogs className="text-2xl text-gray-500" /> },
            { name: "Software Engineering", icon: <FaCode className="text-2xl text-yellow-500" /> },
          ],
        },
      ],
    },
    {
      year: "Third Year",
      terms: [
        {
          term: "First Term",
          subjects: [
            { name: "Advanced Web Development", icon: <FaLaptopCode className="text-2xl text-blue-500" /> },
            { name: "Cloud Computing", icon: <FaServer className="text-2xl text-indigo-500" /> },
            { name: "Cybersecurity", icon: <FaCogs className="text-2xl text-red-500" /> },
          ],
        },
        {
          term: "Second Term",
          subjects: [
            { name: "Artificial Intelligence", icon: <FaProjectDiagram className="text-2xl text-purple-500" /> },
            { name: "Machine Learning", icon: <FaDatabase className="text-2xl text-green-500" /> },
            { name: "Data Science", icon: <FaCode className="text-2xl text-yellow-500" /> },
          ],
        },
      ],
    },
    {
      year: "Fourth Year",
      terms: [
        {
          term: "First Term",
          subjects: [
            { name: "Blockchain Technology", icon: <FaDatabase className="text-2xl text-pink-500" /> },
            { name: "DevOps", icon: <FaCogs className="text-2xl text-gray-500" /> },
            { name: "IoT Systems", icon: <FaServer className="text-2xl text-orange-500" /> },
          ],
        },
        {
          term: "Second Term",
          subjects: [
            { name: "Final Year Project", icon: <FaLaptopCode className="text-2xl text-blue-500" /> },
            { name: "Advanced AI", icon: <FaProjectDiagram className="text-2xl text-purple-500" /> },
            { name: "Big Data Analytics", icon: <FaDatabase className="text-2xl text-green-500" /> },
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-tr from-black via-gray-900 to-blue-950 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Programming Subjects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {years.map((year, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-white/10 via-black to-white/10 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-center text-yellow-400 mb-6">{year.year}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {year.terms.map((term, termIdx) => (
                <div
                  key={termIdx}
                  className="bg-white/10 rounded-lg p-4 shadow-md hover:bg-white/20 transition-colors"
                >
                  <h4 className="text-xl font-semibold text-blue-300 mb-4">{term.term}</h4>
                  <ul className="space-y-3">
                    {term.subjects.map((subject, subIdx) => (
                      <li key={subIdx} className="flex items-center gap-3">
                        {subject.icon}
                        <span>{subject.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgrammingSubjects;
