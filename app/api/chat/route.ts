import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { promises as fs } from "fs";
import path from "path";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Get the path to the JSON file
  const jsonFilePath = path.join(process.cwd(), "app", "data", "majalengka-data.json");

  // Read the JSON file
  const fileContents = await fs.readFile(jsonFilePath, "utf8");

  // Parse the JSON data
  const majalengkaData = JSON.parse(fileContents);

  const systemPrompt = `Anda adalah asisten yang membantu memberikan informasi tentang pariwisata dan kebudayaan di Majalengka. Gunakan data berikut untuk menjawab pertanyaan pengguna:

${JSON.stringify(majalengkaData, null, 2)}`;

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
