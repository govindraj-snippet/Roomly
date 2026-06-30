# 🏠 Roomly
## Roommate Matching Platform - MVP

---

## 📖 Documentation

All documentation is located in the **`docs/`** folder:

| Document | Description |
|----------|-------------|
| **[docs/INDEX.md](docs/INDEX.md)** | Documentation index & project overview |
| **[docs/QUICKSTART.md](docs/QUICKSTART.md)** | Get up and running in 30 minutes |
| **[docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md)** | 12-week step-by-step implementation guide |
| **[docs/TECH_STACK.md](docs/TECH_STACK.md)** | Technologies, database schema, API endpoints |

---

## 🎯 What is Roomly?

A roommate matching platform that connects compatible roommates based on:
- 📍 Location preferences (city, area)
- 💰 Budget compatibility
- 🚬 Lifestyle habits (smoking, drinking, food)
- 😴 Sleep schedule
- 🧹 Cleanliness level

**Think: Tinder for roommates with smart compatibility scoring**

---

## 🚀 Quick Start

```bash
# Backend
cd backend && pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend && npm install && npm run dev
```

See **[docs/QUICKSTART.md](docs/QUICKSTART.md)** for detailed setup.

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

## 📅 MVP Roadmap (12 Weeks)

| Week | Focus | Status |
|------|-------|--------|
| 1 | Project Setup & Foundation | 🔴 Not Started |
| 2 | Database & User Models | 🔴 Not Started |
| 3 | Authentication | 🔴 Not Started |
| 4 | User Profiles | 🔴 Not Started |
| 5 | Matching Algorithm | 🔴 Not Started |
| 6 | Swipe System | 🔴 Not Started |
| 7 | Real-time Chat | 🔴 Not Started |
| 8 | Search & Discovery | 🔴 Not Started |
| 9 | Safety Features | 🔴 Not Started |
| 10 | Notifications | 🔴 Not Started |
| 11 | Testing & Polish | 🔴 Not Started |
| 12 | Launch Preparation | 🔴 Not Started |

See **[docs/MVP_ROADMAP.md](docs/MVP_ROADMAP.md)** for detailed week-by-week tasks.

---

## 📂 Project Structure

```
roomly/
├── backend/           # FastAPI application
├── frontend/          # Next.js application
├── docs/              # Documentation
│   ├── INDEX.md
│   ├── QUICKSTART.md
│   ├── MVP_ROADMAP.md
│   └── TECH_STACK.md
└── README.md
```

---

## 🎯 MVP Features

- ✅ Email + Google OAuth authentication
- ✅ User profiles with photo uploads
- ✅ Multi-step preference form
- ✅ Smart compatibility matching (0-100 score)
- ✅ Swipe interface (right/left/super)
- ✅ Real-time WebSocket chat
- ✅ Search with filters
- ✅ Report & block system

---

## 💡 Getting Started

1. Read the [Quick Start Guide](docs/QUICKSTART.md) to set up your environment
2. Follow the [MVP Roadmap](docs/MVP_ROADMAP.md) week by week
3. Reference [Tech Stack](docs/TECH_STACK.md) for implementation details

---

## 📞 Support

- 📖 Check the `docs/` folder first
- 🐛 Open an issue on GitHub
- 📧 Contact: [your-email@example.com]

---

*Created: July 2026*
*Status: In Development - MVP Phase*
