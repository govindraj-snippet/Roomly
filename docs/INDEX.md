# 📚 Roomly Documentation

Welcome to the Roomly documentation. This project is a roommate matching platform MVP built with FastAPI (Python) and Next.js (React).

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [**Quick Start**](QUICKSTART.md) | Get up and running in 30 minutes |
| [**MVP Roadmap**](MVP_ROADMAP.md) | 12-week implementation plan |
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

| Week | Status | Completion |
|------|--------|------------|
| Week 1 | 🔴 Not Started | Project Setup |
| Week 2 | 🔴 Not Started | Database & Models |
| Week 3 | 🔴 Not Started | Authentication |
| Week 4 | 🔴 Not Started | User Profiles |
| Week 5 | 🔴 Not Started | Compatibility Algorithm |
| Week 6 | 🔴 Not Started | Discovery System |
| Week 7 | 🔴 Not Started | Real-time Chat |
| Week 8 | 🔴 Not Started | Search & Discovery |
| Week 9 | 🔴 Not Started | Safety Features |
| Week 10 | 🔴 Not Started | Notifications |
| Week 11 | 🔴 Not Started | Testing & Polish |
| Week 12 | 🔴 Not Started | Launch Prep |

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
