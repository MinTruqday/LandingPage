import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://johnnycomic999_db_user:jmoe16wd2Oa5oOal@cluster0.jthfa8g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = None
db = None

def get_db():
    global client, db
    if client is None:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client.landing_page_db
    return db
