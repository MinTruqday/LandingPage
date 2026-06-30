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
