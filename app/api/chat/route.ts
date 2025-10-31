import { createSystemPrompt } from "@/app/lib/rule";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { promises as fs } from "fs";
import path from "path";

export const maxDuration = 30;

const jsonFilePath = path.join(process.cwd(), "app", "data", "majalengka-data.json");

async function getMajalengkaData() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, "utf8");
    const data = JSON.parse(fileContents);
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Gagal membaca data majalengka:", error);
    return "{}";
  }
}

const majalengkaDataPromise = getMajalengkaData();

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const majalengkaDataString = await majalengkaDataPromise;

  const systemPrompt = createSystemPrompt(majalengkaDataString);

  const result = await streamText({
    model: google("gemini-2.5-flash"),
    // model: groq("llama-3.3-70b-versatile"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
