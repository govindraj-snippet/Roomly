# 🏠 Roomly - Roommate Matching Platform
## MVP Development Roadmap & Tech Stack

---

## 📋 Executive Summary

**Roomly** is a roommate matching platform that connects compatible roommates based on lifestyle preferences, habits, budget, and location requirements. Think of it as a "dating app for roommates" with a smart compatibility matching system.

### Core Value Proposition
- **Smart Matching**: Algorithm-based compatibility scoring
- **Transparent Profiles**: Detailed habit and preference sharing
- **Mutual Interest**: Both parties must swipe right to connect
- **Verified Listings**: Real users with genuine requirements

---

## 🛠️ Recommended Tech Stack

### Frontend (Web & Mobile)
| Component | Technology | Why |
|-----------|------------|-----|
| **Web Framework** | React 18 + Next.js 14 | Server-side rendering, great SEO, fast development |
| **UI Library** | shadcn/ui + Tailwind CSS | Modern, customizable, accessible components |
| **State Management** | Zustand + React Query | Lightweight state, powerful server state handling |
| **Mobile** | React Native / Expo | Cross-platform (iOS + Android) with 80% code reuse |
| **Maps** | Mapbox GL / Google Maps API | Location-based roommate discovery |

### Backend (Python - Scalable Production Stack)
| Component | Technology | Why |
|-----------|------------|-----|
| **Framework** | FastAPI 0.110+ | Async, fastest Python framework, auto OpenAPI docs, type hints |
| **ASGI Server** | Uvicorn + Gunicorn | Production-grade async server with multiple workers |
| **ORM** | SQLAlchemy 2.0 (Async) | Mature, powerful async ORM with relationship handling |
| **Validation** | Pydantic V2 | Fast validation, JSON schema generation, perfect for APIs |
| **Authentication** | JWT + OAuth2 (FastAPI Security) | Stateless auth, Google/social login support |
| **Password Hashing** | Passlib + bcrypt | Secure password hashing |
| **File Storage** | AWS S3 / Cloudflare R2 / MinIO | Scalable object storage for photos |
| **Real-time** | WebSocket (FastAPI) + Redis Pub/Sub | Chat, live updates, match notifications |

### Background Tasks & Jobs
| Component | Technology | Why |
|-----------|------------|-----|
| **Task Queue** | Celery 5.3+ + Redis | Distributed task processing for emails, notifications |
| **Scheduler** | Celery Beat / APScheduler | Scheduled jobs (daily summaries, cleanup) |
| **Message Broker** | Redis / RabbitMQ | Task queue, pub/sub, rate limiting |

### Database (Scalable Architecture)
| Component | Technology | Why |
|-----------|------------|-----|
| **Primary DB** | PostgreSQL 15+ (Neon / AWS RDS) | ACID, JSONB, full-text search, read replicas |
| **Connection Pool** | SQLAlchemy Engine + PgBouncer | Connection pooling for high concurrency |
| **Cache Layer** | Redis 7+ (Upstash / AWS ElastiCache) | Sessions, rate limiting, cached queries, pub/sub |
| **Read Replica** | PostgreSQL Read Replica | Distribute read load (for 1L+ users) |
| **Search** | PostgreSQL Full-Text + pg_trgm | Fast search with trigram matching |

---

## 🏗️ Scalability Architecture (For 1L+ Users)

### Horizontal Scaling Strategy

```
                        ┌─────────────────┐
                        │   CloudFlare /  │
                        │      AWS CDN    │
                        └────────┬─────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Load Balancer (ALB)   │
                    └────────────┬────────────┘
                                 │
            ┌────────────────────┼────────────────────┐
            │                    │                    │
    ┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
    │  Backend Pod 1  │  │  Backend Pod 2  │  │  Backend Pod N  │
    │  (FastAPI)      │  │  (FastAPI)      │  │  (FastAPI)      │
    │  Uvicorn x4     │  │  Uvicorn x4     │  │  Uvicorn x4     │
    └───────┬─────────┘  └───────┬─────────┘  └───────┬─────────┘
            │                    │                    │
            └────────────────────┼────────────────────┘
                                 │
            ┌────────────────────┼────────────────────┐
            │                    │                    │
    ┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
    │ PostgreSQL     │  │ Redis Cluster  │  │ Celery Workers │
    │ (Primary +     │  │ (Cache +       │  │ (Background    │
    │  Read Replicas)│  │  Pub/Sub)      │  │  Tasks)        │
    └────────────────┘  └────────────────┘  └────────────────┘
```

### Scaling Roadmap

| Users | Architecture | Actions |
|-------|-------------|---------|
| **0 - 10K** | Single instance | 1 backend pod, 1 DB, 1 Redis |
| **10K - 50K** | Basic scaling | 2-3 backend pods, connection pooling, Redis cache |
| **50K - 1L** | Horizontal scaling | Multiple backend pods, read replicas, CDN, Celery workers |
| **1L - 5L** | Full cluster | Kubernetes, DB sharding, dedicated cache cluster, separate services |
| **5L+** | Microservices | Split into auth, matching, chat, notification services |

### Performance Optimization Checklist

```python
# 1. Database Indexing (CRITICAL for 1L+ users)
CREATE INDEX CONCURRENTLY idx_users_city ON users(city);
CREATE INDEX CONCURRENTLY idx_swipes_swiper_direction ON swipes(swiper_id, direction);
CREATE INDEX CONCURRENTLY idx_matches_status ON matches(match_status) WHERE status = 'pending';
CREATE INDEX CONCURRENTLY idx_messages_created ON messages(match_id, created_at DESC);

# 2. Redis Caching Strategy
# - User profile: cache for 1 hour
# - Preferences: cache for 30 minutes
# - Match results: cache for 5 minutes (per user)
# - Session: cache for 24 hours

# 3. Connection Pooling (SQLAlchemy)
engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,          # Base connections
    max_overflow=40,       # Burst connections
    pool_pre_ping=True,     # Check connection health
    pool_recycle=3600,     # Recycle after 1 hour
)

# 4. Rate Limiting (per user)
# - API: 100 requests/minute
# - Match search: 30 requests/minute
# - Swipes: 100 swipes/hour
# - Messages: 60 messages/minute

# 5. Async Everything (FastAPI)
# - All DB queries async
# - All external API calls async
# - File uploads handled by background task
```

### Microservices Architecture (For 5L+ Users)

```
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway / Load Balancer                 │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼─────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│ Auth Service    │  │ Match Service   │  │ Chat Service    │
│ (FastAPI)       │  │ (FastAPI)       │  │ (FastAPI)       │
│ - Login         │  │ - Matching Algo │  │ - WebSocket     │
│ - OAuth         │  │ - Swipe Logic   │  │ - Messages      │
│ - JWT           │  │ - Compatibility │  │ - Read Receipts  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
         ┌──────▼──────┐ ┌────▼─────┐ ┌─────▼─────┐
         │ Redis Auth  │ │ Redis    │ │ Redis     │
         │ Session     │ │ Match    │ │ Chat      │
         └─────────────┘ └──────────┘ └───────────┘
```

### Infrastructure (Cloud-Native, Scalable)
| Component | Technology | Why |
|-----------|------------|-----|
| **Frontend Hosting** | Vercel / Netlify | Edge CDN, automatic scaling |
| **Backend Hosting** | AWS ECS / Digital Ocean App Platform / Render | Containerized deployment, auto-scaling |
| **Container** | Docker + Docker Compose | Consistent dev/prod environment |
| **Orchestration** | Kubernetes (EKS/GKE/AKS) - Phase 2 | For 1L+ users, multi-node scaling |
| **Load Balancer** | AWS ALB / Nginx | Distribute traffic across instances |
| **CI/CD** | GitHub Actions | Automated testing, docker build, deploy |
| **Monitoring** | Sentry (Errors) + Datadog/NewRelic (APM) | Real-time error tracking + performance monitoring |
| **Logging** | ELK Stack / CloudWatch | Centralized logging |
| **Email** | SendGrid / AWS SES | Transactional emails at scale |
| **SMS** | Twilio / AWS SNS | OTP verification

---

## 🗄️ Database Schema Design

```sql
-- Core Tables

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    phone VARCHAR(20),
    bio TEXT,
    profile_image_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Location
    preferred_city VARCHAR(100) NOT NULL,
    preferred_areas TEXT[], -- ['Koramangala', 'HSR', 'Indiranagar']
    max_rent_budget DECIMAL(10,2),
    min_rent_budget DECIMAL(10,2),
    
    -- Accommodation
    room_type VARCHAR(20), -- 'private', 'shared', 'any'
    move_in_date DATE,
    lease_duration_months INTEGER,
    
    -- Lifestyle Habits
    smoking_preference VARCHAR(20), -- 'smoker', 'non-smoker', 'no-preference'
    drinking_preference VARCHAR(20), -- 'drinker', 'non-drinker', 'occasional', 'no-preference'
    dietary_preference VARCHAR(50), -- 'vegetarian', 'non-vegetarian', 'vegan', 'eggetarian'
    
    -- Schedule
    sleep_schedule VARCHAR(20), -- 'early_bird', 'night_owl', 'flexible'
    work_schedule VARCHAR(20), -- 'work_from_home', 'office', 'hybrid', 'student'
    
    -- Social Preferences
    guests_preference VARCHAR(20), -- 'frequently', 'occasionally', 'rarely', 'never'
    party_preference VARCHAR(20), -- 'enjoy', 'tolerate', 'prefer_quiet'
    
    -- Cleanliness
    cleanliness_level INTEGER CHECK (cleanliness_level BETWEEN 1 AND 5),
    
    -- Additional
    has_pets BOOLEAN,
    pet_friendly BOOLEAN,
    gender_preference VARCHAR(50), -- 'any', 'male', 'female', 'non-binary', 'specific'
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE profile_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    viewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    viewed_id UUID REFERENCES users(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(viewer_id, viewed_id)
);

CREATE TABLE swipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    swiper_id UUID REFERENCES users(id) ON DELETE CASCADE,
    swiped_id UUID REFERENCES users(id) ON DELETE CASCADE,
    direction VARCHAR(10) NOT NULL CHECK (direction IN ('right', 'left', 'super')),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(swiper_id, swiped_id)
);

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
    compatibility_score INTEGER CHECK (compatibility_score BETWEEN 0 AND 100),
    match_status VARCHAR(20) DEFAULT 'pending' CHECK (match_status IN ('pending', 'accepted', 'rejected', 'blocked')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user1_id, user2_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX idx_swipes_swiped ON swipes(swiped_id);
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_preferences_city ON preferences(preferred_city);
CREATE INDEX idx_preferences_budget ON preferences(max_rent_budget);
```

---

## 📱 MVP Feature Breakdown

### Phase 1: Core Profile & Matching (Weeks 1-4)
| Feature | Description | Priority |
|---------|-------------|----------|
| User Registration | Email/password, social login (Google) | 🔴 P0 |
| Profile Creation | Name, age, gender, profession, bio, photo | 🔴 P0 |
| Preference Form | All habits, budget, location requirements | 🔴 P0 |
| Basic Matching | Filter-based matching algorithm | 🔴 P0 |
| Swipe Interface | Right/left swipe on profiles | 🔴 P0 |
| Match Notification | When both users swipe right | 🔴 P0 |

### Phase 2: Communication & Discovery (Weeks 5-8)
| Feature | Description | Priority |
|---------|-------------|----------|
| In-App Chat | Real-time messaging between matches | 🔴 P0 |
| Profile Cards | Visual profile display in swipe deck | 🟡 P1 |
| Search & Filters | Advanced search with multiple filters | 🟡 P1 |
| Location Filter | Filter by preferred areas | 🟡 P1 |
| View Profile History | See who viewed your profile | 🟢 P2 |

### Phase 3: Engagement & Trust (Weeks 9-12)
| Feature | Description | Priority |
|---------|-------------|----------|
| User Verification | Phone/email verification badge | 🟡 P1 |
| Report & Block | Safety features | 🔴 P0 |
| Compatibility Score | Algorithm-based matching score | 🟡 P1 |
| Preferences Edit | Update profile preferences | 🟡 P1 |
| Push Notifications | New matches, messages | 🟢 P2 |

---

## 🚀 Step-by-Step MVP Development Roadmap

### Month 1: Foundation Setup

#### Week 1: Project Setup & Infrastructure
```bash
# Day 1-2: Repository Setup
- [ ] Initialize monorepo structure:
    /roomly
      /frontend (Next.js)
      /backend (FastAPI)
      /docker (Docker compose files)
- [ ] Set up GitHub repository
- [ ] Configure pre-commit hooks (black, ruff, mypy)
- [ ] Create .env.example template

# Day 3-4: Backend Foundation (Python/FastAPI)
- [ ] Set up FastAPI project structure:
    /app
      /api (routers)
      /core (config, security)
      /db (database, models)
      /services (business logic)
      /schemas (Pydantic models)
- [ ] Configure Alembic for migrations
- [ ] Set up SQLAlchemy async engine
- [ ] Create initial database models (User, Preference)
- [ ] Write first Alembic migration

# Day 5-7: Frontend Foundation
- [ ] Initialize Next.js 14 project
- [ ] Set up shadcn/ui + Tailwind CSS
- [ ] Configure TanStack Query (React Query)
- [ ] Set up axios/fetch for API calls
- [ ] Create basic layout and routing
```

#### Week 2: Authentication & Basic Profile
```bash
# Day 1-3: Authentication Flow (Backend)
- [ ] Implement JWT auth utils (access + refresh tokens)
- [ ] Create password hashing utilities (Passlib + bcrypt)
- [ ] Build auth endpoints:
    - POST /api/auth/register
    - POST /api/auth/login
    - POST /api/auth/refresh-token
    - POST /api/auth/logout
- [ ] Add Google OAuth integration
- [ ] Create auth middleware for protected routes
- [ ] Set up Redis for session/blacklist storage

# Day 4-7: Profile Creation (Frontend + Backend)
- [ ] Backend: User CRUD endpoints
    - GET /api/users/me
    - PUT /api/users/me
    - POST /api/users/avatar-upload (background task)
- [ ] Frontend: Multi-step profile form
- [ ] Integrate S3/Cloudflare R2 for photo uploads
- [ ] Add profile completion progress tracker
- [ ] Implement profile edit functionality
```

#### Week 3: Preferences Form & Database
```bash
# Day 1-4: Preferences Form
- [ ] Backend: Create Pydantic schemas for all preferences
    - LocationPreferences, LifestylePreferences, etc.
- [ ] Backend: Preference CRUD endpoints:
    - POST /api/preferences (create)
    - GET /api/preferences/me (fetch)
    - PUT /api/preferences (update)
- [ ] Frontend: Multi-section form with validation
- [ ] Implement draft saving (auto-save to Redis)
- [ ] Complete database migrations for all tables

# Day 5-7: Advanced Database Setup
- [ ] Add proper indexes for performance
- [ ] Set up Redis caching for preferences
- [ ] Create database seed scripts for testing
- [ ] Add connection pooling configuration
```

#### Week 4: Matching Algorithm & Swipe System
```bash
# Day 1-3: Matching Algorithm
- [ ] Implement MatchingService (Python)
    - calculate_compatibility_score()
    - _calculate_habit_compatibility()
    - _calculate_budget_overlap()
- [ ] Create GET /api/matches endpoint with filtering
- [ ] Add Redis caching for match results (5 min TTL)
- [ ] Implement pagination for match results

# Day 4-7: Swipe System
- [ ] POST /api/swipes endpoint
- [ ] Background task: Check for mutual matches
- [ ] Redis Pub/Sub: Real-time match notification
- [ ] Create WebSocket endpoint for live updates
- [ ] Implement rate limiting (100 swipes/hour)
```

### Month 2: Core Features

#### Week 5: Swipe Interface
```bash
# Day 1-4: UI Development
- [ ] Tinder-like card swipe interface
- [ ] Profile card with all key info
- [ ] Swipe animations (smooth gestures)
- [ ] Right/left/super swipe buttons

# Day 5-7: Integration
- [ ] Connect to matching API
- [ ] Pagination for swipe deck
- [ ] "No more profiles" state
- [ ] Refresh profiles functionality
```

#### Week 6: Real-time Chat (FastAPI WebSocket)
```bash
# Day 1-3: Backend Chat System
- [ ] Create Message model and migration
- [ ] POST /api/messages endpoint (REST fallback)
- [ ] WebSocket endpoint: /ws/chat/{match_id}
- [ ] Implement Redis Pub/Sub for message broadcasting
- [ ] Add typing indicator events
- [ ] Implement read receipt tracking

# Day 4-7: Frontend Chat Interface
- [ ] WebSocket connection manager (React)
- [ ] Chat list with online status
- [ ] Individual chat view with message bubbles
- [ ] Typing indicator UI
- [ ] Message timestamps and read receipts
- [ ] Auto-reconnect on disconnect
```

#### Week 7: Search & Discovery
```bash
# Day 1-4: Search Page
- [ ] Search bar with autocomplete (city)
- [ ] Filter sidebar:
  - Budget range slider
  - Room type
  - Smoking/drinking preferences
  - Gender preference
- [ ] Search results grid/list view

# Day 5-7: Profile Details
- [ ] Full profile view page
- [ ] "About me" section
- [ ] Preferences comparison view
- [ ] Share profile link
```

#### Week 8: Safety Features
```bash
# Day 1-3: Reporting
- [ ] Report user modal
- [ ] Report categories (inappropriate, scam, fake, etc.)
- [ ] Admin report dashboard

# Day 4-7: Blocking
- [ ] Block user functionality
- [ ] Blocked users hidden from matching
- [ ] Unblock functionality
- [ ] Privacy settings page
```

### Month 3: Polish & Launch Prep

#### Week 9: User Verification
```bash
# Day 1-3: Phone Verification (Python)
- [ ] Integrate Twilio for SMS OTP
- [ ] Create Celery task for sending OTP
- [ ] OTP generation and Redis storage (5 min expiry)
- [ ] POST /api/auth/send-otp endpoint
- [ ] POST /api/auth/verify-otp endpoint
- [ ] Add verified badge to User model

# Day 4-7: Email Verification
- [ ] Create Celery task for email verification
- [ ] SendGrid/SES integration
- [ ] Verification token generation (JWT)
- [ ] POST /api/auth/send-verification-email
- [ ] GET /api/auth/verify-email/{token}
- [ ] Update frontend to show verification status
```

#### Week 10: Notifications (Celery + Redis)
```bash
# Day 1-4: Background Task System
- [ ] Set up Celery with Redis broker
- [ ] Define notification tasks:
    - send_match_notification()
    - send_message_notification()
    - send_daily_summary_email()
- [ ] Configure Celery Beat scheduler
- [ ] Create Notification model and endpoints
- [ ] GET /api/notifications endpoint

# Day 5-7: Push & In-App Notifications
- [ ] Firebase Cloud Messaging setup
- [ ] Celery task for push notifications
- [ ] Frontend notification center
- [ ] Notification preferences API
- [ ] WebSocket live notification feed
```

#### Week 11: Testing & Bug Fixes
```bash
# Day 1-3: Testing (Python Ecosystem)
- [ ] pytest setup with fixtures and factories
- [ ] Unit tests for:
    - MatchingService (core algorithm)
    - Auth endpoints
    - Swipe/Match logic
- [ ] pytest-asyncio for async endpoint tests
- [ ] HTTPX for FastAPI endpoint testing
- [ ] End-to-end testing with Playwright (frontend)
- [ ] Locust load testing for chat API

# Day 4-7: Bug Fixes & Optimization
- [ ] Fix issues from testing
- [ ] Database query optimization (EXPLAIN ANALYZE)
- [ ] Add Redis caching for slow queries
- [ ] Implement rate limiting (slowapi)
- [ ] Image compression and CDN setup
- [ ] Black code formatter, Ruff linter
```

#### Week 12: Launch Preparation
```bash
# Day 1-3: Documentation & Docker
- [ ] Write Sphinx/MkDocs API documentation
- [ ] Create Dockerfile for backend
- [ ] docker-compose.yml for local dev
- [ ] Privacy Policy & Terms of Service
- [ ] Help/FAQ page content
- [ ] User onboarding guide

# Day 4-7: Production Deployment
- [ ] Set up AWS/Cloud production database
- [ ] Configure production Redis
- [ ] Set up Celery worker processes
- [ ] Nginx reverse proxy configuration
- [ ] SSL certificate (Let's Encrypt)
- [ ] Sentry error tracking setup
- [ ] Datadog/NewRelic APM integration
- [ ] CI/CD pipeline (GitHub Actions)
```

---

## 📊 Matching Algorithm Logic (Python)

```python
# app/services/matching.py
from typing import Optional, List
from pydantic import BaseModel
from enum import Enum

class SmokingPreference(str, Enum):
    SMOKER = "smoker"
    NON_SMOKER = "non-smoker"
    NO_PREFERENCE = "no-preference"

class DrinkingPreference(str, Enum):
    DRINKER = "drinker"
    NON_DRINKER = "non-drinker"
    OCCASIONAL = "occasional"
    NO_PREFERENCE = "no-preference"

class SleepSchedule(str, Enum):
    EARLY_BIRD = "early_bird"
    NIGHT_OWL = "night_owl"
    FLEXIBLE = "flexible"

class UserHabits(BaseModel):
    smoking: SmokingPreference
    drinking: DrinkingPreference
    dietary: str  # vegetarian, non-vegetarian, vegan, eggetarian

class UserPreference(BaseModel):
    city: str
    preferred_areas: List[str]
    min_rent_budget: float
    max_rent_budget: float
    room_type: str
    sleep_schedule: SleepSchedule
    cleanliness_level: int  # 1-5
    habits: UserHabits

class MatchingService:
    """Service for calculating compatibility between users"""

    @staticmethod
    def calculate_compatibility_score(
        user1_pref: UserPreference,
        user2_pref: UserPreference
    ) -> int:
        """
        Calculate compatibility score between two users (0-100)

        Scoring breakdown:
        - Location Match: 25 points
        - Budget Compatibility: 20 points
        - Lifestyle Habits: 30 points
        - Sleep Schedule: 10 points
        - Cleanliness Level: 15 points
        """
        score = 0
        max_score = 0

        # 1. Location Match (25 points)
        max_score += 25
        if user1_pref.city == user2_pref.city:
            score += 15
            # Check for preferred area overlap
            area_overlap = set(user1_pref.preferred_areas) & set(user2_pref.preferred_areas)
            if area_overlap:
                score += 10

        # 2. Budget Compatibility (20 points)
        max_score += 20
        budget_overlap = MatchingService._calculate_budget_overlap(
            user1_pref.min_rent_budget,
            user1_pref.max_rent_budget,
            user2_pref.min_rent_budget,
            user2_pref.max_rent_budget
        )
        score += int(budget_overlap * 20)

        # 3. Lifestyle Habits (30 points)
        max_score += 30
        score += MatchingService._calculate_habit_compatibility(
            user1_pref.habits,
            user2_pref.habits
        )

        # 4. Sleep Schedule Match (10 points)
        max_score += 10
        if user1_pref.sleep_schedule == user2_pref.sleep_schedule:
            score += 10
        elif (SleepSchedule.FLEXIBLE in
              [user1_pref.sleep_schedule, user2_pref.sleep_schedule]):
            score += 5

        # 5. Cleanliness Level (15 points)
        max_score += 15
        cleanliness_diff = abs(
            user1_pref.cleanliness_level - user2_pref.cleanliness_level
        )
        # Closer levels = higher score
        score += int(((5 - cleanliness_diff) / 5) * 15)

        return int((score / max_score) * 100)

    @staticmethod
    def _calculate_budget_overlap(
        u1_min: float, u1_max: float,
        u2_min: float, u2_max: float
    ) -> float:
        """Calculate budget overlap ratio (0.0 - 1.0)"""
        overlap_min = max(u1_min, u2_min)
        overlap_max = min(u1_max, u2_max)

        if overlap_min > overlap_max:
            return 0.0  # No overlap
        return 1.0  # Full overlap

    @staticmethod
    def _calculate_habit_compatibility(h1: UserHabits, h2: UserHabits) -> int:
        """Calculate habit compatibility score (0-30 points)"""
        score = 0

        # Smoking (10 points)
        if h1.smoking == h2.smoking:
            score += 10
        elif SmokingPreference.NO_PREFERENCE in [h1.smoking, h2.smoking]:
            score += 5

        # Drinking (10 points)
        if h1.drinking == h2.drinking:
            score += 10
        elif DrinkingPreference.NO_PREFERENCE in [h1.drinking, h2.drinking]:
            score += 5
        elif (DrinkingPreference.OCCASIONAL in [h1.drinking, h2.drinking] and
              DrinkingPreference.NON_DRINKER in [h1.drinking, h2.drinking]):
            score += 3  # Partial match

        # Food (10 points)
        if h1.dietary == h2.dietary:
            score += 10
        elif MatchingService._compatible_diet(h1.dietary, h2.dietary):
            score += 5  # Compatible (e.g., vegetarian + eggetarian)

        return score

    @staticmethod
    def _compatible_diet(diet1: str, diet2: str) -> bool:
        """Check if two dietary preferences are compatible"""
        compatible_pairs = {
            ("vegetarian", "eggetarian"),
            ("vegan", "vegetarian"),
            ("eggetarian", "vegetarian"),
        }
        return (diet1, diet2) in compatible_pairs or (diet2, diet1) in compatible_pairs


# Usage in FastAPI endpoint
from fastapi import Depends
from app.services.matching import MatchingService

@router.get("/matches/{user_id}")
async def get_compatible_matches(
    user_id: UUID,
    session: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get user preferences
    user_pref = await get_user_preferences(session, user_id)

    # Get potential matches (excluding already swiped users)
    potential_matches = await get_potential_matches(session, user_id)

    # Score each match
    scored_matches = []
    for match in potential_matches:
        score = MatchingService.calculate_compatibility_score(
            user_pref, match.preferences
        )
        if score >= 60:  # Minimum 60% compatibility
            scored_matches.append({
                "user": match,
                "compatibility_score": score
            })

    # Sort by score (highest first)
    scored_matches.sort(key=lambda x: x["compatibility_score"], reverse=True)

    return {"matches": scored_matches[:20]}  # Return top 20
```

---

## 🎨 UI/UX Key Screens

```
1. Onboarding Flow
   ┌─────────────────────────────────────┐
   │          Welcome to Roomly          │
   │     Find your perfect roommate      │
   │                                     │
   │    [Get Started] [Log In]           │
   └─────────────────────────────────────┘

2. Preference Form (Multi-step)
   ┌─────────────────────────────────────┐
   │  Step 2/5: Location & Budget        │
   │  ●━━━━━○━━━━━○━━━━━○━━━━━○          │
   │                                     │
   │  Preferred City: [Bangalore  ▼]    │
   │  Preferred Areas:                  │
   │    ☑ Koramangala  ☑ HSR            │
   │    ☐ Indiranagar   ☐ Whitefield    │
   │                                     │
   │  Budget Range:                      │
   │  ₹5,000 ━━━●━━━━━━━━━━━━ ₹25,000   │
   │  Selected: ₹8,000 - ₹15,000         │
   │                                     │
   │          [Back]  [Next →]           │
   └─────────────────────────────────────┘

3. Swipe Interface
   ┌─────────────────────────────────────┐
   │                                     │
   │        ┌──────────────────┐        │
   │        │                  │        │
   │        │   [Profile Photo]│        │
   │        │      & Name      │        │
   │        │                  │        │
   │        │  📍 Koramangala  │        │
   │        │  💰 ₹12k/month   │        │
   │        │  🚭 Non-smoker   │        │
   │        │                  │        │
   │        └──────────────────┘        │
   │                                     │
   │   [✕]  [⭐]  [♥]                    │
   │   Pass  Super Like  Like           │
   └─────────────────────────────────────┘

4. Match Screen
   ┌─────────────────────────────────────┐
   │                                     │
   │        ╭──────────────────╮         │
   │        │    It's a       │         │
   │        │    MATCH! 💚     │         │
   │        ╰──────────────────╯         │
   │                                     │
   │      ┌──────┐      ┌──────┐        │
   │      │ You  │      │ Alex │        │
   │      └──────┘      └──────┘        │
   │    85% Compatible                   │
   │                                     │
   │      [Send Message]                 │
   │      [Keep Swiping]                 │
   └─────────────────────────────────────┘

5. Chat Interface
   ┌─────────────────────────────────────┐
   │  ← Alex              Online  ●      │
   ├─────────────────────────────────────┤
   │                                     │
   │  Hey! Looking for a place in...     │
   │            Koramangala ✓            │
   │                                     │
   │  Yeah, I saw your profile and...    │
   │            thought we'd be...       │
   │                  a good match! ✓     │
   │                                     │
   │              [Typing...]            │
   │                                     │
   ├─────────────────────────────────────┤
   │  [Type a message...]        [Send]  │
   └─────────────────────────────────────┘

6. Search & Filters
   ┌─────────────────────────────────────┐
   │  🔍 Search: Bangalore...             │
   │                                     │
   │  Filters: ▼                         │
   │    Budget: ₹5k - ₹15k               │
   │    Smoking: Non-smokers only        │
   │    Room Type: Private               │
   │                                     │
   │  ┌──────────────┐ ┌──────────────┐ │
   │  │    Result 1  │ │    Result 2  │ │
   │  │  📍 HSR      │ │  📍 Indira.. │ │
   │  │  💰 ₹10k     │ │  💰 ₹12k     │ │
   │  └──────────────┘ └──────────────┘ │
   └─────────────────────────────────────┘
```

---

## 📈 Post-MVP Roadmap (Future Enhancements)

### Quarter 1 After Launch
- Mobile apps (iOS & Android)
- Advanced matching with ML recommendations
- Listing integration (find actual rooms)
- Video call feature for potential roommates

### Quarter 2 After Launch
- Premium subscription (unlimited swipes, see who liked you)
- Background verification services
- Roommate agreement generator
- Group matching (for 3BHK, 4BHK etc.)

### Quarter 3 After Launch
- Integration with rental platforms
- Moving services partnership
- Utility split calculator
- Chore management for roommates

---

## 💰 Estimated Costs (MVP - 3 Months)

| Service | Monthly Cost | Notes |
|---------|-------------|-------|
| **Frontend Hosting** | $0-20 | Vercel free tier → Pro |
| **Backend Hosting** | $0-50 | Render/Railway → AWS ECS |
| **Database** | $0-50 | Neon free tier → AWS RDS |
| **Redis** | $0-30 | Upstash free → AWS ElastiCache |
| **File Storage** | $0-15 | Cloudflare R2 / AWS S3 |
| **Email Service** | $0-20 | SendGrid / AWS SES |
| **SMS** | $0-50 | Twilio (pay per SMS) |
| **Monitoring** | $0-50 | Sentry (free) + Datadog (optional) |
| **Celery Workers** | $0-30 | Background job processing |
| **Domain** | $10-15/year | One-time yearly |
| **Total (MVP)** | **$30-315/month** | Scales with traffic |

### Scaling Cost Projections

| Stage | Users | Monthly Cost | Architecture |
|-------|-------|-------------|--------------|
| **MVP Launch** | 0 - 10K | $30 - 100 | Single instance, shared DB |
| **Growth** | 10K - 50K | $100 - 300 | 2-3 pods, connection pooling, cache |
| **Scale** | 50K - 1L | $300 - 800 | Multiple pods, read replicas, CDN |
| **Large Scale** | 1L - 5L | $800 - 2,500 | Kubernetes, DB sharding, microservices |
| **Platform** | 5L+ | $2,500+ | Full microservices, dedicated infra |

### Cost Optimization Tips
```python
# 1. Use Redis caching aggressively (cheaper than DB queries)
# - User profiles: 1 hour TTL
# - Match results: 5 minute TTL
# - Preference data: 30 minute TTL

# 2. Use connection pooling (fewer DB connections = lower cost)
engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=40
)

# 3. Offload static assets to CDN (cheaper bandwidth)
# - Profile images → Cloudflare R2 (free egress!)
# - CSS/JS files → Vercel CDN

# 4. Use Celery for heavy tasks (don't block API workers)
# - Email sending (Celery)
# - Image processing (Celery)
# - Daily summaries (Celery Beat)
```

---

## 🎯 MVP Launch Checklist

### Technical
- [ ] All core features functional
- [ ] Responsive design (mobile + desktop)
- [ ] SEO optimized
- [ ] Fast loading (<3s)
- [ ] Error tracking set up
- [ ] Automated backups

### Legal & Compliance
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] User Data Deletion Policy
- [ ] GDPR compliance (if EU users)
- [ ] Cookie consent banner

### Marketing
- [ ] Landing page
- [ ] App store description draft
- [ ] Social media setup
- [ ] Beta user recruitment plan
- [ ] Demo video

---

## 🚦 Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Low user base (chicken-egg problem) | Focus on one city initially, manual curation of initial profiles |
| Fake profiles/scammers | Phone verification, report system, manual review |
| Safety concerns | Verified badges, block/report features, safety tips |
| Technical scaling | Start with scalable architecture, CDN, database indexing |

---

## 📚 Resources & References

### Python Backend Technologies
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy 2.0 Async Docs](https://docs.sqlalchemy.org/en/20/orm/asyncio.html)
- [Pydantic V2 Docs](https://docs.pydantic.dev/)
- [Celery Documentation](https://docs.celeryq.dev/)
- [Alembic Migrations](https://alembic.sqlalchemy.org/)
- [Redis Python (aioredis)](https://redis.readthedocs.io/)

### Frontend Technologies
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)

### Testing
- [Pytest Documentation](https://docs.pytest.org/)
- [pytest-asyncio](https://pytest-asyncio.readthedocs.io/)
- [Locust Load Testing](https://locust.io/)

### Inspiration
- Roommate matching apps: Roomi, SpareRoom, Bumble BFF
- Dating app UX patterns: Tinder, Hinge

---

## 🐍 Python Project Structure Template

```
roomly/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── core/                   # Config, security, dependencies
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── deps.py
│   │   ├── db/                     # Database models and session
│   │   │   ├── base.py
│   │   │   ├── session.py
│   │   │   └── models/
│   │   │       ├── user.py
│   │   │       ├── preference.py
│   │   │       ├── swipe.py
│   │   │       ├── match.py
│   │   │       └── message.py
│   │   ├── schemas/                # Pydantic schemas
│   │   │   ├── user.py
│   │   │   ├── preference.py
│   │   │   ├── auth.py
│   │   │   └── common.py
│   │   ├── api/                    # API routers
│   │   │   ├── deps.py
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── preferences.py
│   │   │   ├── matches.py
│   │   │   ├── swipes.py
│   │   │   └── messages.py
│   │   ├── services/               # Business logic
│   │   │   ├── auth_service.py
│   │   │   ├── matching_service.py
│   │   │   └── notification_service.py
│   │   ├── tasks/                  # Celery tasks
│   │   │   ├── celery_app.py
│   │   │   ├── email_tasks.py
│   │   │   └── notification_tasks.py
│   │   ├── utils/                  # Helper functions
│   │   │   ├── image.py
│   │   │   └── validators.py
│   │   └── websocket/              # WebSocket handlers
│   │       └── chat.py
│   ├── tests/                      # Pytest tests
│   ├── alembic/                    # DB migrations
│   ├── requirements/               # Dependencies
│   │   ├── base.txt
│   │   ├── dev.txt
│   │   └── prod.txt
│   ├── Dockerfile
│   └── pyproject.toml              # Poetry config
├── frontend/                       # Next.js app
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│   └── package.json
├── docker/
│   └── docker-compose.yml
└── README.md
```

### Python Dependencies (requirements/base.txt)

```
# FastAPI and server
fastapi==0.110.0
uvicorn[standard]==0.27.0
gunicorn==21.2.0

# Database
sqlalchemy==2.0.25
asyncpg==0.29.0
alembic==1.13.1

# Validation
pydantic==2.6.1
pydantic-settings==2.1.0
email-validator==2.1.0

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.9

# Redis
redis==5.0.1
hiredis==2.3.2

# Celery
celery==5.3.6
flower==2.0.1

# HTTP client
httpx==0.26.0
aiohttp==3.9.3

# S3/Storage
boto3==1.34.49
aioboto3==12.3.0

# Utilities
python-dotenv==1.0.1
orjson==3.9.14

# SMS/Email
twilio==8.11.2
sendgrid==6.11.0

# Testing (dev.txt)
pytest==8.0.0
pytest-asyncio==0.23.4
pytest-cov==4.1.0
httpx==0.26.0

# Code quality (dev.txt)
black==24.1.1
ruff==0.1.14
mypy==1.8.0
```

---

## 🔄 Sprint Planning Template

```markdown
### Sprint X: [Sprint Name]
**Dates:** [Start] - [End]

| Story | Points | Status |
|-------|--------|--------|
| As a user, I want to... | 3 | ☐ In Progress |
| As an admin, I need to... | 5 | ☐ TODO |
| ... | ... | ... |

**Sprint Goal:** [What success looks like]

**Retro:** [What went well / What to improve]
```

---

*Last Updated: July 2026*
*Version: 2.0 - Python Backend, Scalable Architecture for 1L+ Users*
