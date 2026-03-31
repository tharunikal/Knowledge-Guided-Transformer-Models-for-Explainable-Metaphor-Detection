import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  console.log("🔍 Fetching sentence analyses from MongoDB...");
  try {
    const client = await clientPromise;
    const db = client.db("noScrubs"); // your DB name
    const collection = db.collection("sentenceAnalyses");

    const analyses = await collection.find({}).sort({ createdAt: -1 }).toArray();
    console.log("✅ Retrieved", analyses.length, "records");

    return NextResponse.json({ success: true, data: analyses });
  } catch (error: any) {
    console.error("❌ Error fetching data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
