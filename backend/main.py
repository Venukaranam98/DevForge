from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from generator import create_project
import json
import os

app = FastAPI()

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

    return FileResponse(
        path=zip_path,
        filename=f"{project.project_name}.zip",
        media_type="application/zip"
    )

@app.get("/history")
def get_history():

    history_file = os.path.join(BASE_DIR, "history.json")

    if not os.path.exists(history_file):
        return {
            "success": True,
            "message": "No history found",
            "data": []
        }

    with open(history_file, "r") as file:
        history = json.load(file)

    return {
        "success": True,
        "message": "Project history fetched",
        "data": history
    }