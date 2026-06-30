from fastapi import APIRouter, Depends
from typing import List
from database import get_db
from models import Product

router = APIRouter()

@router.get("/", response_model=List[Product])
async def get_products(db=Depends(get_db)):
    products = await db.products.find().to_list(100)
    # Remove _id from dict for pydantic compatibility
    for p in products:
        p.pop('_id', None)
    return products
