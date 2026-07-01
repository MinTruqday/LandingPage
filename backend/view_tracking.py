import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from collections import Counter
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

async def view_tracking():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.landing_page_db
    
    print("\n" + "="*50)
    print("BÁO CÁO THEO DÕI HÀNH VI NGƯỜI DÙNG (TRACKING)")
    print("="*50)
    
    total_events = await db.tracking.count_documents({})
    if total_events == 0:
        print("\nChưa có dữ liệu tracking nào trong database.")
        print("Hãy truy cập trang web, click vào các nút, ở lại trên trang một lúc để tạo dữ liệu.")
        return

    print(f"\nTổng số sự kiện (events) đã ghi nhận: {total_events}\n")

    cursor = db.tracking.find().sort("timestamp", -1)
    events = await cursor.to_list(length=1000)

    event_types = Counter([e.get("event_type", "unknown") for e in events])
    print("Tần suất các loại sự kiện:")
    for etype, count in event_types.most_common():
        print(f"- {etype.upper()}: {count} lần")
        
    clicks = [e.get("element_id") for e in events if e.get("event_type") == "click" and e.get("element_id")]
    if clicks:
        click_counts = Counter(clicks)
        print("\nCác phần tử được CLICK nhiều nhất:")
        for el, count in click_counts.most_common(5):
            print(f"- Nút/Link '{el}': {count} lượt")
            
    paths = [e.get("path") for e in events if e.get("event_type") == "page_view" and e.get("path")]
    if paths:
        path_counts = Counter(paths)
        print("\nCác trang được XEM nhiều nhất:")
        for p, count in path_counts.most_common(5):
            print(f"- {p}: {count} lượt")
            
    print("\n" + "-"*50)
    print("5 sự kiện GẦN NHẤT:")
    for e in events[:5]:
        time_str = e.get("timestamp", "")
        try:
            dt = datetime.strptime(time_str.split('.')[0], "%Y-%m-%dT%H:%M:%S")
            time_display = dt.strftime("%d/%m/%Y %H:%M:%S")
        except:
            time_display = time_str
            
        print(f"[{time_display}] {e.get('event_type').upper()} tại {e.get('path')} (Element: {e.get('element_id', 'N/A')})")
        
    print("="*50 + "\n")

if __name__ == "__main__":
    asyncio.run(view_tracking())
