# DevForge AI

DevForge AI is an elite, full-stack AI SaaS platform that dynamically generates complete, production-ready starter project repositories powered by the **Groq AI API (`llama-3.3-70b-versatile`)** and a fast **FastAPI** backend orchestrator paired with a modern, dark-themed **React + JavaScript** frontend.

---

## Key Highlights

- **Groq AI Integration**: Powered by the official `groq` SDK and `llama-3.3-70b-versatile` model for lightning-fast structured JSON project generation.
- **100% React + JavaScript**: Pure React + JS (`.jsx`/`.js`) stack with zero TypeScript dependencies.
- **Bespoke Design System**: Inspired by Linear, Vercel, Raycast, and Cursor with soft glassmorphism, Google Fonts (`Space Grotesk` & `Inter`), and Framer Motion micro-interactions.
- **Complete Repositories**: Generates complete project file structures including source code, Dockerfiles, `docker-compose.yml`, `README.md`, `.gitignore`, and config files.
- **Project History & Stats**: Persisted project metadata, interactive code tree explorer, architecture breakdown, and one-click ZIP downloads.

---

## Architecture Flow

```text
Frontend (React + JS + Framer Motion)
  ↓
REST API Request (X-Groq-Api-Key Header)
  ↓
FastAPI Orchestrator
  ↓
Groq AI Service (llama-3.3-70b-versatile)
  ↓
Structured JSON Response Parser
  ↓
Disk Storage Service & ZIP Packaging
  ↓
PostgreSQL Metadata Tracking
  ↓
ZIP Download & Interactive Code Preview
```

---

## Quick Start

### 1. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql://... (or sqlite:///./devforge.db)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend will run at `http://localhost:8000`. API docs available at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`.

---

## Environment Variables

| Variable | Description |
| --- | --- |
| `GROQ_API_KEY` | Groq API Key obtained from [Groq Console](https://console.groq.com/keys) |
| `GROQ_MODEL` | Default model: `llama-3.3-70b-versatile` |
| `DATABASE_URL` | PostgreSQL or SQLite database connection URL |
| `SECRET_KEY` | JWT Secret Key for authentication |

---

## Tech Stack

### Frontend
- React 19
- Vite
- JavaScript (JSX / ES6+)
- Vanilla CSS Design System with CSS Custom Variables
- Google Fonts (`Space Grotesk` + `Inter`)
- Framer Motion
- Lucide React Icons
- Axios

### Backend
- FastAPI
- Groq Python SDK (`groq`)
- Python 3.10+
- SQLAlchemy
- PostgreSQL / Neon DB
- Uvicorn
- Pydantic v2 & Pydantic Settings

---

## License

MIT License
