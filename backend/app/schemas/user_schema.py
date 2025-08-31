from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    user_name: str
    user_email: EmailStr
    password: str

class UserLogin(BaseModel):
    user_email: EmailStr
    password: str

class UserResponse(BaseModel):
    user_id: str
    user_name: str
    user_email: str
