'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },  
  { name: 'Instructors', href: '/TeachersList' },
  { name: 'Subjects', href: '/subjects' },  
  { name: 'News', href: '/News' },  
  { name: 'Activities', href: '/activities' },
  { name: 'Students', href: '/Student' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-[#1D1D1D] shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              
              {/* Logo on the left */}
              <div className="flex items-center space-x-2">
                <Link href="/">
                  <img
                    src="/ppis.jpg"
                    alt="ppis"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </Link>
                <Link
                  href="/"
                  className="text-3xl font-bold text-white tracking-wide hover:text-red-500 transition-colors duration-200"
                >
                </Link>
              </div>

              {/* Navigation items in center */}
              <div className="hidden sm:flex space-x-8 flex-1 justify-center">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px- py-2 rounded-md text-sm font-medium transition duration-200 ${
                        isActive
                          ? 'text-red-500 font-semibold'
                          : 'text-white hover:text-red-400'
                      }`}
                    >
                      {item.name} <span>|</span>
                      
                    </Link>
                  );
                })}
              </div>

              {/* Join Us button on the right */}
              <div className="hidden sm:flex">
                <Link
                  href="/join"
                  className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  Join Us
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="flex sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-red-600 focus:outline-none transition-colors duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden bg-[#0B1A33]">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition duration-200 ${
                      isActive
                        ? 'text-red-500 font-semibold'
                        : 'text-white hover:text-red-400 hover:bg-red-700'
                    }`}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
              {/* Join Us button in mobile menu */}
              <DisclosureButton
                as={Link}
                href="/join"
                className="block rounded-md px-3 py-2 mt-2 bg-red-600 text-white font-semibold text-center hover:bg-red-700 transition-colors duration-200"
              >
                Join Us
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
