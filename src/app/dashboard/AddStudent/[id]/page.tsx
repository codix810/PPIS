'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type Student = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id;

  const [student, setStudent] = useState<Student | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    if (!studentId) return;
    setLoading(true);
    fetch(`/api/Student/${studentId}`)
      .then(res => res.json())
      .then(data => {
        if (data.student) {
          setStudent(data.student);
          setName(data.student.name);
          setDescription(data.student.description);
          setImageUrl(data.student.imageUrl);
        } else {
          showMessage('error', 'Student not found');
          router.push('/dashboard/ViewStudent');
        }
      })
      .catch(() => {
        showMessage('error', 'Failed to fetch student');
        router.push('/dashboard/ViewStudent');
      })
      .finally(() => setLoading(false));
  }, [studentId, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/Student/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, imageUrl }),
      });
      if (!res.ok) throw new Error('Failed to update student');
      showMessage('success', 'Student updated successfully!');
      setTimeout(() => router.push('/dashboard/ViewStudent'), 1000);
    } catch {
      showMessage('error', 'Error updating student');
    } finally {
      setSaving(false);
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

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Student</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded flex items-center gap-2 text-white ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border p-2 rounded focus:ring focus:ring-red-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full border p-2 rounded focus:ring focus:ring-red-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            required
            className="w-full border p-2 rounded focus:ring focus:ring-red-300"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Student preview"
              className="w-32 h-32 rounded-full mt-3 object-cover border"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 w-full"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
