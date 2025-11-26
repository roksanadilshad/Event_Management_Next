"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import Image from "next/image";

interface EventItem {
  _id: string;
  title: string;
  fullDescription: string;
  shortDescription: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  priority: string;
  image: string;
}

function AddEventForm({ onAdd }: { onAdd: (event: EventItem) => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const router = useRouter();
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) router.push("/login");
      else setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (checkingAuth)
    return (
      <div className="flex justify-center py-20">
        <HashLoader color="#FFC4C4" size={80} />
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          shortDesc,
          fullDesc,
          price,
          image: imageUrl,
          date,
          time,
          location,
          category,
          priority,
          userId: user?.uid,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error("Failed to add event");
        return;
      }

      toast.success("Event added successfully!");
      setTitle("");
      setShortDesc("");
      setFullDesc("");
      setPrice("");
      setImageUrl("");
      setTime("");
      setDate("");
      setLocation("");
      setCategory("");
      setPriority("");

      // Ensure _id is string
      const newEvent: EventItem = { ...data.event, _id: String(data.event._id) };
      onAdd(newEvent);
      router.push("/items");
    } catch (err) {
      console.error(err);
      toast.error("Error adding event");
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-md mb-6 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#850E35]">Add New Event</h2>
      </div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
          required
        />
        <textarea
          placeholder="Full Description"
          value={fullDesc}
          onChange={(e) => setFullDesc(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
          rows={3}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
          />
          <input
            type="text"
            placeholder="Time (e.g., 09:00 AM - 05:00 PM)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
          />
        </div>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
        />
        <input
          type="text"
          placeholder="Priority (Low/Medium/High)"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
        />
        <button
          type="submit"
          className="w-full py-3 bg-[#EE6983] text-white font-semibold rounded-lg shadow hover:bg-[#d94f6b] transition"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default function EventsDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) router.push("/login");
      else setUser(firebaseUser);
      setCheckingAuth(false);
    });
    console.log(user);
    
    return () => unsubscribe();
  }, [router, user]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data: EventItem[]) => {
        // Ensure _id is string
        const formatted = data.map((e) => ({ ...e, _id: String(e._id) }));
        setEvents(formatted);
        setFilteredEvents(formatted);
      })
      .catch(console.error);
  }, []);

  const isValidUrl = (url?: string) => {
    try {
      if (!url) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = events.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.shortDescription.toLowerCase().includes(term) ||
        e.fullDescription.toLowerCase().includes(term)
    );
    setFilteredEvents(filtered);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#850E35",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((e) => e._id !== id));
      setFilteredEvents((prev) => prev.filter((e) => e._id !== id));

      toast.success("Event deleted!");
      Swal.fire({
        title: "Deleted!",
        text: "Your event has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };

  if (checkingAuth)
    return (
      <div className="flex py-40 justify-center items-center">
        <HashLoader color="#FFC4C4" size={100} />
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-[#FCF5EE] min-h-screen">
      <AddEventForm
        onAdd={(newEvent) => {
          setEvents((prev) => [...prev, newEvent]);
          setFilteredEvents((prev) => [...prev, newEvent]);
        }}
      />

      {/* Search Bar */}
      <div className="flex mb-6 shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border-none focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-[#EE6983] text-white px-6 font-medium hover:bg-[#d94f6b] transition"
        >
          Search
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#850E35]">Your Events</h1>
        <p className="text-[#850E35]/70">Manage your events</p>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-[#FFC4C4] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <div className="relative w-full h-48 bg-[#FFE0E0]">
              <Image
                src={isValidUrl(event.image) ? event.image : "/placeholder.jpg"}
                alt={event.title}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg text-[#850E35]">{event.title}</h2>
              <p className="text-[#850E35]/80 mt-1 line-clamp-2">{event.shortDescription}</p>
              <p className="font-semibold text-[#850E35] mt-2">${event.price}</p>
              <div className="flex gap-2 mt-3">
                <Link
                  href={`/items/${event._id}`}
                  className="flex-1 text-center py-2 bg-[#EE6983] text-white rounded-lg hover:bg-[#d94f6b] transition"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex-1 py-2 bg-[#850E35] text-white rounded-lg hover:bg-[#6a0c2a] transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-[#850E35]/60 mt-10">No events found.</p>
      )}
    </div>
  );
}
