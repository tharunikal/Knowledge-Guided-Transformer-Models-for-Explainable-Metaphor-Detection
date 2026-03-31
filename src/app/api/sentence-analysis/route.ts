import { NextResponse } from "next/server";


const HF_MODEL_URL =
  "https://api-inference.huggingface.co/models/tharunika/sentence-metaphor-analyzer";


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
    console.time("SentenceAnalysisTotal");
    console.log("📥 Received sentence analysis request");

    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid input: text must be a string" },
        { status: 400 }
      );
    }

    console.log(`🧾 Analyzing text: "${text.slice(0, 100)}..."`);

    // -----------------------------
    // Structured “HF-style” prompt
    // -----------------------------
    const hfStylePrompt = `
{
  "task": "sentence_metaphor_analysis",
  "inputs": "${text}",
  "parameters": {
    "return_fields": [
      "is_metaphor",
      "metaphorical_expression",
      "target_word",
      "source_domain",
      "target_domain",
      "domain_mapping",
      "literal_meaning",
      "contextual_usage",
      "etymology"
    ]
  }
}

You are a linguistics and NLP expert.
Analyze the text and return ONLY valid JSON in the following format:

{
  "is_metaphor": true or false,
  "metaphorical_expression": "string or None",
  "target_word": "string or None",
  "source_domain": "string or None",
  "target_domain": "string or None",
  "domain_mapping": "SOURCE_DOMAIN → TARGET_DOMAIN" or "None",
  "literal_meaning": "string",
  "contextual_usage": "string",
  "etymology": "string"
}

Guidelines:
1. Determine if the text contains a metaphor.
2. If yes, extract the full metaphorical expression.
3. Identify the key target word carrying the metaphorical sense.
4. Map the conceptual source and target domains.
5. Express the relation as "SOURCE_DOMAIN → TARGET_DOMAIN".
6. Give short, factual explanations for literal meaning, context, and etymology.
7. Return strictly valid JSON. No markdown, no commentary outside the object.
`;

    console.time("ModelCallTime");
    const rawOutput = await queryModel(hfStylePrompt);
    console.timeEnd("ModelCallTime");

    // -----------------------------
    // Clean + Parse Output
    // -----------------------------
    let cleanOutput = rawOutput.replace(/```(json)?/g, "").trim();

    // Extract first {...} block (handles any extra text)
    const match = cleanOutput.match(/\{[\s\S]*\}/);
    if (!match) {
      console.warn("⚠️ No valid JSON object found in model output:", cleanOutput);
      return NextResponse.json(
        { error: "Invalid model output", rawOutput: cleanOutput },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(match[0]);
    } catch (err) {
      console.error("⚠️ Failed to parse JSON:", match[0]);
      return NextResponse.json(
        { error: "Failed to parse JSON from model output", rawOutput: match[0] },
        { status: 500 }
      );
    }

    console.timeEnd("SentenceAnalysisTotal");
    console.log("✅ Sentence analysis successful:", parsed);

    return NextResponse.json(parsed, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in sentence-analysis route:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
