// src/app/contact/page.tsx
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../../public/ppis-removebg-preview.png";

export default function ContactPage() {
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
            Have questions or want to collaborate? Reach out to our team and we’ll get back to you quickly.
          </p>
        </div>

        {/* Logo */}
        <Image
          src={logo}
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
          <p className="">
            Feel free to reach out to us using any of the methods below.
          </p>
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
            <span> Egypt ,  Assuit</span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-gray-950 rounded-xl  shadow-white shadow-lg hover:shadow-2xl duration-500 p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-700 to-blue-700 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}
