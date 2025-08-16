from fastapi import FastAPI
from pydantic import BaseModel
import fastapi_poe as fp

app = FastAPI()

API_KEY = "TU_API_KEY_AQUI"  # Pon tu API Key de Poe
BOT_NAME = "NOMBRE_DE_TU_BOT"  # Ejemplo: "GPT-3.5-Turbo"

class Message(BaseModel):
    text: str

@app.post("/chat")
def chat(message: Message):
    protocol_message = fp.ProtocolMessage(role="user", content=message.text)
    response_text = ""
    for partial in fp.get_bot_response_sync(messages=[protocol_message], bot_name=BOT_NAME, api_key=API_KEY):
        response_text += partial.text or ""
    return {"reply": response_text}
