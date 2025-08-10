'use client';

import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function AddTopStudentPage() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return showMessage('error', 'Please select an image');
    if (!name.trim()) return showMessage('error', 'Please enter the student name');
    if (!description.trim()) return showMessage('error', 'Please enter the description');

    setLoading(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'unsigned_dashboard');
      formData.append('folder', 'ppis-top-students');

      const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dfbadbos5/image/upload', {
        method: 'POST',
        body: formData,
      });

      const cloudData = await cloudRes.json();

      if (!cloudRes.ok || !cloudData.secure_url) {
        throw new Error('Image upload failed');
      }

      const imageUrl = cloudData.secure_url;

      // Send to backend
      const res = await fetch('/api/AddStudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, imageUrl }),
      });

      if (!res.ok) throw new Error('Failed to add top student');

      showMessage('success', 'Top student added successfully!');

      // Reset form
      setImage(null);
      setName('');
      setDescription('');
    } catch (error) {
      showMessage('error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Top Student</h1>

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

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold">Student Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Student Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-red-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-5 py-3 rounded hover:bg-red-700 transition disabled:opacity-50 w-full"
        >
          {loading ? 'Adding...' : 'Add Top Student'}
        </button>
      </form>
    </div>
  );
}
