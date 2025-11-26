"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface Item {
  _id: string;
  title: string;
  shortDescription: string;
  image: string;
  price: number;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchItems = async (search: string = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/items${search ? `?search=${encodeURIComponent(search)}` : ""}`
      );
      const data: Item[] = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = () => {
    fetchItems(searchTerm);
  };

  return (
    <div className="min-h-screen bg-[#FCF5EE] text-[#850E35] p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">All Events</h1>
        <p className="text-[#850E35]/70 mb-8">Browse all available items</p>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[40%] p-3 rounded-l-lg border border-[#FFC4C4] text-[#850E35]
                       focus:ring-2 focus:ring-[#EE6983] outline-none transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="bg-[#EE6983] text-[#FCF5EE] px-6 rounded-r-lg font-semibold
                       hover:bg-[#FFC4C4] hover:text-[#850E35] transition"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-40 items-center">
                 <HashLoader
                 color="#FFC4C4"
                 size={100}
               />
    </div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-[#FFC4C4] p-4 rounded-xl shadow-md hover:shadow-xl 
                           transition transform hover:-translate-y-2"
              >
                {item.image && (
                  <Image
                    src={item.image.startsWith("http") ? item.image : `/images/${item.image}`}
                    alt={item.title}
                     width={800} // adjust to your desired size
                     height={400}
                    className="h-96 rounded-lg shadow-md"
                  />
                )}

                <h2 className="font-bold text-xl mt-4">{item.title}</h2>

                <p className="text-sm text-[#850E35]/80 mt-2 line-clamp-3">
                  {item.shortDescription}
                </p>

                <p className="font-bold text-lg text-[#850E35] mt-3">
                  ${item.price}
                </p>

                <Link
                  href={`/items/${item._id}`}
                  className="mt-4 inline-block w-full text-center bg-[#EE6983] 
                             text-[#FCF5EE] px-4 py-2 rounded-lg font-semibold 
                             hover:bg-[#850E35] transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <p className="text-center text-[#850E35]/70 mt-10">No items found.</p>
        )}
      </div>
    </div>
  );
}
