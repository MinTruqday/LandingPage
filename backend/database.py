import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = None
db = None

def get_db():
    global client, db
    if client is None:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client.landing_page_db
    return db
