import './globals.css';
import { ReactNode } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import type { Metadata } from 'next';
import '@fontsource/poppins/600.css'; // للـ bold
import '@fontsource/poppins/400.css'; // للـ normal
import '@fontsource/inter/400.css';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="font-sans bg-gray-50 text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
