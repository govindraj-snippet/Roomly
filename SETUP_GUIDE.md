# 🚀 Phase 1 Complete - Quick Setup Guide

Phase 1 (Foundation) has been implemented! Here's how to run the application.

---

## 📋 What's Been Implemented

### ✅ Backend (FastAPI)
- Project structure with organized modules
- User model with authentication fields
- JWT-based authentication system
- API endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/users/me`
- Database models and Alembic migrations setup
- CORS configuration
- Environment-based configuration

### ✅ Frontend (Next.js 14)
- React 18 with TypeScript
- Tailwind CSS for styling
- shadcn/ui components (Button, Input, Label, Card)
- Authentication pages (Login, Register)
- Protected dashboard page
- API client with axios and token refresh
- JWT token management in localStorage

---

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL (or use Neon/Railway for free cloud database)

---

## 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
copy .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql+asyncpg://user:password@host:5432/roomly

# Run migrations (requires database to be set up)
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload
```

Backend will run on: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

---

## 2. Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
copy .env.local.example .env.local

# Start the frontend
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## 3. Database Setup (Quick Options)

### Option A: Neon (Free Cloud PostgreSQL) - Recommended
1. Go to [neon.tech](https://neon.tech) and sign up (free)
2. Create a new project
3. Copy the connection string
4. Update `backend/.env`:
   ```
   DATABASE_URL=postgresql+asyncpg://<your-neon-connection-string>
   ```

### Option B: Local PostgreSQL
```bash
# Install PostgreSQL locally, then:
createdb roomly

# Update backend/.env:
DATABASE_URL=postgresql+asyncpg://localhost:5432/roomly

# Run migrations
cd backend
alembic upgrade head
```

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
pytest tests/

# Run specific test file
pytest tests/test_auth.py
```

---

## 📱 Using the Application

1. Open http://localhost:3000
2. Click "Sign Up"
3. Fill in the registration form
4. You'll be automatically logged in and redirected to dashboard
5. Click "Logout" to test login flow

---

## 🔍 Troubleshooting

### Backend Issues

**Problem**: `Module not found`
```bash
# Make sure venv is activated
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem**: Database connection error
- Verify DATABASE_URL in `backend/.env`
- Ensure PostgreSQL is running
- Test connection: `psql -h host -U user -d dbname`

### Frontend Issues

**Problem**: Port already in use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**Problem**: Module errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📂 Project Structure

```
Roomly/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints (auth, users)
│   │   ├── core/         # Config, security
│   │   ├── db/           # Database session, base models
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── main.py       # FastAPI app
│   ├── alembic/          # Database migrations
│   ├── tests/            # Test files
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js pages (login, register, dashboard)
│   │   ├── components/   # React components (ui, auth)
│   │   ├── lib/          # API client, auth utils
│   │   └── styles/       # Global CSS
│   └── package.json
│
└── docs/                 # Documentation
```

---

## 🎯 Next Steps (Phase 2)

Phase 1 is complete! The next phase involves:

1. **Preference Model** - Store user lifestyle preferences
2. **Profile Management** - Allow users to update their profiles
3. **Matching Algorithm** - Calculate compatibility scores

See `docs/PHASE_ROADMAP.md` for the complete implementation plan.

---

## 📝 Notes

- JWT tokens are stored in localStorage (use HttpOnly cookies in production)
- Google OAuth placeholder exists but not implemented yet
- Email verification is marked but not sent
- All endpoints support CORS for development

---

*Phase 1 implementation completed on July 2026*
