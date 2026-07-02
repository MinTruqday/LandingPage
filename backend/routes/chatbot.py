import os
from fastapi import APIRouter, HTTPException
from models import ChatRequest
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

@router.post("/chat")
async def chat_with_groq(req: ChatRequest):
    if not GROQ_API_KEY:
        return {"response": "Xin chào! Đây là phản hồi giả lập vì GROQ_API_KEY chưa được cấu hình. Bạn cần iPhone 17 Pro Max phiên bản nào?"}
    
    try:
        import os
        backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        knowledge_path = os.path.join(backend_dir, "data", "knowledge.txt")
        
        context = ""
        if os.path.exists(knowledge_path):
            with open(knowledge_path, "r", encoding="utf-8") as f:
                context = f.read()
        
        system_content = "Bạn là nhân viên tư vấn bán hàng cho sản phẩm iPhone 17 Pro tại Việt Nam. Trả lời ngắn gọn, lịch sự."
        if context:
            system_content += f"\n\nSử dụng thông tin sau để trả lời:\n{context}"
            
        client = AsyncGroq(api_key=GROQ_API_KEY)
        system_prompt = {
            "role": "system",
            "content": system_content
        }
        
        messages = [system_prompt] + [msg.dict() for msg in req.messages]
        
        completion = await client.chat.completions.create(
            messages=messages,
            model="llama-3.1-8b-instant",
            temperature=0.7,
            max_tokens=150,
        )
        
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
