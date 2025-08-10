// app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/login');
    }
  }, []);

  return (
    <div className="p-8">
      
      <h1 className="text-2xl font-bold">أهلاً بيك في لوحة التحكم</h1>
      <p>المحتوى السري هنا 😎</p>
    </div>
  );
}
