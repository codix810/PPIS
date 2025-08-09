'use client';

import { useState } from 'react';

export default function AddNewsPage() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    setLoading(true);

    try {
      // رفع الصورة على Cloudinary مباشرة
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'unsigned_dashboard'); // غيرها باسم الـ upload preset عندك في Cloudinary
      formData.append('folder', 'ppis-news'); // اختياري: فولدر في Cloudinary

      const cloudRes = await fetch(
        'https://api.cloudinary.com/v1_1/dfbadbos5/image/upload', // غيّر dfbadbos5 لاسم السحابة عندك
        {
          method: 'POST',
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();

      if (!cloudRes.ok || !cloudData.secure_url) {
        throw new Error('فشل رفع الصورة إلى Cloudinary');
      }

      const imageUrl = cloudData.secure_url;

      // ارسال البيانات للـ backend مع رابط الصورة
      const newsData = {
        title,
        content,
        date,
        notes,
        imageUrl,
      };

      const res = await fetch('/api/AddNews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      if (!res.ok) {
        throw new Error('فشل إضافة الخبر');
      }

      alert('تم إضافة الخبر بنجاح!');

      // تفريغ الحقول
      setImage(null);
      setTitle('');
      setContent('');
      setDate('');
      setNotes('');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add News</h1>
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
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Notes / Extra</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'جاري الإضافة...' : 'Add News'}
        </button>
      </form>
    </div>
  );
}
