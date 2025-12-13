// import { createSystemPrompt } from "@/app/lib/prompt";
// import { google } from "@ai-sdk/google";
// import { groq } from "@ai-sdk/groq";
// import { streamText, UIMessage, convertToModelMessages } from "ai";
// import { promises as fs } from "fs";
// import path from "path";

// export const maxDuration = 30;

// const jsonFilePath = path.join(process.cwd(), "app", "data", "majalengka-data.json");

// async function getMajalengkaData() {
//   try {
//     const fileContents = await fs.readFile(jsonFilePath, "utf8");
//     const data = JSON.parse(fileContents);
//     return JSON.stringify(data, null, 2);
//   } catch (error) {
//     console.error("Gagal membaca data majalengka:", error);
//     return "{}";
//   }
// }

// const majalengkaDataPromise = getMajalengkaData();

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const majalengkaDataString = await majalengkaDataPromise;

//   const systemPrompt = createSystemPrompt(majalengkaDataString);

//   const result = await streamText({
//     // model: google("gemini-2.0-flash"),
//     model: groq("llama-3.3-70b-versatile"),
//     system: systemPrompt,
//     messages: convertToModelMessages(messages),
//     providerOptions: {
//       google: {
//         maxOutputTokens: 1024,
//         temperature: 0.2,
//         topP: 0.8,
//       },
//     },
//   });

//   return result.toUIMessageStreamResponse();
// }
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
