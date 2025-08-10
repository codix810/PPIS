'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Student {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/Student');
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      showMessage('error', 'Error fetching students');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/Student/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
        setConfirmDelete(null);
        showMessage('success', 'Student deleted successfully');
      } else {
        showMessage('error', 'Error deleting student');
      }
    } catch {
      showMessage('error', 'Error deleting student');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Students List</h1>

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

      {students.length === 0 ? (
        <p className="text-gray-500 text-center">No students available</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={student.imageUrl}
                      alt={student.name}
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="p-3 font-medium">{student.name}</td>
                  <td className="p-3 text-gray-500">{student.description}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => router.push(`/dashboard/AddStudent/${student._id}`)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    {confirmDelete === student._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(student._id)}
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
                        onClick={() => setConfirmDelete(student._id)}
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
