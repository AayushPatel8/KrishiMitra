from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from groq import Groq

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
if "GROQ_API_KEY" not in os.environ:
    os.environ["GROQ_API_KEY"] = "API_KEY"

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

class ChatMessage(BaseModel):
    message: str

@app.post("/chat")
async def chat(message: ChatMessage):
    try:
        daraz_context = """
        You are a customer care assistant for KrishiMitra, an online shopping platform.
        Your role is to assist customers with their queries related to orders, tracking, payment issues, returns, and more.
        Be polite and provide accurate information regarding KrishiMitra policies.
        """
        
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": daraz_context},
                {"role": "user", "content": message.message}
            ],
            model="llama3-8b-8192",
        )
        
        response = chat_completion.choices[0].message.content
        return {"response": response}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
