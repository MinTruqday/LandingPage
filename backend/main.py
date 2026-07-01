from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import urllib.request
from routes import webhook, chatbot, products, auth

app = FastAPI(title="Helicorp Landing Page API")

async def keep_alive():
    while True:
        await asyncio.sleep(14 * 60)
        try:
            url = "https://landingpage-x1qu.onrender.com/"
            await asyncio.to_thread(urllib.request.urlopen, url)
            print("Pinged self to stay awake")
        except Exception as e:
            print(f"Keep alive ping failed: {e}")

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(keep_alive())

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://landingpagecmt.online",
        "https://www.landingpagecmt.online"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(webhook.router, prefix="/api/webhook", tags=["Webhook"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Helicorp API"}
