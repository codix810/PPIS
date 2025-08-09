'use client';

import { useState } from 'react';

export default function AddTeacherPage() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'unsigned_dashboard');
      formData.append('folder', 'ppis-teachers');

      const cloudRes = await fetch(
        'https://api.cloudinary.com/v1_1/dfbadbos5/image/upload',
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

      const teacherData = {
        name,
        specialty,
        description,
        imageUrl,
      };

      console.log('Sending data:', teacherData); // تحقق من البيانات هنا

      const res = await fetch('/api/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      });

      if (!res.ok) {
        throw new Error('Failed to add teacher');
      }

      alert('Teacher added successfully!');

      setImage(null);
      setName('');
      setSpecialty('');
      setDescription('');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Teacher</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 w-full"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Specialty</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Teacher'}
        </button>
      </form>
    </div>
  );
}
