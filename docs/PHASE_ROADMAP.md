# 🎯 Roomly Phase-wise Implementation Roadmap
## MVP - 12 Weeks | 4 Phases

---

## 📊 Phase Overview

| Phase | Duration | Focus | Deliverable | Status |
|-------|----------|-------|-------------|--------|
| **Phase 1** | Weeks 1-3 | Foundation | Working auth system + database setup ready | ✅ **Completed** |
| **Phase 2** | Weeks 4-5 | User Data & Matching | Complete user profiles + compatibility algorithm | ⬜ Not Started |
| **Phase 3** | Weeks 6-8 | Core Features | Discovery system + Chat + Search | ⬜ Not Started |
| **Phase 4** | Weeks 9-12 | Polish & Launch | Safety features + Testing + Deployment | ⬜ Not Started |

---

## 🏗️ PHASE 1: Foundation (Weeks 1-3)
**Goal**: Set up project infrastructure and implement authentication

### Week 1: Project Setup
- [ ] **Backend Setup**
  - [ ] Create `backend/` directory structure
  - [ ] Initialize FastAPI project with `app/main.py`
  - [ ] Configure CORS middleware
  - [ ] Set up `core/config.py` for environment variables
  - [ ] Create `requirements.txt` with all dependencies
  - [ ] Test `/health` endpoint works
- [ ] **Frontend Setup**
  - [ ] Create Next.js 14 project in `frontend/`
  - [ ] Install shadcn/ui components
  - [ ] Configure Tailwind CSS
  - [ ] Set up TanStack Query for API calls
  - [ ] Create basic layout structure
  - [ ] Test app runs on `localhost:3000`
- [ ] **Infrastructure**
  - [ ] Set up PostgreSQL database (Neon/Railway)
  - [ ] Set up Redis (Upstash/local)
  - [ ] Create `.env` files for both frontend and backend
  - [ ] Initialize Git repository with proper `.gitignore`
  - [ ] Set up GitHub repository

### Week 2: Database & Models
- [ ] **Database Configuration**
  - [ ] Install SQLAlchemy 2.0 + asyncpg
  - [ ] Set up Alembic for migrations
  - [ ] Create database connection factory
  - [ ] Test database connection
- [ ] **User Model**
  - [ ] Create `User` model with fields:
    - [ ] `id` (UUID, primary key)
    - [ ] `email` (unique, indexed)
    - [ ] `password_hash`
    - [ ] `name`
    - [ ] `phone` (unique)
    - [ ] `bio`
    - [ ] `profile_image_url`
    - [ ] `is_verified`
    - [ ] `created_at`, `updated_at`
  - [ ] Create first Alembic migration
  - [ ] Run migration and verify table creation
- [ ] **Base API Structure**
  - [ ] Create `api/deps.py` for dependency injection
  - [ ] Create `schemas/common.py` for common schemas
  - [ ] Set up API router structure

### Week 3: Authentication System
- [ ] **Backend Auth**
  - [ ] Install `passlib`, `python-jose`, `python-multipart`
  - [ ] Create `core/security.py` for JWT utilities
  - [ ] Implement password hashing
  - [ ] Create `POST /api/auth/register` endpoint
  - [ ] Create `POST /api/auth/login` endpoint
  - [ ] Add Google OAuth support (`POST /api/auth/google`)
  - [ ] Create `GET /api/auth/me` for current user
  - [ ] Add token refresh mechanism
- [ ] **Frontend Auth**
  - [ ] Create login page (`/login`)
  - [ ] Create register page (`/register`)
  - [ ] Add form validation with Zod
  - [ ] Implement JWT storage (HttpOnly cookies)
  - [ ] Create protected route middleware
  - [ ] Add auth context/provider
- [ ] **Testing**
  - [ ] Test registration flow end-to-end
  - [ ] Test login flow end-to-end
  - [ ] Test protected routes with valid/invalid tokens

### 🔴 Phase 1 Exit Criteria
- ✅ Backend server runs on port 8000
- ✅ Frontend runs on port 3000
- ✅ User can register with email/password
- ✅ User can login and receive JWT
- ✅ Protected routes require authentication
- ✅ Database migrations work end-to-end

---

## 👤 PHASE 2: User Data & Matching (Weeks 4-5)
**Goal**: Capture user preferences and implement compatibility scoring

### Week 4: User Profiles & Preferences
- [ ] **Backend - Preferences Model**
  - [ ] Create `Preference` model with fields:
    - [ ] Location: `preferred_city`, `preferred_areas` (array)
    - [ ] Budget: `min_rent_budget`, `max_rent_budget`
    - [ ] Room: `room_type`
    - [ ] Lifestyle: `smoking_preference`, `drinking_preference`, `dietary_preference`
    - [ ] Schedule: `sleep_schedule`, `work_pattern`
    - [ ] Cleanliness: `cleanliness_level` (1-5)
    - [ ] Guests: `guest_preference`
    - [ ] `created_at`, `updated_at`
  - [ ] Create migration for preferences table
- [ ] **Backend - Profile API**
  - [ ] Create `POST /api/preferences` endpoint
  - [ ] Create `GET /api/preferences/me` endpoint
  - [ ] Create `PUT /api/preferences` endpoint
  - [ ] Create `PUT /api/users/me` for profile updates
  - [ ] Add photo upload endpoint (`POST /api/users/avatar`)
- [ ] **Frontend - Profile Setup**
  - [ ] Create multi-step preference form (5 steps):
    - [ ] Step 1: Location & Budget
    - [ ] Step 2: Room Requirements
    - [ ] Step 3: Daily Habits (sleep, work, guests)
    - [ ] Step 4: Lifestyle (smoking, drinking, food)
    - [ ] Step 5: Cleanliness & Deal-breakers
  - [ ] Add "Why we ask this" tooltips for each question
  - [ ] Implement form draft saving (localStorage)
  - [ ] Create profile edit page
  - [ ] Add photo upload with preview

### Week 5: Compatibility Algorithm
- [ ] **Matching Service**
  - [ ] Create `services/matching_service.py`
  - [ ] Implement `calculate_compatibility_score(user1, user2)`:
    - [ ] Location scoring (25 points)
    - [ ] Budget compatibility (20 points)
    - [ ] Habit compatibility (35 points)
    - [ ] Cleanliness matching (20 points)
  - [ ] Implement `get_compatibility_factors()` for detailed breakdown
  - [ ] Add caching for match calculations (Redis)
  - [ ] Write unit tests for algorithm
- [ ] **Match API**
  - [ ] Create `GET /api/matches` endpoint
    - [ ] Filter by city, budget range
    - [ ] Exclude blocked/passed users
    - [ ] Sort by compatibility score
    - [ ] Pagination (limit 20, offset)
  - [ ] Add Redis caching (5 min TTL)
- [ ] **Testing**
  - [ ] Test scoring with sample users
  - [ ] Verify edge cases (empty preferences, partial matches)
  - [ ] Performance test (100+ users)

### 🔴 Phase 2 Exit Criteria
- ✅ Users can complete full preference form
- ✅ Profile photos upload successfully
- ✅ Compatibility algorithm returns 0-100 scores
- ✅ `/api/matches` returns sorted compatible users
- ✅ Preference data persists in database

---

## 💬 PHASE 3: Core Features (Weeks 6-8)
**Goal**: Discovery mechanics, real-time chat, and search

### Week 6: Discovery System
- [ ] **Backend - Discovery Models**
  - [ ] Create `DiscoveryAction` model:
    - [ ] `actor_id`, `target_id`
    - [ ] `action_type` ('connect', 'shortlist', 'pass', 'super_match')
    - [ ] Unique constraint on (actor_id, target_id)
  - [ ] Create `Match` model:
    - [ ] `user1_id`, `user2_id`
    - [ ] `compatibility_score`
    - [ ] `match_type` ('mutual_connect', 'super_match', 'chat_request')
    - [ ] `status` ('pending', 'accepted', 'declined')
- [ ] **Backend - Discovery API**
  - [ ] `POST /api/discovery/connect` → Check mutual, create match if exists
  - [ ] `POST /api/discovery/shortlist` → Save for later
  - [ ] `POST /api/discovery/pass` → Hide from future discovery
  - [ ] `POST /api/discovery/super-match` → Strong interest signal
  - [ ] `POST /api/discovery/request-chat` → One-time reach-out
  - [ ] `GET /api/discovery/my-shortlists`
  - [ ] `GET /api/discovery/my-connections`
  - [ ] Add notification triggers for each action
- [ ] **Frontend - Discovery UI**
  - [ ] Create discovery card component with:
    - [ ] Profile photo, name, age, profession
    - [ ] Location tags
    - [ ] Compatibility score (prominent)
    - [ ] Key compatibility factors
  - [ ] Add action buttons: Connect, Shortlist, Pass, Super Match
  - [ ] Implement card stack navigation
  - [ ] Create shortlist management page
  - [ ] Add "New Match!" modal
  - [ ] Add smooth transitions

### Week 7: Real-time Chat
- [ ] **Backend - Chat System**
  - [ ] Create `Message` model:
    - [ ] `match_id`, `sender_id`, `content`
    - [ ] `read_at`, `created_at`
  - [ ] Create WebSocket endpoint `/ws/chat/{match_id}`
  - [ ] Implement message broadcast to both users
  - [ ] Add typing indicator
  - [ ] Add read receipt functionality
  - [ ] Handle connection/reconnection logic
- [ ] **Backend - Chat API**
  - [ ] `GET /api/messages/{match_id}` - Message history
  - [ ] `POST /api/messages` - REST fallback
  - [ ] `PUT /api/messages/{id}/read` - Mark as read
- [ ] **Frontend - Chat UI**
  - [ ] Create chat list page (all conversations)
  - [ ] Create individual chat view
  - [ ] Implement WebSocket connection with auto-reconnect
  - [ ] Add message bubbles (sent vs received styling)
  - [ ] Show typing indicator
  - [ ] Show read receipts (✓✓)
  - [ ] Add online status indicator

### Week 8: Search & Discovery
- [ ] **Backend - Search API**
  - [ ] Create `GET /api/search` endpoint with filters:
    - [ ] City
    - [ ] Budget range (min, max)
    - [ ] Smoking preference
    - [ ] Drinking preference
    - [ ] Sleep schedule
    - [ ] Cleanliness level
  - [ ] Add proper database indexes
  - [ ] Implement pagination
  - [ ] Add Redis caching
  - [ ] Document with Swagger
- [ ] **Frontend - Search UI**
  - [ ] Create search page with sidebar filters
  - [ ] Add city autocomplete/dropdown
  - [ ] Create search result cards
  - [ ] Add empty state design
  - [ ] Create "View Profile" modal
  - [ ] Add save to shortlist from search

### 🔴 Phase 3 Exit Criteria
- ✅ Users can Connect/Shortlist/Pass on profiles
- ✅ Mutual Connect creates a match
- ✅ Chat works in real-time via WebSocket
- ✅ Search filters work correctly
- ✅ Shortlists can be managed

---

## 🚀 PHASE 4: Polish & Launch (Weeks 9-12)
**Goal**: Safety features, testing, and production deployment

### Week 9: Safety Features
- [ ] **Report System**
  - [ ] Create `Report` model
  - [ ] `POST /api/reports` endpoint
  - [ ] `GET /api/admin/reports` (admin only)
  - [ ] Add report button on profiles
  - [ ] Create report modal with reason selection
- [ ] **Block System**
  - [ ] Create `Block` model
  - [ ] `POST /api/blocks` endpoint
  - [ ] `GET /api/blocks/me` endpoint
  - [ ] `DELETE /api/blocks/{id}` endpoint
  - [ ] Filter blocked users from matching/search
  - [ ] Add block button on profiles
  - [ ] Create blocked users management page

### Week 10: Notifications
- [ ] **Email Notifications**
  - [ ] Set up Celery + Redis
  - [ ] Configure SendGrid
  - [ ] Create email templates:
    - [ ] Welcome email
    - [ ] New match notification
    - [ ] New message notification
  - [ ] Create background tasks:
    - [ ] `send_match_notification`
    - [ ] `send_message_notification`
    - [ ] `send_welcome_email`
- [ ] **In-App Notifications**
  - [ ] Create `Notification` model
  - [ ] `GET /api/notifications` endpoint
  - [ ] `PUT /api/notifications/{id}/read` endpoint
  - [ ] Create notification bell icon
  - [ ] Create notification center dropdown
  - [ ] Add unread count badge

### Week 11: Testing & Polish
- [ ] **Testing**
  - [ ] Set up pytest
  - [ ] Write tests for auth endpoints
  - [ ] Write tests for matching algorithm
  - [ ] Write tests for discovery actions
  - [ ] Manual WebSocket testing
  - [ ] Fix identified bugs
- [ ] **Polish**
  - [ ] Add loading states for all async actions
  - [ ] Add error boundaries
  - [ ] Optimize images (compression, lazy load)
  - [ ] Add meta tags for SEO
  - [ ] Test on mobile devices (responsive)
  - [ ] Accessibility audit (ARIA labels)

### Week 12: Launch Preparation
- [ ] **Documentation**
  - [ ] Write comprehensive `README.md`
  - [ ] Create user guide
  - [ ] Write Privacy Policy
  - [ ] Write Terms of Service
  - [ ] Create FAQ page
- [ ] **Deployment**
  - [ ] Deploy frontend to Vercel
  - [ ] Deploy backend to Render/Railway
  - [ ] Set up production database
  - [ ] Set up production Redis
  - [ ] Configure all environment variables
  - [ ] Set up error tracking (Sentry)
  - [ ] Run smoke tests on production
  - [ ] Set up analytics (optional)
- [ ] **Launch**
  - [ ] Final testing on production
  - [ ] Prepare launch announcement
  - [ ] LAUNCH! 🎉

### 🔴 Phase 4 Exit Criteria
- ✅ Users can report and block other users
- ✅ Email notifications work
- ✅ In-app notifications work
- ✅ All critical features have tests
- ✅ App is deployed and accessible
- ✅ Legal documents are in place

---

## 📅 Implementation Timeline Visualization

```
Week 1  Week 2  Week 3  Week 4  Week 5  Week 6  Week 7  Week 8  Week 9  Week 10 Week 11 Week 12
|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
├───────────────────────┤                               │
     PHASE 1: Foundation                                  │
     Setup, DB, Auth                                       │
                             ├───────────┤                 │
                              PHASE 2: Matching           │
                              Profiles, Algorithm          │
                                                 ├──────────────┤
                                                  PHASE 3: Core Features
                                                  Discovery, Chat, Search
                                                                      ├──────────────────┤
                                                                       PHASE 4: Launch
                                                                       Safety, Test, Deploy
```

---

## 🔄 Dependencies Between Phases

```
Phase 1 (Foundation)
    │
    ├─── MUST COMPLETE BEFORE ─────┐
    │                              │
    ▼                              ▼
Phase 2 (User Data)          Phase 3 (Discovery/Chat)
    │                              │
    └───── BOTH MUST COMPLETE BEFORE ───┐
                                       │
                                       ▼
                                  Phase 4 (Launch)
```

**Critical Path:**
1. Phase 1 → Phase 2 (Need users before preferences)
2. Phase 2 → Phase 3 (Need preferences before matching/discovery)
3. Phase 3 → Phase 4 (Need features before testing/deployment)

### Parallel Work Opportunities

Within each phase, these can be done in parallel:

**Phase 1:**
- Backend setup AND Frontend setup (independent)
- Database models AND API structure (can start together)

**Phase 2:**
- Preference model AND Preference form (independent teams)
- Matching algorithm AND Match API design

**Phase 3:**
- Discovery backend AND Chat backend (different systems)
- All frontend UI components (independent work)

---

## ✅ Progress Checklist

### Phase 1 Checklist
- [ ] Week 1: Project Setup (12 tasks)
- [ ] Week 2: Database & Models (10 tasks)
- [ ] Week 3: Authentication System (12 tasks)
- [ ] **Exit Criteria Met**

### Phase 2 Checklist
- [ ] Week 4: User Profiles & Preferences (16 tasks)
- [ ] Week 5: Compatibility Algorithm (9 tasks)
- [ ] **Exit Criteria Met**

### Phase 3 Checklist
- [ ] Week 6: Discovery System (17 tasks)
- [ ] Week 7: Real-time Chat (14 tasks)
- [ ] Week 8: Search & Discovery (10 tasks)
- [ ] **Exit Criteria Met**

### Phase 4 Checklist
- [ ] Week 9: Safety Features (12 tasks)
- [ ] Week 10: Notifications (12 tasks)
- [ ] Week 11: Testing & Polish (14 tasks)
- [ ] Week 12: Launch Preparation (16 tasks)
- [ ] **Exit Criteria Met**

---

## 💡 Tips for Success

1. **Don't skip exit criteria** - Each phase builds on the previous
2. **Test as you go** - Don't wait until Week 11 to test
3. **Deploy frequently** - Even to staging, keeps deployment skills fresh
4. **Ask for feedback** - Show to friends after Phase 3
5. **Stay focused** - Resist scope creep during implementation
6. **Document decisions** - Note why you chose specific approaches
7. **Keep it simple** - MVP means minimum viable, not maximum features

---

## 🚨 Risk Areas & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebSocket complexity | Chat might not work reliably | Have REST fallback ready |
| Matching algorithm accuracy | Poor matches frustrate users | Test with real data early |
| OAuth integration | Google login might break | Have email/password fallback |
| Database performance | Slow queries at scale | Add indexes early, test with 1000+ users |
| Deployment issues | Production delays | Deploy to staging weekly |

---

## 📊 Weekly Status Template

Copy this each week to track progress:

```markdown
## Week X Status

**Completed:**
- [ ] Task 1
- [ ] Task 2

**In Progress:**
- [ ] Task 3
- [ ] Task 4

**Blocked:**
- [ ] Task 5 - Reason: ...

**Notes:**
- Any issues encountered
- Decisions made
- Lessons learned
```

---

*Created: July 2026*
*Version: 1.0 - Phase-wise Implementation*
