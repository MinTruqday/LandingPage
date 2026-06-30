import os
from fastapi import APIRouter, HTTPException
from models import ChatRequest
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@router.post("/chat")
async def chat_with_groq(req: ChatRequest):
    if not GROQ_API_KEY:
        # Fallback if no API key is provided
        return {"response": "Xin chào! Đây là phản hồi giả lập vì GROQ_API_KEY chưa được cấu hình. Bạn cần iPhone 17 Pro Max phiên bản nào?"}
    
    try:
        client = AsyncGroq(api_key=GROQ_API_KEY)
        system_prompt = {
            "role": "system",
            "content": "Bạn là nhân viên tư vấn bán hàng cho sản phẩm iPhone 17 Pro và iPhone 17 Pro Max tại Việt Nam. Hãy trả lời ngắn gọn, lịch sự và chuyên nghiệp. Không sử dụng emoji."
        }
        
        messages = [system_prompt] + [msg.dict() for msg in req.messages]
        
        completion = await client.chat.completions.create(
            messages=messages,
            model="llama3-8b-8192",
            temperature=0.7,
            max_tokens=150,
        )
        
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
