import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

let cachedClient: MongoClient | null = null;

export async function getClient() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGODB_URI!);
    await cachedClient.connect();
  }
  return cachedClient;
}

export async function GET(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const client = await getClient();
    const db = client.db("eventsDB");

    const rawItem = (await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) })) ||
     (await db
      .collection("newEvent")
      .findOne({ _id: new ObjectId(id) }));


    if (!rawItem)
      return NextResponse.json({ message: "Item not found" }, { status: 404 });

 const item = {
      _id: rawItem._id.toString(),
      title: rawItem.title,
      fullDescription:
        rawItem.fullDescription || rawItem.fullDesc || "",
      shortDescription:
        rawItem.shortDescription || rawItem.shortDesc || "",
      date: rawItem.date || "",
      time: rawItem.time || "",
      location: rawItem.location || "",
      category: rawItem.category || "",
      image: rawItem.image || "", // <-- FIXED
      price: rawItem.price || 0,
      priority: rawItem.priority || 0,
    };

     return NextResponse.json(item);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
