import { NextResponse } from "next/server";


const HF_MODEL_URL =
  "https://api-inference.huggingface.co/models/tharunika/metaphor-detector-bert";

async function queryModel(prompt: string): Promise<string> {
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.MODEL_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    return await result.response.text();
  } catch (err) {
    console.error("🧩 Model inference failed:", err);
    throw new Error("Model inference failed");
  }
}

export async function POST(req: Request) {
  try {
    console.time("LiteratureAnalysisTotal");
    console.log("📥 Received literature analysis request");

    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title")?.toString() || "Unknown Title";
    const author = formData.get("author")?.toString() || "Unknown Author";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    console.time("FileReadTime");
    const text = await file.text();
    console.timeEnd("FileReadTime");

    console.log(`📚 Processing: "${title}" by ${author}, length: ${text.length} chars`);

    // -------------------------
    // Structured “HF-style” prompt
    // -------------------------
    const hfStylePrompt = `
You are an NLP model specialized in metaphor detection.

Return ONLY a JSON array (no markdown or commentary) in this exact format:
[
  {
    "metaphorical_phrase": "the metaphorical phrase from the text",
    "explanation": "a concise explanation of the metaphor in context"
  }
]

Text: "${text}"
Title: "${title}"
Author: "${author}"
`;

    console.time("ModelCallTime");
    const rawOutput = await queryModel(hfStylePrompt);
    console.timeEnd("ModelCallTime");

    // -------------------------
    // Clean + Parse Output
    // -------------------------
    let cleanOutput = rawOutput.replace(/```(json)?/g, "").trim();
    const match = cleanOutput.match(/\[.*\]/s);

    if (!match) {
      console.warn("⚠️ No valid JSON array found from model output");
      return NextResponse.json({ error: "Invalid model output", rawOutput }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(match[0]);
      parsed = parsed.map((item: any) => ({
        // ✅ Flexible key extraction to prevent "Unknown" issue
        metaphorical_phrase:
          item.metaphorical_phrase ||
          item.metaphor ||
          item.phrase ||
          item.expression ||
          item.text ||
          item.example ||
          "Unknown",
        explanation:
          item.explanation ||
          item.meaning ||
          item.reason ||
          item.description ||
          "No explanation provided",
        title,
        author,
      }));
    } catch (err) {
      console.error("⚠️ Failed to parse JSON array:", match[0]);
      return NextResponse.json({ error: "Failed to parse JSON array", rawOutput: match[0] }, { status: 500 });
    }

    console.timeEnd("LiteratureAnalysisTotal");
    console.log(`✅ Successfully parsed ${parsed.length} metaphors`);
    console.log("Parsed Metaphors:", parsed);

    return NextResponse.json(parsed, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in literature-analysis route:", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}
