import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const userInput = req.body.message;

            const prompt = `You are an AI Itinerary planning specialist who specializes in giving perfect itinerary for holiday destinations, \
        give a detailed itinerary in the form of days like: day 1: ---- , day 2: ----, etc. Get the destination \
        from UserInput and be creative with your answers. Also, if user asks normal questions other than itinerary related questions\
        then be clever and answer in a user friendly way.
        
        UserInput: ${userInput}\
        use the above UserInput to find the holiday destination and give the itinerary in the specified way mentioned above.`


            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'gpt-4',
                temperature: 0,
            });

            const chatBotResponse = chatCompletion.choices[0].message.content;
            return res.status(200).json({ message: chatBotResponse || 'error: contact the development team' });
        } catch (e) {
            res.status(500).json({ error: 'failed to load data' })
        }
    }
}