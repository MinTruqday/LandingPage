import os
import requests
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client.landing_page_db

all_products = [
  {
    "id": "ip17p-128-nat",
    "name": "iPhone 17 Pro 128GB - Titan Tự Nhiên",
    "price": "28.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846363993",
    "category": "iPhone 17 Pro"
  },
  {
    "id": "ip17p-256-nat",
    "name": "iPhone 17 Pro 256GB - Titan Tự Nhiên",
    "price": "31.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846363993",
    "category": "iPhone 17 Pro"
  },
  {
    "id": "ip17p-256-blk",
    "name": "iPhone 17 Pro 256GB - Titan Đen",
    "price": "31.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846360609",
    "category": "iPhone 17 Pro"
  },
  {
    "id": "ip17p-256-wht",
    "name": "iPhone 17 Pro 256GB - Titan Trắng",
    "price": "31.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846360609",
    "category": "iPhone 17 Pro"
  },
  {
    "id": "ip17p-512-blu",
    "name": "iPhone 17 Pro 512GB - Titan Xanh",
    "price": "37.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846360609",
    "category": "iPhone 17 Pro"
  },
  {
    "id": "ip17pm-256-nat",
    "name": "iPhone 17 Pro Max 256GB - Titan Tự Nhiên",
    "price": "34.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846362489",
    "category": "iPhone 17 Pro Max"
  },
  {
    "id": "ip17pm-256-blk",
    "name": "iPhone 17 Pro Max 256GB - Titan Đen",
    "price": "34.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846362489",
    "category": "iPhone 17 Pro Max"
  },
  {
    "id": "ip17pm-512-wht",
    "name": "iPhone 17 Pro Max 512GB - Titan Trắng",
    "price": "40.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846362489",
    "category": "iPhone 17 Pro Max"
  },
  {
    "id": "ip17pm-1tb-nat",
    "name": "iPhone 17 Pro Max 1TB - Titan Tự Nhiên",
    "price": "46.990.000đ",
    "image": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=png-alpha&qlt=80&.v=1692846362489",
    "category": "iPhone 17 Pro Max"
  }
]

async def seed():
    img_dir = os.path.join("frontend", "public", "img")
    os.makedirs(img_dir, exist_ok=True)
    
    await db.products.delete_many({})
    print("Xóa sạch DB cũ.")

    for prod in all_products:
        image_url = prod["image"]
        
        # Download
        filename = f"{prod['id']}.png"
        file_path = os.path.join(img_dir, filename)
        
        if not os.path.exists(file_path):
            print(f"Downloading {filename}")
            r = requests.get(image_url)
            with open(file_path, 'wb') as f:
                f.write(r.content)
        
        # Update URL
        prod["image"] = f"/img/{filename}"
        
        # Insert DB
        await db.products.insert_one(prod)
        print(f"Đã chèn {prod['name']}")
    
    print("Seed thành công!")

if __name__ == "__main__":
    asyncio.run(seed())
