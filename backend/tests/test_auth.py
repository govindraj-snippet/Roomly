"""
Authentication API tests.
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession


pytestmark = pytest.mark.asyncio


class TestRegister:
    """Test user registration."""

    async def test_register_success(
        self, client: AsyncClient, db: AsyncSession
    ) -> None:
        """Test successful user registration."""
        response = await client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "TestPassword123!",
                "name": "Test User",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == "test@example.com"
        assert data["name"] == "Test User"
        assert "id" in data
        assert data["is_verified"] is False

    async def test_register_duplicate_email(
        self, client: AsyncClient, db: AsyncSession
    ) -> None:
        """Test registration with duplicate email."""
        # First registration
        await client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "TestPassword123!",
                "name": "Test User",
            },
        )

        # Second registration with same email
        response = await client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "AnotherPassword123!",
                "name": "Another User",
            },
        )
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"]

    async def test_register_weak_password(
        self, client: AsyncClient
    ) -> None:
        """Test registration with weak password."""
        response = await client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "123",
                "name": "Test User",
            },
        )
        assert response.status_code == 422  # Validation error


class TestLogin:
    """Test user login."""

    async def test_login_success(
        self, client: AsyncClient, db: AsyncSession
    ) -> None:
        """Test successful login."""
        # Register user first
        await client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "TestPassword123!",
                "name": "Test User",
            },
        )

        # Login
        response = await client.post(
            "/api/auth/login",
            json={
                "email": "test@example.com",
                "password": "TestPassword123!",
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"

    async def test_login_wrong_password(
        self, client: AsyncClient
    ) -> None:
        """Test login with wrong password."""
        response = await client.post(
            "/api/auth/login",
            json={
                "email": "nonexistent@example.com",
                "password": "WrongPassword123!",
            },
        )
        assert response.status_code == 401

    async def test_login_nonexistent_user(
        self, client: AsyncClient
    ) -> None:
        """Test login with non-existent user."""
        response = await client.post(
            "/api/auth/login",
            json={
                "email": "nonexistent@example.com",
                "password": "TestPassword123!",
            },
        )
        assert response.status_code == 401


class TestHealthCheck:
    """Test health check endpoint."""

    async def test_health_check(self, client: AsyncClient) -> None:
        """Test health check returns healthy status."""
        response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
