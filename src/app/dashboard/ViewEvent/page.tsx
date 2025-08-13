'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
}

export default function AdminEventPage() {
  const [event, setEvent] = useState<Event[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const fetchEvent = async () => {
    const res = await fetch('/api/Event');
    const data = await res.json();
    setEvent(Array.isArray(data) ? data : data.event || []);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const res = await fetch(`/api/Event/${deleteId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setMessage('News deleted successfully.');
      fetchEvent();
    } else {
      setMessage('Failed to delete news.');
    }
    setShowConfirm(false);

    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/AddEvent/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Activites</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {event.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-bold mt-2">{item.title}</h2>
            <p className="text-gray-600 mt-1 line-clamp-3">{item.content}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(item._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
