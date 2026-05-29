from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from generator import create_project
import json
import os
from database import SessionLocal, engine, Base
from models import Project
app = FastAPI()
Base.metadata.create_all(bind=engine)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ProjectSchema(BaseModel):
    project_name: str
    frontend: str
    backend: str
    database: str
    project_type: str

@app.get("/")
def home():
    return {
        "success": True,
        "message": "DevForge Backend Running",
        "data": None
    }

@app.post("/generate")
def generate_project(project: ProjectSchema):

    zip_path = create_project(
        project.project_name,
        project.frontend,
        project.backend,
        project.database,
        project.project_type
    )
    db = SessionLocal()

    new_project = Project(
        project_name=project.project_name,
        frontend=project.frontend,
        backend=project.backend,
        database=project.database,
        project_type=project.project_type
    )

    db.add(new_project)
    db.commit()
    db.close()

    return FileResponse(
        path=zip_path,
        filename=f"{project.project_name}.zip",
        media_type="application/zip"
    )

@app.get("/history")
def get_history():

    db = SessionLocal()

    projects = db.query(Project).all()

    history = []

    for project in projects:
        history.append({
            "project_name": project.project_name,
            "frontend": project.frontend,
            "backend": project.backend,
            "database": project.database,
            "project_type": project.project_type
        })

    db.close()

    return {
        "success": True,
        "message": "Project history fetched",
        "data": history
    }

@app.get("/stats")
def stats():

    db = SessionLocal()

    total_projects = db.query(Project).count()

    db.close()

    return {
        "success": True,
        "total_projects": total_projects
    }