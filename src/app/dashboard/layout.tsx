'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaPlusCircle,
  FaSignOutAlt,
  FaUserGraduate,
  FaUserPlus,
  FaChalkboardTeacher,
  FaUserTie,
  FaNewspaper,
  FaCalendarCheck,
  FaCalendarPlus,
  FaUsers,
  FaTasks,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const closeSidebar = () => setSidebarOpen(false);

  const groupClass =
    'flex flex-col gap-2 pb-4 border-b border-gray-300 last:border-b-0';
  const linkClass =
    'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:translate-x-1';

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* زر الهامبرجر للموبايل */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-red-400 text-white p-2 rounded-md shadow-lg"
      >
        <FaBars size={20} />
      </button>

      {/* خلفية شفافة عند فتح القائمة */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b from-red-50 via-pink-50 to-orange-50 shadow-lg flex flex-col p-4 gap-4 z-50 transform transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* زر إغلاق في الموبايل */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-lg font-bold text-gray-800">{username}</h2>
          <button onClick={closeSidebar} className="text-gray-600">
            <FaTimes size={20} />
          </button>
        </div>

        {/* اسم المستخدم في الديسكتوب */}
        <h2 className="text-lg font-bold text-gray-800 mb-4 hidden lg:block">
          {username}
        </h2>

        {/* روابط القائمة */}
        <div className={groupClass}>
          <Link href="/dashboard" onClick={closeSidebar} className={`${linkClass} text-black hover:bg-red-100`}>
            <FaNewspaper /> <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/messages" onClick={closeSidebar} className={`${linkClass} text-black hover:bg-red-100`}>
            <FaNewspaper /> <span> view messages</span>
          </Link>
        </div>

        <div className={groupClass}>
          <Link href="/dashboard/ViewNews" onClick={closeSidebar} className={`${linkClass} text-red-700 hover:bg-red-100`}>
            <FaNewspaper /> <span>View News</span>
          </Link>
          <Link href="/dashboard/AddNews" onClick={closeSidebar} className={`${linkClass} text-red-500 hover:bg-red-100`}>
            <FaPlusCircle /> <span>Add News</span>
          </Link>
        </div>

        <div className={groupClass}>
          <Link href="/dashboard/ViewStudent" onClick={closeSidebar} className={`${linkClass} text-purple-700 hover:bg-purple-100`}>
            <FaUserGraduate /> <span>View Students</span>
          </Link>
          <Link href="/dashboard/AddStudent" onClick={closeSidebar} className={`${linkClass} text-purple-500 hover:bg-purple-100`}>
            <FaUserPlus /> <span>Add Student</span>
          </Link>
        </div>

        <div className={groupClass}>
          <Link href="/dashboard/ViewTeacher" onClick={closeSidebar} className={`${linkClass} text-green-700 hover:bg-green-100`}>
            <FaChalkboardTeacher /> <span>View Teachers</span>
          </Link>
          <Link href="/dashboard/AddTeacher" onClick={closeSidebar} className={`${linkClass} text-green-500 hover:bg-green-100`}>
            <FaUserTie /> <span>Add Teacher</span>
          </Link>
        </div>

        <div className={groupClass}>
          <Link href="/dashboard/ViewStuActiv" onClick={closeSidebar} className={`${linkClass} text-orange-700 hover:bg-orange-100`}>
            <FaTasks /> <span>View Stu Activ</span>
          </Link>
          <Link href="/dashboard/AddStuActiv" onClick={closeSidebar} className={`${linkClass} text-orange-500 hover:bg-orange-100`}>
            <FaPlusCircle /> <span>Add Stu Activ</span>
          </Link>
        </div>

        <div className={groupClass}>
          <Link href="/dashboard/ViewEvent" onClick={closeSidebar} className={`${linkClass} text-pink-700 hover:bg-pink-100`}>
            <FaCalendarCheck /> <span>View Event</span>
          </Link>
          <Link href="/dashboard/AddEvent" onClick={closeSidebar} className={`${linkClass} text-pink-500 hover:bg-pink-100`}>
            <FaCalendarPlus /> <span>Add Event</span>
          </Link>
        </div>

        <div className={groupClass}>
          <Link href="/dashboard/ViewComEng" onClick={closeSidebar} className={`${linkClass} text-teal-700 hover:bg-teal-100`}>
            <FaUsers /> <span>View Community</span>
          </Link>
          <Link href="/dashboard/AddComEng" onClick={closeSidebar} className={`${linkClass} text-teal-500 hover:bg-teal-100`}>
            <FaPlusCircle /> <span>Add Community</span>
          </Link>
        </div>

        <div className={groupClass}>
          <Link href="/dashboard/ViewIntPro" onClick={closeSidebar} className={`${linkClass} text-indigo-700 hover:bg-indigo-100`}>
            <FaCalendarCheck /> <span>View IntPro</span>
          </Link>
          <Link href="/dashboard/AddIntPro" onClick={closeSidebar} className={`${linkClass} text-indigo-500 hover:bg-indigo-100`}>
            <FaPlusCircle /> <span>Add IntPro</span>
          </Link>
        </div>

        <button
          onClick={() => { handleLogout(); closeSidebar(); }}
          className="flex items-center gap-3 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg mt-auto transition-all duration-200 hover:translate-x-1"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
