'use client';

import { useState } from 'react';

export default function AddTeacherPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'unsigned_dashboard');
      formData.append('folder', 'ppis-teachers');

      const cloudRes = await fetch(
        'https://api.cloudinary.com/v1_1/dfbadbos5/image/upload',
        { method: 'POST', body: formData }
      );

      const cloudData = await cloudRes.json();
      if (!cloudRes.ok || !cloudData.secure_url) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const teacherData = {
        name,
        specialty,
        description,
        imageUrl: cloudData.secure_url,
      };

      const res = await fetch('/api/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData),
      });

      if (!res.ok) throw new Error('Failed to add teacher');

      // Success message
      setSuccessMessage(`🎉 Teacher "${name}" has been added successfully!`);
      
      // Reset form
      setImage(null);
      setPreview(null);
      setName('');
      setSpecialty('');
      setDescription('');

      // Hide message after 4s
      setTimeout(() => setSuccessMessage(null), 4000);

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {successMessage}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6"> Add New Teacher</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block mb-1 font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files ? e.target.files[0] : null)}
              className="border p-2 w-full rounded"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full h-60 object-cover rounded-lg shadow"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Specialty</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="border p-2 w-full rounded"
            />
          </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 w-full"
        >
            {loading ? 'Adding...' : 'Add Teacher'}
        </button>

        </form>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
