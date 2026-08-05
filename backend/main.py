import os
from typing import Optional
from fastapi import FastAPI, Depends, status, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import engine, get_db, auto_migrate_schema
from app.db.base import Base
from app.api.v1.router import api_router
from app.schemas.project import ProjectGenerateRequest, ProjectResponse
from app.services.orchestration_service import OrchestrationService
from app.db.repositories.project_repository import ProjectRepository

# Ensure database tables and columns exist
Base.metadata.create_all(bind=engine)
auto_migrate_schema()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="DevForge AI - Production Ready Project Generator",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Explicit CORS origins (No "*" when credentials/Authorization header is used)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

# Register CORSMiddleware BEFORE routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Preserve HTTPException status codes and details
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers=exc.headers
    )

# Global Exception Handler to guarantee CORS headers on uncaught 500 errors
@app.exception_handler(Exception)
async def global_exception_handler(request, exc: Exception):
    import traceback
    print("UNCAUGHT EXCEPTION LOGGED:\n", traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"}
    )

# Mount API V1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "DevForge Backend API V2 Running",
        "docs": "/docs",
        "version": "2.0.0"
    }

# Root route POST /generate-project
@app.post("/generate-project", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def generate_project_root(
    request: ProjectGenerateRequest,
    x_groq_api_key: Optional[str] = Header(None, alias="X-Groq-Api-Key"),
    db: Session = Depends(get_db)
):
    orchestrator = OrchestrationService(db, api_key=x_groq_api_key)
    try:
        return orchestrator.generate_project(request)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Backward Compatibility Route: POST /generate
@app.post("/generate")
def generate_legacy(
    project_data: dict,
    x_groq_api_key: Optional[str] = Header(None, alias="X-Groq-Api-Key"),
    db: Session = Depends(get_db)
):
    prompt = project_data.get("prompt")
    if not prompt:
        p_name = project_data.get("project_name", "starter-project")
        fe = project_data.get("frontend", "React")
        be = project_data.get("backend", "FastAPI")
        db_type = project_data.get("database", "PostgreSQL")
        p_type = project_data.get("project_type", "FullStack Starter")
        prompt = f"Create a production ready {p_type} named '{p_name}' using {be} backend, {fe} frontend, {db_type} database, Docker, and Swagger API documentation."
    
    req = ProjectGenerateRequest(
        prompt=prompt,
        project_name=project_data.get("project_name"),
        frontend=project_data.get("frontend", "React"),
        backend=project_data.get("backend", "FastAPI"),
        database=project_data.get("database", "PostgreSQL"),
        project_type=project_data.get("project_type", "FullStack Starter")
    )
    
    orchestrator = OrchestrationService(db, api_key=x_groq_api_key)
    try:
        result = orchestrator.generate_project(req)
        if project_data.get("return_file") is True:
            return FileResponse(
                path=result.zip_path,
                filename=f"{result.project_name}.zip",
                media_type="application/zip"
            )
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Backward Compatibility Route: GET /history
@app.get("/history")
def get_history_legacy(db: Session = Depends(get_db)):
    repo = ProjectRepository(db)
    projects, _ = repo.list(limit=50)
    history = []
    for p in projects:
        history.append({
            "id": p.id,
            "project_name": p.project_name,
            "frontend": p.frontend,
            "backend": p.backend,
            "database": p.database,
            "project_type": p.project_type,
            "download_url": p.download_url,
            "created_at": p.created_at
        })
    return {
        "success": True,
        "message": "Project history fetched",
        "data": history
    }

# Backward Compatibility Route: GET /stats
@app.get("/stats")
def get_stats_legacy(db: Session = Depends(get_db)):
    repo = ProjectRepository(db)
    _, total = repo.list(limit=1)
    return {
        "success": True,
        "total_projects": total
    }