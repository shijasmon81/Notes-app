from motor.motor_asyncio import AsyncIOMotorClient
from ..core.config import MONGO_URL, DB_NAME

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

users_collection = db["users"]
notes_collection = db["notes"]
