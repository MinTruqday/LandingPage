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

@router.get("/tracking-stats")
async def get_tracking_stats(db=Depends(get_db)):
    try:
        total_events = await db.tracking.count_documents({})
        
        cursor = db.tracking.find().sort("timestamp", -1)
        events = await cursor.to_list(length=1000)
        
        from collections import Counter
        event_types = Counter([e.get("event_type", "unknown") for e in events])
        clicks = Counter([e.get("element_id") for e in events if e.get("event_type") == "click" and e.get("element_id")])
        views = Counter([e.get("path") for e in events if e.get("event_type") == "page_view" and e.get("path")])
        
        # Format recent events
        recent_events = []
        for e in events[:10]:
            e["_id"] = str(e.get("_id"))
            recent_events.append(e)
            
        return {
            "total_events": total_events,
            "event_types": dict(event_types),
            "top_clicks": dict(clicks.most_common(5)),
            "top_views": dict(views.most_common(5)),
            "recent_events": recent_events
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
