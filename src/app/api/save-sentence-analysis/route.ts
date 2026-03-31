import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  console.log("📥 Received request to save analysis");

  try {
    const body = await req.json();
    console.log("📄 Request body:", body);

    const client = await clientPromise;
    const db = client.db("noScrubs"); // Replace with your DB name
    const collection = db.collection("sentenceAnalyses");

    const result = await collection.insertOne(body);
    console.log("✅ Successfully saved to MongoDB:", result.insertedId);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("❌ Error saving analysis:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
