import React from "react";
import { 
  FaChartLine, 
  FaMoneyBillWave, 
  FaStore, 
  FaBusinessTime, 
  FaExchangeAlt, 
  FaBriefcase, 
  FaHandshake, 
  FaChartPie, 
  FaGlobe 
} from "react-icons/fa";

const Commerce = () => {
  const years = [
    {
      year: "Level One",
      terms: [
        {
          term: "Term 1",
          subjects: [
            { icon: <FaChartLine />, name: "Principles of Economics" },
            { icon: <FaStore />, name: "Fundamentals of Management and organization" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaMoneyBillWave />, name: "Principles of Accounting" },
            { icon: <FaBusinessTime />, name: "Contemporary Issues" },
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
            { icon: <FaHandshake />, name: "Public Finance" },
            { icon: <FaChartPie />, name: "HRM / Organizational Behavior" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaStore />, name: "Principles of Statistics" },
            { icon: <FaMoneyBillWave />, name: "Governmental Accounting" },
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
            { icon: <FaChartLine />, name: "Marketing" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaHandshake />, name: "Econometrics" },
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
            { icon: <FaGlobe />, name: "Public Administration Information Systems" },
            { icon: <FaHandshake />, name: "Managing Social and Political Risk in Public Policy" },
          ],
        },
        {
          term: "Term 2",
          subjects: [
            { icon: <FaChartPie />, name: "Money and Banking" },
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-16 px-8 bg-gradient-to-tr from-red-950 via-black to-blue-950 text-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        Commerce Subjects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {years.map((yearData, yearIndex) => (
          <div
            key={yearIndex}
            className="bg-white/10 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-6 text-yellow-300">
              {yearData.year}
            </h3>
            {yearData.terms.map((termData, termIndex) => (
              <div
                key={termIndex}
                className="mb-6 bg-gradient-to-tl from-white/10 via-black/20 to-white/5 p-4 rounded-lg"
              >
                <h4 className="text-xl font-semibold mb-4 text-blue-300">
                  {termData.term}
                </h4>
                <ul className="space-y-3">
                  {termData.subjects.map((subject, subjIndex) => (
                    <li
                      key={subjIndex}
                      className="flex items-center space-x-3 text-white"
                    >
                      <span className="text-lg text-yellow-400">
                        {subject.icon}
                      </span>
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

export default Commerce;
