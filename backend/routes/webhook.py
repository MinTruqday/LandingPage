from fastapi import APIRouter, HTTPException, Depends
from models import RegistrationForm, TrackingData
from database import get_db

router = APIRouter()

@router.post("/register")
async def register_user(form: RegistrationForm, db=Depends(get_db)):
    try:
        result = await db.users.insert_one(form.model_dump())
        return {"status": "success", "message": "Đăng ký thành công", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/track")
async def track_behavior(data: TrackingData, db=Depends(get_db)):
    try:
        await db.tracking.insert_one(data.model_dump())
        print(f"\nNgười dùng vừa thực hiện hành động: {data.event_type.upper()}")
        print(f"  - Element: {data.element_id}")
        print(f"  - Path: {data.path}")
        print(f"  - Thời gian: {data.timestamp}\n")
        return {"status": "success", "message": "Đã ghi nhận dữ liệu theo dõi"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
