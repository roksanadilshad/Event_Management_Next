// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FCF5EE] p-6">
      <h1 className="text-6xl font-bold text-[#850E35] mb-4 animate-bounce">404</h1>
      <p className="text-xl text-[#850E35] mb-6">Oops! Page not found.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#EE6983] text-white font-medium rounded-lg hover:bg-[#850E35] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
