# 🏠 Roomly
## Roommate Matching Platform - MVP

---

## 🎯 What is Roomly?

A roommate matching platform that connects compatible roommates based on:
- 📍 Location preferences (city, area)
- 💰 Budget compatibility
- 🚬 Lifestyle habits (smoking, drinking, food)
- 😴 Sleep schedule
- 🧹 Cleanliness level

**Core Philosophy: "Can I Live With This Person?"**

This is **NOT** a dating app. Roomly focuses on practical roommate compatibility through smart discovery actions:
- **💚 Connect** — "I could live with this person" (signals interest)
- **📝 Shortlist** — "Save for later consideration" (no notification sent)
- **➡️ Pass** — "Not a match for me" (won't show again)
- **⭐ Super Match** — "Highly compatible!" (strong interest signal)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [**Phase Roadmap**](docs/PHASE_ROADMAP.md) ⭐ | **Phase-wise implementation guide (START HERE)** |
| [Quick Start](docs/QUICKSTART.md) | Get up and running in 30 minutes |
| [MVP Roadmap](docs/MVP_ROADMAP.md) | Detailed 12-week implementation plan |
| [Tech Stack](docs/TECH_STACK.md) | Technologies, database schema, API endpoints |

---

## 🚀 Quick Start

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

See [Quick Start Guide](docs/QUICKSTART.md) for detailed setup.

---

## 🛠️ Tech Stack

### Backend (Python)
- **FastAPI** - Modern async web framework
- **SQLAlchemy 2.0** - Async ORM
- **PostgreSQL** - Database
- **Redis** - Caching & sessions
- **Celery** - Background tasks

### Frontend (JavaScript)
- **Next.js 14** - React framework
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **TanStack Query** - API state management

---

## 📅 Implementation Roadmap (12 Weeks)

### Phase 1: Foundation (Weeks 1-3)
Project setup, database, authentication

### Phase 2: User Data & Matching (Weeks 4-5)
User profiles, preferences, compatibility algorithm

### Phase 3: Core Features (Weeks 6-8)
Discovery system, real-time chat, search

### Phase 4: Polish & Launch (Weeks 9-12)
Safety features, testing, deployment

**📖 See [Phase Roadmap](docs/PHASE_ROADMAP.md) for detailed task breakdown**

---

## 📊 Current Status

| Phase | Status | Weeks |
|-------|--------|-------|
| Phase 1: Foundation | ⬜ Not Started | Weeks 1-3 |
| Phase 2: User Data & Matching | ⬜ Not Started | Weeks 4-5 |
| Phase 3: Core Features | ⬜ Not Started | Weeks 6-8 |
| Phase 4: Polish & Launch | ⬜ Not Started | Weeks 9-12 |

---

## 🎯 MVP Features

- ✅ Email + Google OAuth authentication
- ✅ User profiles with photo uploads
- ✅ Multi-step preference form
- ✅ Smart compatibility matching (0-100 score)
- ✅ Discovery System (Connect/Shortlist/Pass/Super Match)
- ✅ Real-time WebSocket chat
- ✅ Search with filters
- ✅ Report & block system

---

## 💡 Getting Started

1. Read the [Phase Roadmap](docs/PHASE_ROADMAP.md) for implementation guidance
2. Follow the [Quick Start Guide](docs/QUICKSTART.md) to set up your environment
3. Reference [Tech Stack](docs/TECH_STACK.md) for implementation details

---

## 📂 Project Structure

```
roomly/
├── backend/           # FastAPI application
├── frontend/          # Next.js application
├── docs/              # Documentation
│   ├── INDEX.md       # Documentation index
│   ├── QUICKSTART.md  # Setup guide
│   ├── PHASE_ROADMAP.md  # Phase-wise implementation (⭐ START HERE)
│   ├── MVP_ROADMAP.md # Detailed week-by-week plan
│   └── TECH_STACK.md # Tech details & API
└── README.md          # This file
```

---

## 📞 Support

- 📖 Check the `docs/` folder first
- 🐛 Open an issue on GitHub
- 📧 Follow the Phase Roadmap for step-by-step implementation

---

*Created: July 2026*
*Status: In Development - MVP Phase*
