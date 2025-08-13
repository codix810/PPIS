'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaPlusCircle, 
  FaSignOutAlt, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaNewspaper, 
  FaCalendarAlt 
} from 'react-icons/fa';
import Link from 'next/link';

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
  }, [router]);

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
          } flex-col md:flex md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6 mt-4 md:mt-0 w-full transition-all`}
        >
          {/* News */}
          <Link
            href="/dashboard/ViewNews"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaNewspaper />
            <span>View News</span>
          </Link>
          <Link
            href="/dashboard/AddNews"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add News</span>
          </Link>

          {/* Students */}
          <Link
            href="/dashboard/ViewStudent"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaUsers />
            <span>View Students</span>
          </Link>
          <Link
            href="/dashboard/AddStudent"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-purple-700 hover:bg-purple-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add Student</span>
          </Link>

          {/* Teachers */}
          <Link
            href="/dashboard/ViewTeacher"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-green-600 hover:bg-green-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaChalkboardTeacher />
            <span>View Teachers</span>
          </Link>
          <Link
            href="/dashboard/AddTeacher"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-green-700 hover:bg-green-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add Teacher</span>
          </Link>

          {/* Student Activities */}
          <Link
            href="/dashboard/ViewStuActiv"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-orange-600 hover:bg-orange-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaChalkboardTeacher />
            <span>View Stu Activ</span>
          </Link>
          <Link
            href="/dashboard/AddStuActiv"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-orange-700 hover:bg-orange-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add Stu Activ</span>
          </Link>

          {/* Events */}
          <Link
            href="/dashboard/ViewEvent"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaCalendarAlt />
            <span>View Event</span>
          </Link>
          <Link
            href="/dashboard/AddEvent"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-pink-700 hover:bg-pink-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add Event</span>
          </Link>

        {/* Community Engagemen*/}
          <Link
            href="/dashboard/ViewComEng"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaCalendarAlt />
            <span>View Comunity</span>
          </Link>
          <Link
            href="/dashboard/AddComEng"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-pink-700 hover:bg-pink-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add Comunity</span>
          </Link>

        {/* Internship Programming*/}
          <Link
            href="/dashboard/ViewIntPro"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-md transition duration-200"
          >
            <FaCalendarAlt />
            <span>View IntPro</span>
          </Link>
          <Link
            href="/dashboard/AddIntPro"
            className="flex items-center gap-2 justify-center whitespace-nowrap text-pink-700 hover:bg-pink-200 px-4 py-2 rounded-md transition duration-200"
          >
            <FaPlusCircle />
            <span>Add IntPro</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 justify-center whitespace-nowrap text-red-500 hover:bg-red-100 px-4 py-2 rounded-md transition duration-200"
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
