import Image from "next/image";
import Card from "../components/Card";
import Testimonials from "../components/Testimonials";
import logo from "../../public/ppis-removebg-preview.png";
import { FaCheckCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-tr from-red-950 via-black to-blue-950 h-auto min-h-[24rem] py-6 px-20 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl text-center sm:text-4xl md:text-5xl max-w-[500px] font-bold mb-4">
            <span className="text-red-700">Public</span> Policy Information{" "}
            <span className="text-blue-700">Systems</span>
          </h1>

          {/* Icons + Text */}
          <div className="flex flex-col  md:ml-22 items-center md:items-start space-y-2">
            <span className="flex space-x-6 sm:space-x-14 text-xl sm:text-2xl ml-6">
              <FaCheckCircle className="text-blue-600" />
              <FaCheckCircle className="text-green-500" />
              <FaCheckCircle className="text-yellow-300" />
              <FaCheckCircle className="text-red-600" />
            </span>
            <p className="text-base sm:text-lg font-semibold">
              Innovate | Proceed | Progress | Success
            </p>
          </div>
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

      {/* Main Content */}
      <Card />
      <Testimonials />
    </div>
  );
}
