# 📚 Roomly Documentation

Welcome to the Roomly documentation. This project is a roommate matching platform MVP built with FastAPI (Python) and Next.js (React).

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [**Quick Start**](QUICKSTART.md) | Get up and running in 30 minutes |
| [**Phase Roadmap**](PHASE_ROADMAP.md) ⭐ | **Phase-wise implementation guide (RECOMMENDED)** |
| [**MVP Roadmap**](MVP_ROADMAP.md) | Detailed 12-week implementation plan |
| [**Tech Stack**](TECH_STACK.md) | Technologies, database schema, API endpoints |

---

## 🚀 Quick Links

- [GitHub Repository](https://github.com/yourusername/roomly)
- [API Documentation](http://localhost:8000/docs) (when running)
- [Frontend Application](http://localhost:3000) (when running)

---

## 📋 Project Overview

**Roomly** is a roommate matching platform that connects compatible roommates based on lifestyle preferences, habits, budget, and location requirements.

### Core Philosophy: "Can I Live With This Person?"

**Not a dating app** — Roomly focuses on practical roommate compatibility through:
- **Connect** — "I could live with this person"
- **Shortlist** — "Save for later consideration"
- **Pass** — "Not a match for me"
- **Super Match** — "Highly compatible!"

### MVP Features
- ✅ User registration (email + Google OAuth)
- ✅ User profiles with preferences
- ✅ Smart compatibility algorithm (0-100 score)
- ✅ **Discovery System** (Connect/Shortlist/Pass/Super Match)
- ✅ Real-time chat between mutual connections
- ✅ Search with filters
- ✅ Report & block system

### Tech Stack
- **Backend**: FastAPI + PostgreSQL + Redis + Celery
- **Frontend**: Next.js 14 + shadcn/ui + Tailwind CSS
- **Infrastructure**: Vercel + Render (MVP hosting)

---

## 🎯 Current Status

| Phase | Status | Completion |
|-------|--------|------------|
| **Phase 1** | ✅ Completed | Foundation (Weeks 1-3) |
| Phase 2 | 🔴 Not Started | User Data & Matching (Weeks 4-5) |
| Phase 3 | 🔴 Not Started | Core Features (Weeks 6-8) |
| Phase 4 | 🔴 Not Started | Polish & Launch (Weeks 9-12) |

---

## 🛠️ Development Setup

See [Quick Start Guide](QUICKSTART.md) for detailed setup instructions.

```bash
# Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend && npm install
npm run dev
```

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the MVP Roadmap for implementation details
- Review the Tech Stack for configuration

---

*Last Updated: July 2026*
