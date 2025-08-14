"use client";
import { useEffect, useState } from "react";

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
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<Message | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteMessage = async (id: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        setAlert({ type: "success", text: "Message deleted successfully." });
      } else {
        setAlert({ type: "error", text: "Failed to delete message." });
      }
    } catch {
      setAlert({ type: "error", text: "Something went wrong." });
    }
    setToDelete(null);
    setTimeout(() => setAlert(null), 3000);
  };

  const filteredMessages = messages.filter((m) =>
    [m.name, m.email, m.message].some((val) =>
      String(val || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

      {/* Alert */}
      {alert && (
        <div
          className={`mb-4 p-3 rounded ${
            alert.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {alert.text}
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search name / email / message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-4 py-2 border-b border-gray-700 text-left">Name</th>
              <th className="px-4 py-2 border-b border-gray-700 text-left">Email</th>
              <th className="px-4 py-2 border-b border-gray-700 text-left">Message</th>
              <th className="px-4 py-2 border-b border-gray-700 text-left">Date</th>
              <th className="px-4 py-2 border-b border-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <tr key={msg._id} className="hover:bg-gray-800">
                  <td className="px-4 py-2 border-b border-gray-700">{msg.name}</td>
                  <td className="px-4 py-2 border-b border-gray-700 break-all">{msg.email}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{msg.message}</td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700 text-right">
                    <button
                      onClick={() => setToDelete(msg)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {toDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this message from{" "}
              <span className="font-semibold">{toDelete.email}</span>?
              <span className="font-semibold">{toDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setToDelete(null)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMessage(toDelete._id)}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
