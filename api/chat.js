import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.POE_API_KEY,
  baseURL: "https://api.poe.com/v1",
});

// CORS abierto para todos los orígenes
function setCorsHeaders(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "false"); // No se permiten credenciales con "*"
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  // Preflight
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { message, history } = req.body;

  if (!message && !history) {
    return res.status(400).json({ error: "Se requiere un mensaje o historial" });
  }

  const messages = history || [{ role: "user", content: message }];

  try {
    const chat = await client.chat.completions.create({
      model: "3Clue_Chatbot",
      messages: messages,
    });

    const reply = chat.choices[0].message.content;
    res.status(200).json({ response: reply });

  } catch (error) {
    console.error("Error al conectar con Poe:", error);
    res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
}
