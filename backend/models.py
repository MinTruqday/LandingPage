from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
import re

class RegistrationForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    
    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        if not re.match(r'^(0[3|5|7|8|9])+([0-9]{8})$', v):
            raise ValueError('Số điện thoại không hợp lệ (phải bắt đầu bằng 03, 05, 07, 08, 09 và có 10 số)')
        return v
        
    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if len(v.strip()) < 2:
            raise ValueError('Tên phải có ít nhất 2 ký tự')
        return v

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
    color: Optional[str] = None
    storage: Optional[str] = None
    quantity: Optional[int] = 100

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
