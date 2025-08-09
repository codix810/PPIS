'use client';

import { useState } from 'react';

export default function AddTopStudentPage() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }
    if (!name.trim()) {
      alert('Please enter the student name');
      return;
    }
    if (!description.trim()) {
      alert('Please enter the description');
      return;
    }

    setLoading(true);

    try {
      // رفع الصورة على Cloudinary
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'unsigned_dashboard'); // غيرها باسم الـ upload preset عندك
      formData.append('folder', 'ppis-top-students'); // فولدر مخصص للطلاب

      const cloudRes = await fetch(
        'https://api.cloudinary.com/v1_1/dfbadbos5/image/upload', // غيّر dfbadbos5 لاسم السحابة عندك
        {
          method: 'POST',
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();

      if (!cloudRes.ok || !cloudData.secure_url) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const imageUrl = cloudData.secure_url;

      // ارسال البيانات للـ backend
      const studentData = {
        name,
        description,
        imageUrl,
      };

      const res = await fetch('/api/AddStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!res.ok) {
        throw new Error('Failed to add top student');
      }

      alert('Top student added successfully!');

      // تفريغ الحقول
      setImage(null);
      setName('');
      setDescription('');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add Top Student</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold">Student Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Student Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-5 py-3 rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Top Student'}
        </button>
      </form>
    </div>
  );
}
