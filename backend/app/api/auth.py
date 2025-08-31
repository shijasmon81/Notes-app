from fastapi import APIRouter, HTTPException, Depends
from ..schemas.user_schema import UserCreate, UserLogin, UserResponse
from ..db.mongodb import users_collection
from ..core.security import hash_password, verify_password, create_access_token
from ..models.user_model import User

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
async def signup(user: UserCreate):
    existing_user = await users_collection.find_one({"user_email": user.user_email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    hashed_password = hash_password(user.password)
    new_user = User(user_name=user.user_name, user_email=user.user_email, password=hashed_password)
    await users_collection.insert_one(new_user.dict())
    
    token = create_access_token({"user_id": new_user.user_id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_name": new_user.user_name
    }


@router.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"user_email": user.user_email})
    print(user.user_email)
    print(user.password)
    print(db_user["password"] if db_user else "No user found")
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"user_id": db_user["user_id"]})
    return {
        "access_token": token,
        "token_type": "bearer", 
        "user_name": db_user["user_name"]
    }
