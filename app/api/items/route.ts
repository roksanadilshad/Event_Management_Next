import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("eventsDB");

    const search = req.nextUrl.searchParams.get("search")?.toLowerCase() || "";

    // Fetch items from both collections
    const rawItems = await db.collection("items").find().toArray();
    const rawNewEvents = await db.collection("newEvent").find().toArray();

    // Normalize OLD items
    const items = rawItems.map((item) => ({
      _id: item._id.toString(),
      title: item.title || "",
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      date: item.date || "",
      time: item.time || "",
      location: item.location || "",
      category: item.category || "",
      image: item.image || "",
      price: item.price || 0,
      priority: item.priority || "",
    }));

    // Normalize NEW events
    const newEvents = rawNewEvents.map((event) => ({
      _id: event._id.toString(),
      title: event.title || "",
      shortDescription: event.shortDescription || "",
      fullDescription: event.fullDescription || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      category: event.category || "",
      image: event.image || "",
      price: event.price || 0,
      priority: event.priority || "",
    }));

    // Combine both
    const allItems = [...items, ...newEvents];

    // Filter by title or descriptions
    const filtered = allItems.filter((item) => {
      const text =
        `${item.title} `.toLowerCase();
      return text.includes(search);
    });

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
