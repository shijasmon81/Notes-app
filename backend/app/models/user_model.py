from pydantic import BaseModel, EmailStr
from uuid import uuid4
from datetime import datetime

def generate_uuid():
    return str(uuid4())

class User(BaseModel):
    user_id: str = generate_uuid()
    user_name: str
    user_email: EmailStr
    password: str
    create_on: datetime = datetime.utcnow()
    last_update: datetime = datetime.utcnow()
