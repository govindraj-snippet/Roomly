# 🎯 Roomly MVP Roadmap
## Step-by-Step Implementation Guide (12 Weeks)

---

## 📋 MVP Scope

**Goal**: Launch a functional roommate matching platform in 12 weeks.

### What We're Building (MVP)
✅ User registration & login (email + Google OAuth)
✅ User profiles with photos
✅ Preference form (location, budget, habits, lifestyle)
✅ Smart matching algorithm (compatibility score 0-100)
✅ Swipe interface (right/left/super)
✅ Real-time chat between matches
✅ Basic search & filters
✅ Report & block functionality

### What's NOT in MVP
❌ Mobile apps (web-responsive only)
❌ Advanced ML recommendations
❌ Video calls
❌ Payment/premium features
❌ Room listing integration

---

## 🛠️ Tech Stack (MVP - Simple & Effective)

### Backend
```
FastAPI          - Web framework (async, fast)
SQLAlchemy 2.0   - Database ORM (async)
PostgreSQL       - Database (Neon/Railway for free tier)
Redis            - Caching & sessions (Upstash free tier)
Celery           - Background tasks (emails, notifications)
Pydantic V2      - Validation
```

### Frontend
```
Next.js 14       - React framework with SSR
shadcn/ui        - UI components
Tailwind CSS     - Styling
TanStack Query   - API state management
```

### Infrastructure
```
Vercel           - Frontend hosting (free tier)
Render/Railway   - Backend hosting (free tier)
Neon/Supabase    - Database hosting (free tier)
Cloudflare R2    - File storage (free tier)
SendGrid         - Email (free tier)
GitHub Actions   - CI/CD
```

---

## 📅 12-Week Implementation Plan

### 🗓️ Week 1: Project Setup & Foundation

#### Day 1-2: Repository & Structure
```bash
# Create project structure
roomly/
├── backend/          # FastAPI app
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── api/
│   │   └── services/
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/         # Next.js app
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
└── docs/            # Documentation

# Tasks:
[ ] Initialize Git repository
[ ] Create folder structure
[ ] Set up GitHub repo with .gitignore
[ ] Create requirements.txt (backend)
[ ] Create package.json (frontend)
```

#### Day 3-5: Backend Foundation
```python
# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Roomly API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "healthy"}

# Tasks:
[ ] Set up FastAPI project
[ ] Configure CORS
[ ] Create base config (settings.py)
[ ] Set up virtual environment
[ ] Test server runs locally
```

#### Day 6-7: Frontend Foundation
```bash
# Tasks:
[ ] Create Next.js 14 project
[ ] Install shadcn/ui
[ ] Set up Tailwind CSS
[ ] Configure TanStack Query
[ ] Create basic layout
[ ] Test app runs locally
```

---

### 🗓️ Week 2: Database Setup & User Models

#### Day 1-3: Database Setup
```bash
# Tasks:
[ ] Set up PostgreSQL (Neon/Railway)
[ ] Install SQLAlchemy + asyncpg
[ ] Create database URL in .env
[ ] Test database connection
[ ] Set up Alembic for migrations
```

#### Day 4-7: User Model & Migration
```python
# backend/app/models/user.py
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True)
    bio = Column(String(500))
    profile_image_url = Column(String)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# Tasks:
[ ] Create User model
[ ] Create first Alembic migration
[ ] Run migration
[ ] Verify table created in DB
[ ] Add database session factory
```

---

### 🗓️ Week 3: Authentication

#### Day 1-4: Auth Endpoints
```python
# backend/app/api/auth.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
async def register(data: RegisterRequest):
    # Hash password, create user
    pass

@router.post("/login")
async def login(data: LoginRequest):
    # Verify password, return JWT
    pass

@router.post("/google")
async def google_auth(token: str):
    # Verify Google token
    pass

# Tasks:
[ ] Install passlib + python-jose
[ ] Implement password hashing
[ ] Create JWT utilities (access + refresh tokens)
[ ] Build register endpoint
[ ] Build login endpoint
[ ] Add Google OAuth
```

#### Day 5-7: Auth Frontend
```bash
# Tasks:
[ ] Create login page
[ ] Create register page
[ ] Add form validation
[ ] Connect to API
[ ] Store JWT in localStorage/cookie
[ ] Add protected route middleware
```

---

### 🗓️ Week 4: User Profiles

#### Day 1-4: Profile Models & API
```python
# backend/app/models/profile.py
class Preference(Base):
    __tablename__ = "preferences"

    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey("users.id"))
    preferred_city = Column(String)
    preferred_areas = Column(ARRAY(String))
    min_rent_budget = Column(Integer)
    max_rent_budget = Column(Integer)
    room_type = Column(String)
    smoking_preference = Column(String)
    drinking_preference = Column(String)
    dietary_preference = Column(String)
    sleep_schedule = Column(String)
    cleanliness_level = Column(Integer)

# Tasks:
[ ] Create Preference model
[ ] Create migration
[ ] Build GET /api/users/me
[ ] Build PUT /api/users/me
[ ] Build POST /api/preferences
[ ] Build GET /api/preferences
```

#### Day 5-7: Profile Frontend
```bash
# Tasks:
[ ] Create profile edit page
[ ] Add photo upload (input type="file")
[ ] Multi-step preference form:
  [ ] Step 1: Location & Budget
  [ ] Step 2: Room Requirements
  [ ] Step 3: Lifestyle Habits
  [ ] Step 4: Schedule & Social
  [ ] Step 5: Cleanliness & Other
[ ] Add form validation (Zod)
[ ] Save progress to localStorage
```

---

### 🗓️ Week 5: Matching Algorithm

#### Day 1-3: Matching Service
```python
# backend/app/services/matching.py
class MatchingService:
    @staticmethod
    def calculate_compatibility_score(user1, user2) -> int:
        score = 0
        max_score = 100

        # Location (25 points)
        if user1.city == user2.city:
            score += 15
            if set(user1.areas) & set(user2.areas):
                score += 10

        # Budget (20 points)
        if budget_overlap(user1, user2):
            score += 20

        # Habits (30 points)
        score += habit_score(user1, user2)

        # Sleep (10 points)
        if user1.sleep == user2.sleep:
            score += 10

        # Cleanliness (15 points)
        score += cleanliness_score(user1, user2)

        return (score / max_score) * 100

# Tasks:
[ ] Create MatchingService class
[ ] Implement all scoring methods
[ ] Write unit tests for algorithm
[ ] Test with sample data
```

#### Day 4-7: Match API
```bash
# Tasks:
[ ] Build GET /api/matches endpoint
[ ] Add filtering (city, budget, habits)
[ ] Add pagination (limit 20)
[ ] Sort by compatibility score
[ ] Add caching (Redis, 5 min TTL)
```

---

### 🗓️ Week 6: Swipe System

#### Day 1-4: Swipe Backend
```python
# backend/app/models/swipe.py
class Swipe(Base):
    __tablename__ = "swipes"

    id = Column(UUID, primary_key=True)
    swiper_id = Column(UUID, ForeignKey("users.id"))
    swiped_id = Column(UUID, ForeignKey("users.id"))
    direction = Column(String)  # 'right', 'left', 'super'
    created_at = Column(DateTime, default=datetime.utcnow)

# backend/app/api/swipes.py
@router.post("/api/swipes")
async def create_swipe(swipe: SwipeCreate):
    # Save swipe
    # Check if mutual right swipe → create match!
    pass

# Tasks:
[ ] Create Swipe model + migration
[ ] Build POST /api/swipes
[ ] Implement mutual match detection
[ ] Create Match model
[ ] Trigger notification on match
```

#### Day 5-7: Swipe Frontend
```bash
# Tasks:
[ ] Create swipe card component
[ ] Add Tinder-like animations
[ ] Implement swipe gestures
[ ] Add like/pass/super buttons
[ ] Connect to API
[ ] Show "It's a Match!" modal
```

---

### 🗓️ Week 7: Real-time Chat

#### Day 1-4: Chat Backend
```python
# backend/app/models/message.py
class Message(Base):
    __tablename__ = "messages"

    id = Column(UUID, primary_key=True)
    match_id = Column(UUID, ForeignKey("matches.id"))
    sender_id = Column(UUID, ForeignKey("users.id"))
    content = Column(String, nullable=False)
    read_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

# backend/app/websocket/chat.py
from fastapi import WebSocket

@router.websocket("/ws/chat/{match_id}")
async def chat_endpoint(websocket: WebSocket, match_id: str):
    await websocket.accept()
    # Handle incoming messages
    # Broadcast to both users
    pass

# Tasks:
[ ] Create Message model + migration
[ ] Build WebSocket endpoint
[ ] Implement message broadcast
[ ] Add typing indicator
[ ] Add read receipt
```

#### Day 5-7: Chat Frontend
```bash
# Tasks:
[ ] Create chat list page
[ ] Create individual chat view
[ ] Implement WebSocket connection
[ ] Add message bubbles (sent/received)
[ ] Show typing indicator
[ ] Show read receipts
[ ] Handle reconnect
```

---

### 🗓️ Week 8: Search & Discovery

#### Day 1-4: Search API
```python
# backend/app/api/search.py
@router.get("/api/search")
async def search_profiles(
    city: Optional[str] = None,
    min_budget: Optional[int] = None,
    max_budget: Optional[int] = None,
    smoking: Optional[str] = None,
    limit: int = 20
):
    # Build query with filters
    # Return paginated results
    pass

# Tasks:
[ ] Build search endpoint with filters
[ ] Add proper indexing to DB
[ ] Add pagination
[ ] Add caching
[ ] Document API with Swagger
```

#### Day 5-7: Search Frontend
```bash
# Tasks:
[ ] Create search page
[ ] Add filter sidebar
[ ] Add city autocomplete
[ ] Create search result cards
[ ] Add empty state
[ ] Add "View Profile" modal
```

---

### 🗓️ Week 9: Safety Features

#### Day 1-3: Report System
```python
# backend/app/models/report.py
class Report(Base):
    __tablename__ = "reports"

    id = Column(UUID, primary_key=True)
    reporter_id = Column(UUID, ForeignKey("users.id"))
    reported_id = Column(UUID, ForeignKey("users.id"))
    reason = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

# Tasks:
[ ] Create Report model
[ ] Build POST /api/reports
[ ] Build GET /api/admin/reports
[ ] Create admin view for reports
```

#### Day 4-7: Block System
```python
# backend/app/models/block.py
class Block(Base):
    __tablename__ = "blocks"

    blocker_id = Column(UUID, ForeignKey("users.id"))
    blocked_id = Column(UUID, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

# Tasks:
[ ] Create Block model
[ ] Build POST /api/blocks
[ ] Build GET /api/blocks
[ ] Build DELETE /api/blocks/{id}
[ ] Hide blocked users from matching
```

#### Day 5-7: Frontend
```bash
# Tasks:
[ ] Add report button on profiles
[ ] Create report modal
[ ] Add block button
[ ] Create blocked users page
```

---

### 🗓️ Week 10: Notifications

#### Day 1-4: Celery Setup
```python
# backend/app/tasks/celery_app.py
from celery import Celery

celery_app = Celery(
    "roomly",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

# backend/app/tasks/email_tasks.py
@celery_app.task
def send_match_notification(email: str, match_name: str):
    # Send email
    pass

# Tasks:
[ ] Set up Celery + Redis
[ ] Create email templates
[ ] Build send_match_notification task
[ ] Build send_message_notification task
[ ] Build send_welcome_email task
```

#### Day 5-7: In-App Notifications
```bash
# Tasks:
[ ] Create Notification model
[ ] Build GET /api/notifications
[ ] Create notification bell UI
[ ] Create notification center page
[ ] Add mark as read functionality
```

---

### 🗓️ Week 11: Testing & Polish

#### Day 1-3: Testing
```bash
# Tasks:
[ ] Set up pytest
[ ] Write tests for auth endpoints
[ ] Write tests for matching algorithm
[ ] Write tests for swipe logic
[ ] Test WebSocket with manual test
```

#### Day 4-7: Polish
```bash
# Tasks:
[ ] Fix bugs found in testing
[ ] Add loading states
[ ] Add error boundaries
[ ] Optimize images
[ ] Add meta tags for SEO
[ ] Test on mobile devices
```

---

### 🗓️ Week 12: Launch Preparation

#### Day 1-3: Documentation
```bash
# Tasks:
[ ] Write README.md
[ ] Create user guide
[ ] Write Privacy Policy
[ ] Write Terms of Service
[ ] Create FAQ page
```

#### Day 4-7: Deployment
```bash
# Tasks:
[ ] Deploy to Vercel (frontend)
[ ] Deploy to Render (backend)
[ ] Set up production database
[ ] Set up production Redis
[ ] Configure environment variables
[ ] Test production deployment
[ ] Set up error tracking (Sentry)
[ ] Launch! 🎉
```

---

## 📊 Progress Tracker

| Week | Status | Notes |
|------|--------|-------|
| Week 1 | ⬜ Not Started | Project setup |
| Week 2 | ⬜ Not Started | Database & models |
| Week 3 | ⬜ Not Started | Authentication |
| Week 4 | ⬜ Not Started | User profiles |
| Week 5 | ⬜ Not Started | Matching algorithm |
| Week 6 | ⬜ Not Started | Swipe system |
| Week 7 | ⬜ Not Started | Real-time chat |
| Week 8 | ⬜ Not Started | Search & discovery |
| Week 9 | ⬜ Not Started | Safety features |
| Week 10 | ⬜ Not Started | Notifications |
| Week 11 | ⬜ Not Started | Testing & polish |
| Week 12 | ⬜ Not Started | Launch prep |

---

## 💡 MVP Tips

1. **Start Simple**: Don't over-engineer. Get it working first.
2. **Test Early**: Test each feature as you build it.
3. **Deploy Often**: Deploy to staging frequently.
4. **Ask for Feedback**: Show to friends after Week 6.
5. **Stay Focused**: Don't add features outside MVP scope.

---

*Created: July 2026*
*Version: MVP 1.0*
