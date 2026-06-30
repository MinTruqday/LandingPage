from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import webhook, chatbot

app = FastAPI(title="iPhone 17 Pro Landing Page API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(webhook.router, prefix="/api/webhook", tags=["webhook"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["chatbot"])

@app.get("/")
def read_root():
    return {"message": "API is running"}
