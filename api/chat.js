import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.POE_API_KEY,  // Asegúrate de poner tu key en Vercel
  baseURL: "https://api.poe.com/v1",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const chat = await client.chat.completions.create({
      model: "Robifito",   // tu bot en Poe
      messages: [{ role: "user", content: message }],
    });

    const reply = chat.choices[0].message.content;
    res.status(200).json({ response: reply });

  } catch (error) {
    console.error("Error connecting to Poe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

