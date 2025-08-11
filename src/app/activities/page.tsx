'use client';

import { FaUsers, FaUniversity, FaLaptopCode, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Activities() {
  const activities = [
    {
      id: 1,
       slug: "student-activities",
      title: 'Student Activities',
      description: 'Join exciting student activities that enhance your skills and connect you with like-minded peers.',
      icon: <FaUsers className="text-red-500 text-4xl" />,
    },
    {
      id: 2,
      slug: "College Events",
      title: 'College Events',
      description: 'Participate in workshops, seminars, and cultural events organized by the college.',
      icon: <FaUniversity className="text-blue-500 text-4xl" />,
    },
    {
      id: 3,  
      slug: "Internship Programming ",
      title: 'Internship Programming Contests',
      description: 'Showcase your coding skills in competitions and hackathons to win amazing prizes.',
      icon: <FaLaptopCode className="text-green-500 text-4xl" />,
    },
    {
      id: 4,
      slug: "Community Engagemen",
      title: 'Community Engagement',
      description: 'Collaborate with organizations to bring positive change to society through projects and volunteering.',
      icon: <FaHandshake className="text-yellow-500 text-4xl" />,
    },
  ];

  return (
    <div className="bg-gradient-to-tr from-red-950 via-black to-blue-950 min-h-screen py-16 px-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Our Activities
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/10 p-6 rounded-xl text-center shadow-lg hover:bg-white/20 transition cursor-pointer border border-white/10"
          >
            <Link href={`/activities/${activity.slug}`}>
                <div className="mb-4 flex justify-center items-center">{activity.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-300 text-sm">{activity.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
