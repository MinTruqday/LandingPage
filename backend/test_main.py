import pytest
from httpx import AsyncClient, ASGITransport
from main import app
import database

@pytest.fixture(autouse=True)
def reset_db_client():
    database.client = None
    database.db = None
    yield

@pytest.mark.asyncio
async def test_read_root():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "API is running"}

@pytest.mark.asyncio
async def test_register_user():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/webhook/register",
            json={"name": "Test User", "email": "test@example.com", "phone": "0123456789"}
        )
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "success"

@pytest.mark.asyncio
async def test_track_event():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/webhook/track",
            json={"event_type": "click", "element_id": "btn", "path": "/", "timestamp": "2026-06-30T10:00:00Z"}
        )
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "success"

@pytest.mark.asyncio
async def test_chatbot_fallback():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/chatbot/chat",
            json={"messages": [{"role": "user", "content": "Hello"}]}
        )
    assert response.status_code == 200
    assert "response" in response.json()
