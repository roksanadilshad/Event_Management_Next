"use client";

import Link from "next/link";

export default function ItemNotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FCF5EE] p-6">
      <h1 className="text-6xl font-bold text-[#850E35] mb-4 animate-pulse">😢</h1>
      <h2 className="text-3xl font-semibold text-[#850E35] mb-4">Item Not Found</h2>
      <p className="text-[#850E35] mb-6 text-center max-w-md">
        The event you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/items"
        className="px-6 py-3 bg-[#EE6983] text-white font-medium rounded-lg hover:bg-[#850E35] transition"
      >
        Back to Events
      </Link>
    </div>
  );
}
