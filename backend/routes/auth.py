from fastapi import APIRouter, HTTPException, Depends, status
from models import UserRegister, UserLogin, TokenResponse
from database import get_db
from auth_utils import get_password_hash, verify_password, create_access_token, create_refresh_token
from pydantic import BaseModel

router = APIRouter()

class RefreshRequest(BaseModel):
    refresh_token: str

@router.post("/register", response_model=TokenResponse)
async def register(user: UserRegister, db=Depends(get_db)):
    existing_user = await db.auth_users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed_password = get_password_hash(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password
    }
    
    await db.auth_users.insert_one(new_user)
    
    access_token = create_access_token(data={"sub": user.email, "name": user.name})
    refresh_token = create_refresh_token(data={"sub": user.email})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user_name=user.name
    )

@router.post("/login", response_model=TokenResponse)
async def login(user: UserLogin, db=Depends(get_db)):
    db_user = await db.auth_users.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    if not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    access_token = create_access_token(data={"sub": user.email, "name": db_user["name"]})
    refresh_token = create_refresh_token(data={"sub": user.email})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user_name=db_user["name"]
    )
