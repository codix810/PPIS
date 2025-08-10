'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Teacher {
  _id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  description: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const res = await fetch('/api/teacher');
    const data = await res.json();
    setTeachers(data.teachers || []);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/teacher/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setTeachers((prev) => prev.filter((t) => t._id !== id));
      setConfirmDelete(null);
      showMessage('success', 'Teacher deleted successfully');
    } else {
      showMessage('error', 'Error deleting teacher');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Teachers List</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded flex items-center gap-2 text-white transition-all duration-300 ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
          {message.text}
        </div>
      )}

      {teachers.length === 0 ? (
        <p className="text-gray-500 text-center">No teachers available</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Specialty</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={teacher.imageUrl}
                      alt={teacher.name}
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="p-3 font-medium">{teacher.name}</td>
                  <td className="p-3 text-gray-600">{teacher.specialty}</td>
                  <td className="p-3 text-gray-500">{teacher.description}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => router.push(`/dashboard/AddTeacher/${teacher._id}`)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    {confirmDelete === teacher._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(teacher._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 text-xs rounded"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(teacher._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
