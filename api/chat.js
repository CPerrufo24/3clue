import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.POE_API_KEY,
  baseURL: "https://api.poe.com/v1",
});

export default async function handler(req, res) {
  // CORS headers 
  res.setHeader("Access-Control-Allow-Origin", "https://3clue.com"); // Cambia si usas otro dominio
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { message, history } = req.body;

  if (!message && !history) {
    return res.status(400).json({ error: "Se requiere un mensaje o historial" });
  }

  // Si hay historial, lo usamos. Si no, enviamos solo el mensaje actual.
  const messages = history || [{ role: "user", content: message }];

  try {
    console.log("Enviando a 3Clue_Chatbot:", messages);

    const chat = await client.chat.completions.create({
      model: "3Clue_Chatbot", // Nombre exacto del bot en Poe
      messages: messages,
    });

    const reply = chat.choices[0].message.content;
    res.status(200).json({ response: reply });

  } catch (error) {
    console.error("Error al conectar con Poe:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
