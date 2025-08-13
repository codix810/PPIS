'use client';

import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function AddStuActivPage() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      showMessage('error', 'Please select an image');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'unsigned_dashboard');
      formData.append('folder', 'ppis-StuActiv');

      const cloudRes = await fetch(
        'https://api.cloudinary.com/v1_1/dfbadbos5/image/upload',
        { method: 'POST', body: formData }
      );

      const cloudData = await cloudRes.json();

      if (!cloudRes.ok || !cloudData.secure_url) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const imageUrl = cloudData.secure_url;

      const StuActivData = { title, content, imageUrl };

      const res = await fetch('/api/AddStuActiv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(StuActivData),
      });

      if (!res.ok) throw new Error('Failed to add news');

      showMessage('success', 'News added successfully!');

      setImage(null);
      setTitle('');
      setContent('');
    } catch (error) {
      showMessage('error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">AddStuActiv</h1>

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border p-2 w-full rounded focus:ring focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full rounded focus:ring focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="border p-2 w-full rounded focus:ring focus:ring-red-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 w-full"
        >
          {loading ? 'Adding...' : 'Add StuActiv'}
        </button>
      </form>
    </div>
  );
}
