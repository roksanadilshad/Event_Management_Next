"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#850E35] text-[#FCF5EE] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        
        {/* Logo & Description */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Evenify</h2>
          <p className="text-gray-200">
            Your ultimate platform to manage, organize, and track all your events effortlessly. Connect with attendees and make your events unforgettable.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="#" className="hover:text-[#FFC4C4] transition">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="hover:text-[#FFC4C4] transition">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-[#FFC4C4] transition">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-[#FFC4C4] transition">
              <FaLinkedinIn size={20} />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:w-1/3 grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-200">
              <li><Link href="/" className="hover:text-[#FFC4C4] transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#FFC4C4] transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#FFC4C4] transition">Contact</Link></li>
              <li><Link href="/items" className="hover:text-[#FFC4C4] transition">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-200">
              <li><Link href="/terms" className="hover:text-[#FFC4C4] transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#FFC4C4] transition">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:text-[#FFC4C4] transition">FAQ</Link></li>
              <li><Link href="/support" className="hover:text-[#FFC4C4] transition">Support</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#FFC4C4] mt-10 pt-6 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} Evenify. All rights reserved.
      </div>
    </footer>
  );
}
