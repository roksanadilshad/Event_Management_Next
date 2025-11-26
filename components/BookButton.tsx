"use client";

import { useState } from "react";

interface BookNowButtonProps {
  eventId: string;
  eventTitle: string;
}

export default function BookNowButton({ eventId, eventTitle }: BookNowButtonProps) {
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    // Here you can call an API to register/book for this event
    // For now, we simulate booking
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
