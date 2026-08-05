# DevForge AI

DevForge AI is a full-stack application that generates complete project repositories using the Groq AI API (`llama-3.3-70b-versatile`), a FastAPI backend, and a React frontend.

## Features

- AI Project Generation: Generates complete starter project file structures and code using Groq AI.
- User Authentication: Secure Login and Signup authentication system with JWT token authorization.
- User-Scoped History: Each authenticated user can view, preview, search, and download their own generated projects.
- React Frontend: Built with React, Vite, and JavaScript.
- FastAPI Backend: Powered by Python, FastAPI, SQLAlchemy, and the official Groq SDK.
- Code Preview & Download: File tree explorer and one-click ZIP download for generated projects.

## Project Structure

- `backend/`: FastAPI application handling authentication, project generation, and database storage.
- `frontend/`: React application providing user interface for generating and exploring projects.

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Groq API Key

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL=sqlite:///./devforge.db
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.3-70b-versatile
   SECRET_KEY=your_jwt_secret_key_here
   ```

5. Start the API server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Environment Variables

| Variable | Description |
| --- | --- |
| `GROQ_API_KEY` | Groq API Key obtained from the Groq Console |
| `GROQ_MODEL` | AI Model name (e.g., `llama-3.3-70b-versatile`) |
| `DATABASE_URL` | SQLite or PostgreSQL connection string |
| `SECRET_KEY` | Secret key used for JWT authentication |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT access token expiration time in minutes |

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Axios with CORS & JWT Interceptors

### Backend
- FastAPI
- Python
- SQLAlchemy
- Groq SDK
- JWT & PBKDF2 Security


