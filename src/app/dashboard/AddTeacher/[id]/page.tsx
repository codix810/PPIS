'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaSave, FaTimes } from 'react-icons/fa';

type TTeacher = {
  name: string;
  specialty: string;
  imageUrl: string;
  description: string;
  _id?: string;
};

export default function EditTeacherPage() {
  const { id } = useParams();
  const router = useRouter();

  const [teacher, setTeacher] = useState<TTeacher>({
    name: '',
    specialty: '',
    imageUrl: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Teacher ID not found in URL.');
      setLoading(false);
      return;
    }

    const fetchTeacher = async () => {
      try {
        const res = await fetch(`/api/teacher/${id}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        const t = data?.teacher ?? data;
        if (!t) {
          setError('Teacher data not found.');
        } else {
          setTeacher((prev) => ({ ...prev, ...t }));
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleUpdate = async () => {
    setError(null);
    try {
      const res = await fetch(`/api/teacher/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => null);
        throw new Error(d?.message || `Update failed ${res.status}`);
      }

      router.push('/dashboard/ViewTeacher');
    } catch (err: any) {
      setError(err.message || 'Update failed.');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="w-4 h-4 bg-red-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        ❌ {error}
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center"> Edit Teacher</h1>

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={teacher.name}
          onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
        />

        <label className="block mb-2 font-medium">Specialty</label>
        <input
          type="text"
          placeholder="Enter specialty"
          value={teacher.specialty}
          onChange={(e) => setTeacher({ ...teacher, specialty: e.target.value })}
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
        />

        <label className="block mb-2 font-medium">Image URL</label>
        <input
          type="text"
          placeholder="Enter image URL"
          value={teacher.imageUrl}
          onChange={(e) => setTeacher({ ...teacher, imageUrl: e.target.value })}
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
        />

        {teacher.imageUrl && (
          <div className="mb-4">
            <img
              src={teacher.imageUrl}
              alt="Preview"
              className="w-full h-60 object-cover rounded-lg shadow"
            />
          </div>
        )}

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          placeholder="Enter description"
          value={teacher.description}
          onChange={(e) => setTeacher({ ...teacher, description: e.target.value })}
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mb-6"
          rows={4}
        ></textarea>

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleUpdate}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FaSave /> Save
          </button>
          <button
            onClick={() => router.push('/dashboard/ViewTeacher')}
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
