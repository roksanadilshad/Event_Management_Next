import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("eventsDB");

   const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const products = await db
      .collection("newEvent")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch new events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newEvent = {
      title: body.title,
      shortDescription: body.shortDesc,       // FIX
      fullDescription: body.fullDesc,         // FIX
      date: body.date,
      time: body.time,
      location: body.location,
      category: body.category,
      image: body.image,                   // FIX
      price: Number(body.price),
      priority: body.priority,
      userId: body.userId,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("eventsDB");

    const result = await db.collection("newEvent").insertOne(newEvent);

    return NextResponse.json({
      success: true,
      event: { ...newEvent, _id: result.insertedId.toString() },
    });
  } catch (error) {
    console.error("Error inserting New Event:", error);
    return NextResponse.json(
      { success: false, message: "Error inserting new event" },
      { status: 500 }
    );
  }
}
