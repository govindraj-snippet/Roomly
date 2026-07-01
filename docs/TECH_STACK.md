# 🛠️ Roomly Tech Stack
## MVP Implementation

---

## Backend (Python)

### Core Framework
```bash
FastAPI==0.110.0          # Modern, fast web framework
uvicorn[standard]==0.27.0  # ASGI server
pydantic==2.6.1           # Data validation
pydantic-settings==2.1.0  # Settings management
```

### Database
```bash
sqlalchemy==2.0.25        # ORM (async support)
asyncpg==0.29.0           # PostgreSQL async driver
alembic==1.13.1           # Database migrations
```

### Authentication
```bash
python-jose[cryptography]==3.3.0  # JWT handling
passlib[bcrypt]==1.7.4           # Password hashing
python-multipart==0.0.9         # Form data
```

### Cache & Tasks
```bash
redis==5.0.1              # Caching & sessions
celery==5.3.6             # Background tasks
```

### Utilities
```bash
python-dotenv==1.0.1      # Environment variables
httpx==0.26.0              # HTTP client (testing)
aiohttp==3.9.3             # Async HTTP
boto3==1.34.49             # AWS S3
```

### Email
```bash
sendgrid==6.11.0          # Transactional email
```

### Development
```bash
pytest==8.0.0             # Testing
pytest-asyncio==0.23.4    # Async tests
black==24.1.1              # Code formatter
ruff==0.1.14              # Fast linter
```

---

## Frontend (JavaScript/TypeScript)

### Core
```json
{
  "next": "14.1.0",
  "react": "^18.2.0",
  "typescript": "^5.3.3"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.1",
  "@radix-ui/react-*": "latest",  // shadcn/ui components
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

### Data & State
```json
{
  "@tanstack/react-query": "^5.17.0",
  "axios": "^1.6.5",
  "zustand": "^4.5.0"
}
```

### Forms
```json
{
  "react-hook-form": "^7.49.3",
  "zod": "^3.22.4",
  "@hookform/resolvers": "^3.3.4"
}
```

### Real-time
```json
{
  "socket.io-client": "^4.6.0"
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    bio TEXT,
    profile_image_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

### Preferences Table
```sql
CREATE TABLE preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Location
    preferred_city VARCHAR(100) NOT NULL,
    preferred_areas TEXT[],
    min_rent_budget INTEGER,
    max_rent_budget INTEGER,

    -- Room
    room_type VARCHAR(20),

    -- Lifestyle
    smoking_preference VARCHAR(20),
    drinking_preference VARCHAR(20),
    dietary_preference VARCHAR(50),

    -- Schedule
    sleep_schedule VARCHAR(20),

    -- Cleanliness
    cleanliness_level INTEGER CHECK (cleanliness_level BETWEEN 1 AND 5),

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_preferences_city ON preferences(preferred_city);
CREATE INDEX idx_preferences_user ON preferences(user_id);
```

### Discovery Actions Table
```sql
-- Replaces "swipes" with roommate-focused discovery actions
CREATE TABLE discovery_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    target_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action_type VARCHAR(20) NOT NULL CHECK (action_type IN ('connect', 'shortlist', 'pass', 'super_match')),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(actor_id, target_id)
);

CREATE INDEX idx_discovery_actor ON discovery_actions(actor_id);
CREATE INDEX idx_discovery_action ON discovery_actions(action_type);

-- Shortlists table (saved users for later)
CREATE TABLE shortlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    saved_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, saved_user_id)
);

### Matches Table
```sql
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
    compatibility_score INTEGER CHECK (compatibility_score BETWEEN 0 AND 100),
    match_type VARCHAR(30) DEFAULT 'mutual_connect',
    -- Options: 'mutual_connect', 'super_match', 'chat_request', 'accepted', 'declined'
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user1_id, user2_id)
);

CREATE INDEX idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX idx_matches_status ON matches(status);

### Messages Table
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_match ON messages(match_id, created_at DESC);
```

### Reports Table
```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reported_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reason VARCHAR(50),
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Blocks Table
```sql
CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    blocked_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(blocker_id, blocked_id)
);
```

---

## Project Structure

```
roomly/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app
│   │   ├── core/
│   │   │   ├── config.py           # Settings
│   │   │   ├── security.py         # Auth utils
│   │   │   └── deps.py             # Dependencies
│   │   ├── db/
│   │   │   ├── base.py             # Base model
│   │   │   ├── session.py          # DB session
│   │   │   └── models/
│   │   │       ├── __init__.py
│   │   │       ├── user.py
│   │   │       ├── preference.py
│   │   │       ├── discovery.py       # Discovery actions (connect, shortlist, pass)
│   │   │       ├── match.py
│   │   │       ├── message.py
│   │   │       ├── report.py
│   │   │       └── block.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── preference.py
│   │   │   └── common.py
│   │   ├── api/
│   │   │   ├── deps.py
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── preferences.py
│   │   │   ├── discovery.py        # Connect, shortlist, pass, super-match
│   │   │   ├── matches.py
│   │   │   └── messages.py
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── matching_service.py
│   │   │   └── notification_service.py
│   │   ├── tasks/
│   │   │   ├── celery_app.py
│   │   │   └── email_tasks.py
│   │   └── websocket/
│   │       └── chat.py
│   ├── tests/
│   ├── alembic/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── dashboard/
│   │   │   ├── discovery/         # Roommate discovery (Connect/Shortlist/Pass)
│   │   │   ├── shortlists/        # Saved profiles
│   │   │   ├── matches/           # Mutual connections
│   │   │   ├── chat/
│   │   │   ├── search/
│   │   │   └── profile/
│   │   ├── components/
│   │   │   ├── ui/               # shadcn components
│   │   │   ├── auth/
│   │   │   ├── discovery/        # Discovery card, action buttons
│   │   │   ├── shortlist/        # Shortlist management
│   │   │   └── chat/
│   │   ├── lib/
│   │   │   ├── api.ts       # API client
│   │   │   ├── auth.ts      # Auth utilities
│   │   │   └── utils.ts
│   │   └── styles/
│   └── package.json
│
├── docs/
│   ├── MVP_ROADMAP.md
│   ├── TECH_STACK.md
│   └── API.md
│
└── README.md
```

---

## Environment Variables

### Backend (.env.example)
```bash
# Database
DATABASE_URL=postgresql+asyncpg://user:pass@host/dbname

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
SENDGRID_API_KEY=your-sendgrid-key
FROM_EMAIL=noreply@roomly.com

# S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=roomly-uploads
AWS_REGION=us-east-1

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local.example)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

---

## API Endpoints

### Authentication
```
POST /api/auth/register     - Register new user
POST /api/auth/login        - Login user
POST /api/auth/refresh      - Refresh token
POST /api/auth/google       - Google OAuth
GET  /api/auth/me           - Get current user
```

### Users
```
GET    /api/users/me        - Get my profile
PUT    /api/users/me        - Update my profile
POST   /api/users/avatar    - Upload avatar
```

### Preferences
```
POST   /api/preferences     - Create preferences
GET    /api/preferences/me   - Get my preferences
PUT    /api/preferences     - Update preferences
```

### Matches
```
GET    /api/matches         - Get compatible users
GET    /api/matches/:id     - Get match details
```

### Discovery (Roommate Finding)
```
POST   /api/discovery/connect         - Connect with user (signals interest)
POST   /api/discovery/shortlist       - Save user to shortlist
POST   /api/discovery/pass            - Pass on user (won't show again)
POST   /api/discovery/super-match     - Strong interest signal
POST   /api/discovery/request-chat    - One-time chat request
GET    /api/discovery/my-shortlists   - Get saved users
GET    /api/discovery/my-connections  - Get pending connections
```

### Chat
```
WS     /ws/chat/:match_id   - WebSocket connection
GET    /api/messages/:match - Get message history
POST   /api/messages        - Send message (REST fallback)
```

### Search
```
GET    /api/search          - Search users with filters
```

### Safety
```
POST   /api/reports         - Report user
POST   /api/blocks          - Block user
GET    /api/blocks/me       - Get my blocked users
DELETE /api/blocks/:id      - Unblock user
```

---

*Created: July 2026*
