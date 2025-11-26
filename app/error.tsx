// app/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error page caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FCF5EE] p-6">
      <h1 className="text-6xl font-bold text-[#850E35] mb-4">⚠️ Error</h1>
      <p className="text-lg text-[#850E35] mb-6">{error.message || "Something went wrong."}</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#EE6983] text-white font-medium rounded-lg hover:bg-[#850E35] transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-[#FFC4C4] text-[#850E35] font-medium rounded-lg hover:bg-[#EE6983] hover:text-white transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
