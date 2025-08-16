import React from "react";
import { 
  FaBalanceScale, FaGavel, FaGlobe, FaLandmark, 
  FaHandshake, FaRegNewspaper, FaUsers, FaComments, 
  FaChartLine, FaBullhorn, FaDatabase, FaShieldAlt 
} from "react-icons/fa";

const PoliticsSubjects = () => {
  const years = [
    {
      year: "Level One",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { icon: <FaBalanceScale className="text-2xl text-yellow-400" />, title: "Fundamentals of Political Science" },
            { icon: <FaGlobe className="text-2xl text-green-400" />, title: "Technology and Politics" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaLandmark className="text-2xl text-indigo-400" />, title: "Principle of Public Administration" },
            { icon: <FaHandshake className="text-2xl text-pink-400" />, title: "Introduction to Comparative Political Systems" },
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
            { icon: <FaGavel className="text-2xl text-red-400" />, title: "Principles of Public Policy" },
            { icon: <FaRegNewspaper className="text-2xl text-blue-400" />, title: "Research Methods for Public Policy" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaComments className="text-2xl text-green-400" />, title: "Public Opinion and Media" },
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
            { icon: <FaBullhorn className="text-2xl text-yellow-400" />, title: "Leadership and Communication for Public Affairs" },
            { icon: <FaChartLine className="text-2xl text-blue-400" />, title: "Quantitative Methods and Operating Research for Public Policy" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaUsers className="text-2xl text-red-400" />, title: "Political Development and Governance" },
            { icon: <FaShieldAlt className="text-2xl text-indigo-400" />, title: "Management of Political International Crises" },
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
            { icon: <FaDatabase className="text-2xl text-green-400" />, title: "Public Administration Information Systems" },
            { icon: <FaHandshake className="text-2xl text-pink-400" />, title: "Managing Social and Political Risk in Public Policy" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaBalanceScale className="text-2xl text-yellow-400" />, title: "Information Systems and Public Policy-Making" },
            { icon: <FaRegNewspaper className="text-2xl text-blue-400" />, title: "Marketing Public Policy" },
            { icon: <FaGlobe className="text-2xl text-green-400" />, title: "Foreign Policy Information Systems" },
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-tr from-red-950 via-black to-blue-950 text-white min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12">Politics Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {years.map((year, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6">{year.year}</h3>
            <div className="grid grid-cols-1 gap-6">
              {year.terms.map((term, j) => (
                <div key={j} className="bg-white/5 p-4 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-3">{term.term}</h4>
                  <ul className="space-y-2">
                    {term.subjects.map((sub, k) => (
                      <li key={k} className="flex items-center gap-3">
                        {sub.icon}
                        <span>{sub.title}</span>
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

export default PoliticsSubjects;
