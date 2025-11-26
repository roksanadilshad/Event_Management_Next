import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("eventsDB");

    const itemsCollection = db.collection("items");
    const newEventsCollection = db.collection("newEvent");

    const today = new Date().toISOString();

    // Fetch upcoming events from both collections
    const [upcomingItems, upcomingNewEvents] = await Promise.all([
      itemsCollection
        .find({ date: { $gte: today } })
        .sort({ date: 1 })
        .limit(5)
        .toArray(),
      newEventsCollection
        .find({ date: { $gte: today } })
        .sort({ date: 1 })
        .limit(6)
        .toArray(),
    ]);

    // Combine both arrays and sort by date
    const combinedEvents = [...upcomingItems, ...upcomingNewEvents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return NextResponse.json(combinedEvents);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  } finally {
    await client.close();
  }
}
