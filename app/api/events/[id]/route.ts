import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// DELETE /api/events/[id]
export async function DELETE(
  req: NextRequest,
 context: { params: Promise<{ id: string }>  }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("eventsDB");

    const result = await db.collection("newEvent").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete event" },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id]
export async function PUT(
  req: NextRequest,
  context : { params:  Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // const updatedEvent = {
    //    title: body.title,
    //   shortDesc: body.shortDesc,    // correct
    //   fullDesc: body.fullDesc,      // correct
    //   date: body.date,
    //   time: body.time,
    //   location: body.location,
    //   category: body.category,
    //   image: body.image,            // correct
    //   price: Number(body.price),
    //   priority: body.priority,
    //   userId: body.userId,
    //   updatedAt: new Date(),
    // };

    const client = await clientPromise;
    const db = client.db("eventsDB");

    const result = await db.collection("newEvent").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }
 
     const updatedEvent = await db.collection("events").findOne({ _id: new ObjectId(id) }); 

    return NextResponse.json({
      success: true,
      event: updatedEvent
    });
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update event" },
      { status: 500 }
    );
  }
}
