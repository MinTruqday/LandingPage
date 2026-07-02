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
        
        system_content = """Bạn là chuyên viên tư vấn cao cấp của Apple, chuyên về iPhone 17 Pro và iPhone 17 Pro Max tại Việt Nam.
Tuyệt đối tuân thủ các quy tắc sau:
1. CHỈ sử dụng thông tin được cung cấp trong phần "KIẾN THỨC BÊN DƯỚI" để trả lời. Không bịa đặt thông tin.
2. Nếu câu hỏi KHÔNG liên quan đến iPhone hoặc không có trong kiến thức, HÃY TỪ CHỐI lịch sự (ví dụ: "Dạ, em chỉ chuyên tư vấn về dòng iPhone 17 Pro, anh/chị cần hỏi gì về dòng máy này ạ?").
3. Xưng hô "em" và gọi khách là "anh/chị". Trả lời cực kỳ ngắn gọn, chuyên nghiệp, đúng trọng tâm.
"""
        if context:
            system_content += f"\nKIẾN THỨC BÊN DƯỚI:\n{context}"
            
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
