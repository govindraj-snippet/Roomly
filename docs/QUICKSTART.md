# 🚀 Roomly Quick Start Guide
## Get up and running in 30 minutes

---

## Prerequisites

- **Python 3.11+** installed
- **Node.js 20+** and npm installed
- **Git** installed
- A code editor (VS Code recommended)

---

## Step 1: Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/roomly.git
cd roomly

# Create virtual environment (backend)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Go back to root
cd ..
```

---

## Step 2: Database Setup

### Option A: Neon (Recommended - Free)

```bash
# 1. Go to https://neon.tech and sign up (free)
# 2. Create a new project
# 3. Copy the connection string
```

### Option B: Local PostgreSQL

```bash
# Install PostgreSQL locally
# On Windows: Download from postgresql.org
# On Mac: brew install postgresql
# On Linux: sudo apt install postgresql

# Create database
createdb roomly

# Connection string will be:
# postgresql+asyncpg://localhost:5432/roomly
```

---

## Step 3: Backend Configuration

```bash
cd backend

# Create .env file
cp .env.example .env

# Edit .env with your values:
DATABASE_URL=postgresql+asyncpg://user:pass@host/roomly
SECRET_KEY=your-random-secret-key-here
REDIS_URL=redis://localhost:6379/0
```

### Run Migrations

```bash
# Initialize Alembic (first time only)
alembic init alembic

# Edit alembic.ini to set your database URL
# sqlalchemy.url = postgresql+asyncpg://...

# Run migrations
alembic upgrade head
```

### Start Backend

```bash
# Run the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# API will be available at:
# http://localhost:8000
# http://localhost:8000/docs (Swagger UI)
```

---

## Step 4: Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.local.example .env.local

# Edit .env.local:
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

### Start Frontend

```bash
npm run dev

# App will be available at:
# http://localhost:3000
```

---

## Step 5: Verify Setup

### Backend Check
```bash
# Visit http://localhost:8000/docs
# You should see FastAPI's Swagger UI

# Test health endpoint
curl http://localhost:8000/health
# Response: {"status": "healthy"}
```

### Frontend Check
```bash
# Visit http://localhost:3000
# You should see the Roomly landing page
```

---

## Common Issues

### Issue: "Module not found"
```bash
# Make sure you're in the backend directory
cd backend
pip install -r requirements.txt
```

### Issue: Database connection error
```bash
# Verify DATABASE_URL in .env
# Check if PostgreSQL is running
# For Neon: ensure you copied the correct connection string
```

### Issue: Port already in use
```bash
# Kill process on port 8000
# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

---

## Development Tips

1. **Hot Reload**: Both FastAPI (`--reload`) and Next.js (`npm run dev`) auto-reload on file changes
2. **API Docs**: Always check http://localhost:8000/docs for API documentation
3. **Database**: Use Alembic migrations, never modify DB directly
4. **Testing**: Run `pytest` in backend to run tests

---

## Next Steps

1. Read the full [MVP Roadmap](MVP_ROADMAP.md)
2. Check the [Tech Stack](TECH_STACK.md)
3. Start implementing Week 1 tasks!

---

*Created: July 2026*
