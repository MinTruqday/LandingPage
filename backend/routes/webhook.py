from fastapi import APIRouter, HTTPException
from models import RegistrationForm, TrackingData
import json
import os
from datetime import datetime

router = APIRouter()

LEADS_FILE = os.path.join(os.path.dirname(__file__), "..", "leads.json")
TRACKING_FILE = os.path.join(os.path.dirname(__file__), "..", "tracking.json")

@router.post("/register")
async def register_user(form: RegistrationForm):
    try:
        data = form.model_dump()
        data["created_at"] = datetime.now().isoformat()
        
        leads = []
        if os.path.exists(LEADS_FILE):
            with open(LEADS_FILE, "r", encoding="utf-8") as f:
                try:
                    leads = json.load(f)
                except:
                    pass
                
        leads.append(data)
        
        with open(LEADS_FILE, "w", encoding="utf-8") as f:
            json.dump(leads, f, ensure_ascii=False, indent=2)
            
        return {"status": "success", "message": "Đăng ký thành công", "id": len(leads)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/track")
async def track_behavior(data: TrackingData):
    try:
        tracking_data = data.model_dump()
        
        records = []
        if os.path.exists(TRACKING_FILE):
            with open(TRACKING_FILE, "r", encoding="utf-8") as f:
                try:
                    records = json.load(f)
                except:
                    pass
                
        records.append(tracking_data)
        
        with open(TRACKING_FILE, "w", encoding="utf-8") as f:
            json.dump(records, f, ensure_ascii=False, indent=2)
            
        print(f"\nNgười dùng vừa thực hiện hành động: {data.action.upper()}")
        print(f"  - Element: {data.element_id}")
        print(f"  - URL: {data.url}")
        print(f"  - Thời gian: {data.timestamp}\n")
        return {"status": "success", "message": "Đã ghi nhận dữ liệu"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
