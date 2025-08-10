// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleLogin = () => {
  if (username === 'eeee' && password === '123456') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username); // ✅ حفظ اسم المستخدم
    router.push('/dashboard');
  } else {
    setError('بيانات الدخول غير صحيحة');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">تسجيل الدخول</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          دخول
        </button>
      </div>
    </div>
  );
}
