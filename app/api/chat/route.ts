import { google } from "@ai-sdk/google";
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

  const systemPrompt = `Anda adalah asisten yang membantu memberikan informasi tentang Dinas Pariwisata dan Kebudayaan yang ada di majalengka. Berperilakulah dengan profesional Gunakan data berikut untuk menjawab pertanyaan pengguna: ${majalengkaDataString}, jika yang ditanyakan mengenai pariwisata dan kebudayaan di majalengka dan tidak ada di data, jawab aja sebisa mungkin yang kamu tahu, tidak harus ada yang di data saja. Tolong jangan pakai simbol bintang (*) dalam jawaban anda ataupun dalam jawaban yang bertipe list, gunakan angka sebagai penggati simbol bintang. anda boleh menggunakan emoji. jika jawaban anda tidak ada dalam data, jangan bilang kalo di dalam datanya tidak ada, langsung saja anda jelaskan.`;

  const result = await streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
