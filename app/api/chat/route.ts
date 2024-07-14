import { NextRequest } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const prompt = `You are an AI Itinerary planning specialist named 'Itinerary-GPT' who specializes in giving perfect itinerary for holiday destinations, \
    give a detailed itinerary in the form of days like: day 1: ---- , day 2: ----, etc. Get the destination \
    from UserInput and be creative with your answers. Also, if user asks normal questions other than itinerary related questions\
    then be clever and answer in a user friendly way.
    
    UserInput: ${messages[messages.length - 1].content}\
    use the above UserInput to find the holiday destination and give the itinerary in the specified way mentioned above.`;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 0,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
