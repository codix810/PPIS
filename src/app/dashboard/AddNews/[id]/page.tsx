'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface News {
  _id: string;
  title: string;
  content: string;
}

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const newsId = params.id;

  const [news, setNews] = useState<News | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    if (!newsId) return;
    setLoading(true);
    fetch(`/api/getNews/${newsId}`)
      .then(res => res.json())
      .then(data => {
        if (data.news) {
          setNews(data.news);
          setTitle(data.news.title);
          setContent(data.news.content);
        } else {
          showMessage('error', 'News not found');
          router.push('/dashboard/ViewNews');
        }
      })
      .catch(() => {
        showMessage('error', 'Failed to fetch news');
        router.push('/dashboard/ViewNews');
      })
      .finally(() => setLoading(false));
  }, [newsId, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/getNews/${newsId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error('Failed to update news');
      showMessage('success', 'News updated successfully!');
      setTimeout(() => router.push('/dashboard/ViewNews'), 1000);
    } catch {
      showMessage('error', 'Error updating news');
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
      <h1 className="text-2xl font-bold mb-6 text-center">Edit News</h1>

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
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded focus:ring focus:ring-red-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            required
            className="w-full border p-2 rounded focus:ring focus:ring-red-300"
          />
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
