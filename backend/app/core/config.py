"""
Application configuration and settings.
Loads environment variables from .env file.
"""
from pydantic_settings import BaseSettings
from typing import Optional
from pydantic import Field, validator


class Settings(BaseSettings):
    """Application settings."""

    # Application
    APP_NAME: str = "Roomly API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api"

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Database
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/roomly",
        description="PostgreSQL database URL"
    )

    # Redis
    REDIS_URL: str = Field(
        default="redis://localhost:6379/0",
        description="Redis URL for caching"
    )

    # JWT
    SECRET_KEY: str = Field(
        default="your-secret-key-change-this-in-production",
        description="Secret key for JWT token generation"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    BACKEND_CORS_ORIGINS: list[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        description="Allowed CORS origins"
    )

    # OAuth - Google
    GOOGLE_CLIENT_ID: Optional[str] = Field(
        default=None,
        description="Google OAuth client ID"
    )
    GOOGLE_CLIENT_SECRET: Optional[str] = Field(
        default=None,
        description="Google OAuth client secret"
    )

    # Email (SendGrid)
    SENDGRID_API_KEY: Optional[str] = Field(
        default=None,
        description="SendGrid API key for emails"
    )
    FROM_EMAIL: str = Field(
        default="noreply@roomly.com",
        description="From email address"
    )

    # File Storage (AWS S3)
    AWS_ACCESS_KEY_ID: Optional[str] = Field(
        default=None,
        description="AWS access key ID"
    )
    AWS_SECRET_ACCESS_KEY: Optional[str] = Field(
        default=None,
        description="AWS secret access key"
    )
    AWS_BUCKET_NAME: str = Field(
        default="roomly-uploads",
        description="AWS S3 bucket name"
    )
    AWS_REGION: str = Field(
        default="us-east-1",
        description="AWS region"
    )

    # Frontend URL
    FRONTEND_URL: str = Field(
        default="http://localhost:3000",
        description="Frontend URL for redirects"
    )

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v):
        """Parse CORS origins from string or list."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v

    class Config:
        """Pydantic config."""
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()
