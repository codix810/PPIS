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

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((m) =>
      [m.name, m.email, m.message].some((v) =>
        String(v || "").toLowerCase().includes(query)
      )
    );
  }, [messages, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    // لما تغيّر نتيجة الفلترة ارجع لأول صفحة
    setPage(1);
  }, [q, pageSize]);

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch("/api/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } else {
      alert("Failed to delete message");
    }
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
        {/* Header + Controls */}
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Contact Messages</h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name / email / text…"
              className="w-full sm:w-72 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600"
            />
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full sm:w-32 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
            <p className="text-gray-300 mb-2">No messages found.</p>
            <p className="text-gray-500 text-sm">
              Try adjusting the search text or page size.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile / small screens = Cards */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:hidden">
              {pageItems.map((m) => (
                <div
                  key={m._id}
                  className="w-full rounded-lg border border-gray-800 bg-gray-900 p-4"
                >
                  <div className="mb-2">
                    <p className="font-semibold break-words">
                      {m.name} <span className="text-gray-400">({m.email})</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(m.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm break-words">{m.message}</p>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => deleteMessage(m._id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* md+ screens = Table */}
            <div className="mt-4 hidden sm:block">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-900">
                      <th className="text-left text-sm font-semibold px-4 py-3 border-b border-gray-800">
                        Name
                      </th>
                      <th className="text-left text-sm font-semibold px-4 py-3 border-b border-gray-800">
                        Email
                      </th>
                      <th className="text-left text-sm font-semibold px-4 py-3 border-b border-gray-800">
                        Date
                      </th>
                      <th className="text-left text-sm font-semibold px-4 py-3 border-b border-gray-800">
                        Message
                      </th>
                      <th className="text-right text-sm font-semibold px-4 py-3 border-b border-gray-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((m) => (
                      <tr
                        key={m._id}
                        className="odd:bg-gray-950 even:bg-[#0f0f10] hover:bg-[#141416]"
                      >
                        <td className="px-4 py-3 align-top break-words">
                          <div className="font-semibold">{m.name}</div>
                        </td>
                        <td className="px-4 py-3 align-top break-words text-gray-300">
                          {m.email}
                        </td>
                        <td className="px-4 py-3 align-top text-gray-400 whitespace-nowrap">
                          {new Date(m.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="max-w-[40ch] overflow-hidden text-ellipsis">
                            <span className="break-words">{m.message}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex justify-end">
                            <button
                              onClick={() => deleteMessage(m._id)}
                              className="rounded-md bg-red-600 px-3 py-1 text-sm hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-400">
                Showing{" "}
                <span className="text-gray-200">
                  {filtered.length === 0 ? 0 : pageStart + 1}
                </span>{" "}
                to{" "}
                <span className="text-gray-200">
                  {Math.min(pageStart + pageSize, filtered.length)}
                </span>{" "}
                of <span className="text-gray-200">{filtered.length}</span> messages
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-md border border-gray-700 bg-gray-900 px-3 py-1 text-sm disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="text-sm">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-md border border-gray-700 bg-gray-900 px-3 py-1 text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
