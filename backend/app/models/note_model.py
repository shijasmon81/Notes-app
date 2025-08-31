from pydantic import BaseModel
from uuid import uuid4
from datetime import datetime

def generate_uuid():
    return str(uuid4())

class Note(BaseModel):
    note_id: str = generate_uuid()
    note_title: str
    note_content: str
    user_id: str
    created_on: datetime = datetime.utcnow()
    last_update: datetime = datetime.utcnow()
