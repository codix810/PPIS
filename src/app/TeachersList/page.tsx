'use client';
import Image from "next/image";

import { motion } from "framer-motion";
import img1 from "../../../public/الشورى.jpg";
import img2 from "../../../public/الحبشي.jpg";
import img3 from "../../../public/طارق.jpg";


const page = () => {
  return (
    
      <section className="py-16 bg-gradient-to-tr from-red-950 via-black to-blue-950">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl text-white font-bold mb-10"
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
  )
}

export default page











// الكود تحت اهه لو عايزه



// 'use client';

// import { useEffect, useState } from 'react';

// type Teacher = {
//   _id: string;
//   name: string;
//   specialty: string;
//   imageUrl: string;
// };

// export default function TeachersList() {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await fetch('/api/teacher'); // API لجلب المعلمين
//         const data = await res.json();
//         setTeachers(data.teachers);
//       } catch (error) {
//         console.error('Failed to fetch teachers', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);


//   if (loading)
//     return (
//       <div className="flex justify-center bg-black items-center h-screen">
//         {/* 3 نقاط حمراء متحركة */}
//         <div className="flex space-x-2">
//           {[...Array(3)].map((_, i) => (
//             <span
//               key={i}
//               className="w-4 h-4 bg-red-600 rounded-full animate-bounce"
//               style={{ animationDelay: `${i * 0.2}s` }}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   if (teachers.length === 0)
//     return <p className="text-center mt-20 text-red-500">No teachers found.</p>;

//   return (
//     <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
//       {teachers.map(({ _id, name, specialty, imageUrl }) => (
//         <div
//           key={_id}
//           className="relative bg-white shadow-md p-6 flex flex-col items-center text-center rounded-t-[80px] rounded-b-[8px] overflow-visible"
//           style={{ marginTop: 40 }}
//         >
//           <div
//             className="relative rounded-full border-4 border-red-600 overflow-hidden shadow-lg"
//             style={{ width: 140, height: 140, marginTop: -70, zIndex: 10, backgroundColor: '#a20000ff' }}
//           >
//             <img
//               src={imageUrl}
//               alt={name}
//               className="w-full h-full object-cover rounded-full"
//               loading="lazy"
//             />
//           </div>

//           <h3 className="mt-8 text-2xl font-semibold z-10">{name}</h3>
//           <p className="text-gray-600 text-sm mt-2 z-10">{specialty}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
