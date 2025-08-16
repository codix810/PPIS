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
  { name: 'News', href: '/News' },
  { name: 'Activities', href: '/activities' },
  { name: 'Subjects', href: '/subjects' },
  { name: 'Careers', href: '/careers' },
  { name: 'Students', href: '/Student' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="bg-[#1D1D1D] backdrop-blur-md shadow-md  top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <img
                  src="/ppis.jpg"
                  alt="ppis"
                  className="w-10 h-10 rounded-full"
                />
                <Link
                  href="/"
                  className="text-3xl font-bold text-white tracking-wide hover:text-red-500 transition-colors"
                >
                  PPIS
                </Link>
              </div>

              {/* Navigation items - hidden when menu button shows */}
              <div className="hidden min-[770px]:flex flex-wrap gap-3 justify-center flex-1">
                {navigation.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-2 py-1 text-sm font-bold transition  duration-200 ${
                        isActive
                          ? 'text-red-600 font-bold'
                          : 'text-white hover:text-red-500'
                      }`}
                    >
                      {item.name} |
                      {/* {idx < navigation.length - 1 && (
                        <span className="absolute mx-1  text-white">|</span>
                      )} */}
                    </Link>
                  );
                })}
              </div>

              {/* Join Us button - hidden when menu button shows */}
              <div className="hidden min-[770px]:flex">
                <Link
                  href="/join"
                  className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  Join Us
                </Link>
              </div>

              {/* Mobile Menu Button - shows only on <= 950px */}
              <div className="flex min-[770px]:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-red-600 transition-colors">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <DisclosurePanel className="min-[770px]:hidden bg-[#0B1A33]">
            <div className="space-y-1 px-3 pt-3 pb-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium ${
                      isActive
                        ? 'text-red-500 font-semibold'
                        : 'text-white hover:text-red-400 hover:bg-red-700'
                    }`}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
              <DisclosureButton
                as={Link}
                href="/join"
                className="block rounded-md px-3 py-2 mt-3 bg-red-600 text-white font-semibold text-center hover:bg-red-700 transition-colors"
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
