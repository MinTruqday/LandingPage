from pydantic import BaseModel, EmailStr
from typing import Optional, List

class RegistrationForm(BaseModel):
    name: str
    email: EmailStr
    phone: str

class TrackingData(BaseModel):
    event_type: str
    element_id: Optional[str] = None
    path: Optional[str] = None
    timestamp: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class Product(BaseModel):
    id: str
    name: str
    price: str
    image: str
    category: str

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user_name: str
