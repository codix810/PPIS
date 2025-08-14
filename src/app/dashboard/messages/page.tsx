"use client";

import { useEffect, useMemo, useState } from "react";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);

  // جلب البيانات
  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // البحث
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((m) =>
      [m.name, m.email, m.message].some((v) =>
        String(v || "").toLowerCase().includes(query)
      )
    );
  }, [messages, q]);

  // الصفحات
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [q, pageSize]);

  // تأكيد الحذف
  const confirmDelete = (message: Message) => {
    setDeleteTarget(message);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch("/api/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget._id }),
    });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m._id !== deleteTarget._id));
      setStatusMsg({ type: "success", text: "تم حذف الرسالة بنجاح ✅" });
    } else {
      setStatusMsg({ type: "error", text: "فشل حذف الرسالة ❌" });
    }
    setDeleteTarget(null);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
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
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto w-full max-w-screen-xl px-3 sm:px-6 py-6">

        {/* رسالة النجاح/الخطأ */}
        {statusMsg && (
          <div
            className={`mb-4 rounded-lg p-3 text-sm ${
              statusMsg.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* مودال تأكيد الحذف */}
        {deleteTarget && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full shadow-lg border border-gray-700">
              <h2 className="text-lg font-bold mb-3">تأكيد الحذف</h2>
              <p className="text-sm text-gray-300 mb-6">
                هل أنت متأكد أنك تريد حذف الرسالة من{" "}
                <span className="text-red-400">{deleteTarget.name}</span>؟
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        )}

        {/* العنوان والبحث */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث..."
            className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white w-full sm:w-64"
          />
        </div>

        {/* عرض جدول على الشاشات الكبيرة وكروت على الصغيرة */}
        <div className="hidden md:block">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Message</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((m) => (
                <tr key={m._id} className="border-t border-gray-700">
                  <td className="p-2">{m.name}</td>
                  <td className="p-2">{m.email}</td>
                  <td className="p-2">{m.message}</td>
                  <td className="p-2">
                    {new Date(m.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => confirmDelete(m)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* كروت للموبايل */}
        <div className="md:hidden space-y-4">
          {pageItems.map((m) => (
            <div
              key={m._id}
              className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700"
            >
              <p className="font-semibold">
                {m.name} ({m.email})
              </p>
              <p className="text-sm text-gray-400">
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <p className="mt-2">{m.message}</p>
              <button
                onClick={() => confirmDelete(m)}
                className="mt-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* الصفحات */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <label>Rows:</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
