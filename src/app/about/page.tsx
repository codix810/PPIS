"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ppis from "../../../public/ppis-removebg-preview.png";
import img1 from "../../../public/الشورى.jpg";
import img2 from "../../../public/الحبشي.jpg";
import img3 from "../../../public/طارق.jpg";

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-tr from-red-950 via-black to-blue-950 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
           The General Information Systems Program in English, for general programming,
            data science, and artificial intelligence.

          </motion.p>
        </div>
      </section>

      {/* About Company */}
      <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-white mb-6">
            
            At PPIS College, we specialize in bridging the gap between public policy and information systems. Our mission is to equip future leaders with the skills to identify societal challenges and design innovative, technology-driven solutions.
            Through a unique blend of public policy studies, general programming, data science, and artificial intelligence, we prepare our students to tackle real-world problems with both 
            analytical insight and technical expertise.
          </p>
          <p className="text-gray-600">
           Building on years of academic and practical expertise, we integrate innovation, advanced technology, and strategic insight to turn ideas into real-world solutions that create lasting impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={ppis}
            alt="About our company"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

     
      {/* Team Section */}
      <section className="py-16 bg-gradient-to-tr from-red-950 via-black to-blue-950">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-10"
          >
             Program Directors
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Tarik Kamal" , img: img3 },
              { name: "Ahmed EL-Shoura", role: "General coordinator", img: img1 },
              { name: "Ahmed Nady", role: "General Registrar", img: img2 },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-gray-900 shadow-lg  p-6 rounded-xl  hover:shadow-2xl transition"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
