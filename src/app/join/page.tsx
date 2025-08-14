"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch {
      setStatus("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-tr from-red-950 via-black to-blue-950 h-auto min-h-[20rem] py-8 px-6 md:px-20 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-red-700">Get in</span> Touch
          </h1>
          <p className="text-base sm:text-lg max-w-[500px]">
            Have questions or want to collaborate? Reach out to our team and
            we’ll get back to you quickly.
          </p>
        </div>

        {/* Logo */}
        <Image
          src="/ppis-removebg-preview.png"
          alt="Website Logo"
          width={300}
          height={120}
          className="w-40 sm:w-56 md:w-72 h-auto"
        />
      </div>

      {/* Contact Info + Form */}
      <div className="px-6 md:px-20 py-12 grid grid-cols-1 bg-black md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 text-white">
          <h2 className="text-2xl font-bold ">Contact Information</h2>
          <p>Feel free to reach out to us using any of the methods below.</p>
          <div className="flex items-center text-w space-x-4">
            <FaPhoneAlt className="text-blue-600 text-xl" />
            <span>+20 123 456 789</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-red-600 text-xl" />
            <span>contact@ppis.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-green-600 text-xl" />
            <span> Egypt , Assuit</span>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-950 rounded-xl shadow-white shadow-lg hover:shadow-2xl duration-500 p-6 space-y-4"
        >
          <div>
            <label className="block  text-white text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border text-white border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border text-white border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full border text-white border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-700 to-blue-700 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {status && <p className="text-white mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}
