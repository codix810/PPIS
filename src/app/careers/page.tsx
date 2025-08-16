// src/app/careers/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Briefcase, Shield, Database, MonitorSmartphone, BarChart, HeartPulse, Map, Building2,
  Cpu, Network, Globe, Megaphone, Scale, BookOpen
} from "lucide-react";

const careers = [
  { title: "Data Analyst", icon: Database },
  { title: "Cyber Security Specialist", icon: Shield },
  { title: "Data and Information Security Specialist", icon: Shield },
  { title: "Digital Marketing Specialist", icon: Megaphone },
  { title: "E-Tax Specialist", icon: Scale },
  { title: "Information Systems Specialist", icon: Globe },
  { title: "Market Research Analyst", icon: BarChart },
  { title: "Banker", icon: Building2 },
  { title: "Financial Analyst", icon: BarChart },
  { title: "Health Information Systems Specialist", icon: HeartPulse },
  { title: "Intelligent Transport System Specialist", icon: Cpu },
  { title: "GIS/Remote Sensing Specialist", icon: Map },
  { title: "Management Information Systems Specialist", icon: Globe },
  { title: "Digital Transformation Specialist", icon: Network },
  { title: "Big Data Analyst", icon: Database },
  { title: "Digital & Social Media Specialist", icon: MonitorSmartphone },
  { title: "Strategic Information Systems Analyst", icon: BookOpen },
  { title: "Public Policy Analyst", icon: Briefcase },
  { title: "News Websites Data Analyst", icon: Database },
  { title: "Public Policy Information Systems Analyst", icon: Globe },
  { title: "E-Governance Specialist", icon: Scale },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-950 via-black to-blue-950 p-8 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-wide"
      >
        Career Opportunities
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {careers.map((career, index) => {
          const Icon = career.icon;
          return (
            <motion.div
              key={career.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              // this rotate card
              whileHover={{ scale: 1.09, rotate: 1 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex items-center space-x-4 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <Icon className="w-10 h-10 text-blue-400" />
              <span className="text-lg font-semibold">{career.title}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
