import BookNowButton from "@/components/BookButton";
import ItemNotFound from "@/components/ItemNotFound";
import Image from "next/image";
import Link from "next/link";

interface Item {
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

async function getItem(id: string): Promise<Item | null> {
  try {
    const res = await fetch(`https://event-management-next-fscg.vercel.app/api/items/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Fetch item error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
  return null;
}
}


async function getRelatedItems(currentId: string): Promise<Item[]> {
  try {
    const res = await fetch(`https://event-management-next-fscg.vercel.app/api/items`);
    const data: Item[] = await res.json();
    return data.filter((item) => item._id !== currentId).slice(0, 3);
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface Props {
  params: { id: string };
}

const ItemPage = async ({ params }: Props) => {
  const { id } = await params;
  const item = await getItem(id);
  const relatedEvents = await getRelatedItems(id);

  if (!item)
    return (
     <ItemNotFound></ItemNotFound>
    );
console.log(relatedEvents)
  return (
    <div className="bg-[#FCF5EE] min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          href="/items"
          className="inline-block mb-6 text-[#850E35] hover:text-[#EE6983] transition font-medium"
        >
          &larr; Back to Events
        </Link>

        {/* Main Container */}
        <div className="bg-[#FFC4C4] text-[#850E35] shadow-lg rounded-2xl overflow-hidden md:flex md:gap-8 p-6">

          {/* Left: Image */}
          <div className="md:w-1/2 rounded-xl overflow-hidden shadow-md">
            <Image
            width={500}      // specify actual width
  height={400}  
              src={item.image}
              alt={item.title}
              className="w-full h-80 md:h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right: Info */}
          <div className="md:w-1/2 flex flex-col justify-between mt-6 md:mt-0">
            <div>
              {/* Title */}
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                {item.title}
              </h1>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="bg-white text-[#850E35] px-3 py-1 rounded-full text-sm shadow">
                  🕒 {item.time}
                </span>
                <span className="bg-white text-[#850E35] px-3 py-1 rounded-full text-sm shadow">
                  📍 {item.location}
                </span>
                <span className="bg-white text-[#850E35] px-3 py-1 rounded-full text-sm shadow">
                  💰 ${item.price}
                </span>
                <span className="bg-white text-[#850E35] px-3 py-1 rounded-full text-sm shadow">
                  ⭐ {item.priority}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#850E35] leading-relaxed">
                {item.shortDescription}
              </p>
              <p className="text-[#850E35] leading-relaxed">
                {item.fullDescription}
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <BookNowButton
                eventId={item._id}
                eventTitle={item.title}
              />
             <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow-lg">
    {item.location && (
    <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow-lg">
      <iframe
        title="Event Location"
        width="100%"
        height="100%"
        className="border-0"
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          item.location
        )}&output=embed`}
      ></iframe>
    </div>
  )}
  </div>
              
            </div>
          </div>
        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#850E35] mb-6">Related Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {relatedEvents.map((ev) => (
    <div
      key={ev._id}
      className="bg-white rounded-xl shadow hover:shadow-xl transition p-4"
    >
      <Image
      width={500}      // specify actual width
  height={400}  
        src={ev.image}
        alt={ev.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg">{ev.title}</h3>
      <p className="text-sm text-gray-600">{ev.shortDescription}</p>

      <Link
        href={`/items/${ev._id}`}
        className="inline-block mt-2 text-[#EE6983] hover:underline text-sm font-medium"
      >
        View Details →
      </Link>
    </div>
  ))}
</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ItemPage;
