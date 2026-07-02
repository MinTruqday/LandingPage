from fastapi import APIRouter, HTTPException, Depends, status, Request
from models import UserRegister, UserLogin, TokenResponse, SyncData
from database import get_db
from auth_utils import get_password_hash, verify_password, create_access_token, create_refresh_token, decode_token
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
        "hashed_password": hashed_password,
        "favorites": [],
        "cart": []
    }
    
    await db.auth_users.insert_one(new_user)
    
    access_token = create_access_token(data={"sub": user.email, "name": user.name})
    refresh_token = create_refresh_token(data={"sub": user.email})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user_name=user.name,
        favorites=[],
        cart=[]
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
        user_name=db_user["name"],
        favorites=db_user.get("favorites", []),
        cart=db_user.get("cart", [])
    )

@router.post("/sync")
async def sync_data(data: SyncData, req: Request, db=Depends(get_db)):
    auth_header = req.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload or not payload.get("sub"):
        raise HTTPException(status_code=401, detail="Invalid token")
        
    email = payload.get("sub")
    await db.auth_users.update_one(
        {"email": email},
        {"$set": {"favorites": data.favorites, "cart": data.cart}}
    )
    return {"status": "success"}

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(req: RefreshRequest, db=Depends(get_db)):
    payload = decode_token(req.refresh_token)
    if not payload or not payload.get("sub"):
        raise HTTPException(status_code=401, detail="Invalid refresh token")
        
    email = payload.get("sub")
    db_user = await db.auth_users.find_one({"email": email})
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
        
    access_token = create_access_token(data={"sub": email, "name": db_user["name"]})
    new_refresh_token = create_refresh_token(data={"sub": email})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=new_refresh_token,
        user_name=db_user["name"],
        favorites=db_user.get("favorites", []),
        cart=db_user.get("cart", [])
    )
