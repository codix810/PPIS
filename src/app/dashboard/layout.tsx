'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlusCircle, FaSignOutAlt, FaUsers, FaChalkboardTeacher, FaNewspaper } from 'react-icons/fa';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    } else {
      setUsername(storedUsername || 'Admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 md:px-6">
        <div className="flex justify-between items-center">
          <a href="/dashboard" className="font-bold text-indigo-700 text-xl tracking-wide"></a>

          <button
            className="md:hidden text-gray-600 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Menu */}
        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row md:items-center md:justify-between md:gap-6 mt-4 md:mt-0 w-full transition-all`}
        >
          {/* عرض الأخبار */}
          <a
            href="/dashboard/ViewNews"
            className="flex items-center gap-2 justify-center text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaNewspaper />
            <span>View News</span>
          </a>

          {/* إضافة خبر */}
          <a
            href="/dashboard/AddNews"
            className="flex items-center gap-2 justify-center text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add News</span>
          </a>

          {/* عرض الطلاب */}
          <a
            href="/dashboard/ViewStudent"
            className="flex items-center gap-2 justify-center text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaUsers />
            <span>View Students</span>
          </a>

          {/* إضافة طالب */}
          <a
            href="/dashboard/AddStudent"
            className="flex items-center gap-2 justify-center text-purple-700 hover:bg-purple-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add Student</span>
          </a>

          {/* عرض المعلمين */}
          <a
            href="/dashboard/ViewTeacher"
            className="flex items-center gap-2 justify-center text-green-600 hover:bg-green-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaChalkboardTeacher />
            <span>View Teachers</span>
          </a>

          {/* إضافة معلم */}
          <a
            href="/dashboard/AddTeacher"
            className="flex items-center gap-2 justify-center text-green-700 hover:bg-green-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add Teacher</span>
          </a>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 justify-center text-red-500 hover:bg-red-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="p-6">{children}</div>
    </div>
  );
}
