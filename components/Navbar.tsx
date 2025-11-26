"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

export default function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-[#FFC4C4] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#850E35]">
          Eventify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-[#850E35]">
          <Link href="/" className="hover:text-[#FCF5EE] transition">
            Home
          </Link>
          <Link href="/items" className="hover:text-[#FCF5EE] transition">
            Events
          </Link>
          <Link href="/about" className="hover:text-[#FCF5EE] transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#FCF5EE] transition">
            Contact
          </Link>

          {/* Auth Section */}
          {!user ? (
            <div className="flex space-x-3">
              <Link
                href="/login"
                className="px-4 py-2 bg-[#EE6983] text-white rounded-md hover:bg-[#850E35] transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-[#EE6983] text-white rounded-md hover:bg-[#850E35] transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100 transition"
              >
                <Image
                width={500}      // specify actual width
                height={400}  
                  src={user.photoURL || "/default-avatar.png"}
                  alt="user"
                  className="w-7 h-7 rounded-full"
                />
                <span>{user.displayName || "User"}</span>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#850E35] text-[#FCF5EE] shadow rounded p-2 ">
                  <Link
                    href="/dashboard/add-event"
                    className="block px-3 py-2 hover:bg-[#FFC4C4] transition-all hover:text-[#850E35] rounded"
                  > 
                    Add Event
                  </Link>
                  <Link
                    href="/dashboard/manage-event"
                    className="block px-3 py-2 hover:bg-[#FFC4C4] transition-all hover:text-[#850E35] rounded"
                  >
                    Manage Events
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 mt-1 bg-[#EE6983] text-white rounded hover:bg-[#FFC4C4] transition-all hover:text-[#850E35]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#850E35] text-2xl font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FCF5EE] text-[#850E35] px-6 pb-4 shadow">
          <Link href="/" className="block py-2">
            Home
          </Link>
          <Link href="/items" className="block py-2">
            Events
          </Link>
          <Link href="/about" className="block py-2">
            About
          </Link>
          <Link href="/contact" className="block py-2">
            Contact
          </Link>

          {!user ? (
            <div className="space-y-2 mt-2">
              <Link
                href="/login"
                className="block bg-[#EE6983] text-white text-center py-2 rounded-md hover:bg-[#850E35] transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block bg-[#EE6983] text-white text-center py-2 rounded-md hover:bg-[#850E35] transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="space-y-2 bg-[#850E35] text-[#FCF5EE] rounded-2xl mt-2">
              <Link
                href="/dashboard/add-event"
                className="block px-3 py-2 hover:bg-[#FFC4C4] transition-all hover:text-[#850E35] rounded"
              >
                Add Event
              </Link>
              <Link
                href="/dashboard/manage-event"
                className="block px-3 py-2 hover:bg-[#FFC4C4] transition-all hover:text-[#850E35] rounded"
              >
                Manage Events
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 bg-[#EE6983] text-white  hover:bg-[#FFC4C4] transition-all hover:text-[#850E35] rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
