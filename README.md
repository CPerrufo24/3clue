🧠 3Clue Chatbot Backend
Backend serverless para conectar bots personalizados de Poe con páginas web externas. Este proyecto está optimizado para Vercel y permite adaptar la personalidad del bot según el cliente.

🚀 ¿Qué hace este backend?
Recibe mensajes desde el frontend

Los envía al bot alojado en Poe (por nombre)

Devuelve la respuesta generada

Soporta historial conversacional

Incluye CORS para conexión segura con dominios externos

📦 Estructura del proyecto
Código
3clue-chatbot-backend/
├── api/
│   └── chat.js         # Función principal que conecta con Poe
├── prompts/            # (Opcional) Prompts por cliente
├── package.json
├── vercel.json         # Configuración para deploy automático
├── README.md
🔧 Configuración
Instala dependencias

bash
npm install
Agrega tu clave de Poe Crea un archivo .env.local con:

env
POE_API_KEY=tu_clave_secreta
Verifica el nombre del bot En api/chat.js, asegúrate de que el modelo coincida:

js
model: "3Clue_Chatbot"
🌐 CORS y conexión con frontend
El backend está configurado para aceptar peticiones desde:

js
res.setHeader("Access-Control-Allow-Origin", "https://3clue.com");
Cambia el dominio según tu entorno.

🧩 Personalización por cliente (opcional)
Puedes agregar archivos en /prompts con reglas, tono y contexto por cliente. Luego, modifica chat.js para cargar el prompt dinámicamente.

🧪 Ejemplo de uso desde frontend
js
const response = await fetch("https://tu-backend.vercel.app/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Hola, ¿qué puedes hacer por mí?" }),
});
const data = await response.json();
console.log(data.response);
📤 Deploy en Vercel
Conecta el repo en vercel.com

Asegúrate de tener vercel.json en raíz:

json
{
  "version": 2,
  "builds": [{ "src": "api/chat.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "api/chat.js" }]
}
Agrega tu POE_API_KEY como variable de entorno

¿Quieres que preparemos una versión editable de este README como plantilla para tus otros clientes? También podemos dejarlo listo para exportar como guía PDF o Notion. Tú mandas 🧩📘
