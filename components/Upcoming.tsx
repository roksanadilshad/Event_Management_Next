import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  image?: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/items/upcoming")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  return (
  
    <div className=" text-[#850E35] p-4 rounded-md shadow-md mb-4">
      <h3 className="text-3xl md:text-4xl font-bold mb-12">Upcoming Events</h3>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="bg-[#FFC4C4] p-6 rounded-xl shadow hover:shadow-lg transition">
              
                <Link
                href={`/items/${event._id}`}
                className=""
              >
                {event.image && (
                   <img
                  src={event.image}
                  alt={event.title}
                  className="text-4xl mb-4 mx-auto w-400 h-96"
                />
              )}
              <div className="">
                <div className="font-semibold text-xl mb-2">{event.title}</div>
                <div className="text-gray-600 text-sm">
                  {new Date(event.date).toLocaleDateString()}{" "}
                  {event.time ? `- ${event.time}` : ""}
                </div>
              </div>
              </Link>
            
            </div>
          ))
        )}
      </div>
    </div>
  );
}
