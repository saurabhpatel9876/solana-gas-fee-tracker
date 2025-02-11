"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-indigo-500 cursor-pointer">
                Solana Gas Fee Tracker
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="https://saurabhs-organization-10.gitbook.io/untitled/" className="hover:text-indigo-400">
              Gitbook
            </Link>
            <Link href="https://saurabhs-organization-10.gitbook.io/untitled/" className="hover:text-indigo-400">
              WhitePaper
            </Link>
           
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none hover:text-indigo-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <Link
            href="https://saurabhs-organization-10.gitbook.io/untitled/"
            onClick={toggleMenu}
            className="block px-4 py-2 hover:bg-indigo-600"
          >
            Gitbook
          </Link>
          <Link
            href="https://saurabhs-organization-10.gitbook.io/untitled/"
            onClick={toggleMenu}
            className="block px-4 py-2 hover:bg-indigo-600"
          >
            WhitePaper
          </Link>
          <Link
            href="/services"
            onClick={toggleMenu}
            className="block px-4 py-2 hover:bg-indigo-600"
          >
            Services
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="block px-4 py-2 hover:bg-indigo-600"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
