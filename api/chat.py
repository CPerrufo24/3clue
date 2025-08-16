from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import fastapi_poe as fp
import os

app = FastAPI()

# Permitir que tu web en Netlify se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://robinnovalab.netlify.app"],  # tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message", "")
    bot_name = data.get("bot_name", "Robifito")  # cambia por tu bot de Poe

    api_key = os.environ.get("POE_API_KEY")
    final_response = ""
    async for partial in fp.get_bot_response(
        messages=[fp.ProtocolMessage(role="user", content=message)],
        bot_name=bot_name,
        api_key=api_key
    ):
        if partial["type"] == "message":
            final_response += partial["text"]

    return {"response": final_response}
