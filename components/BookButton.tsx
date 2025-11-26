"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookNowButtonProps {
  eventId: string;
  eventTitle: string;
}

export default function BookNowButton({ eventTitle }: BookNowButtonProps) {
  const [booked, setBooked] = useState(false);
   const { user } = useAuth();
  const router = useRouter();

  const handleBooking = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setBooked(true);
  };

  return (
    <button
      onClick={handleBooking}
      className={`inline-block font-medium px-6 py-3 rounded-lg shadow transition-colors ${
        booked
          ? "bg-green-600 text-white cursor-not-allowed"
          : "bg-[#850E35] text-[#FCF5EE] hover:bg-[#FCF5EE] transition-all  hover:text-[#850E35]"
      }`}
      disabled={booked}
    >
      {booked ? "Booked ✓" : `Book Now for "${eventTitle}"`}
    </button>
  );
}
