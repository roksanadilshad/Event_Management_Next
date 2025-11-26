"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="bg-gray-200 px-3 py-1 rounded"
    >
      ← Back
    </button>
  );
}
