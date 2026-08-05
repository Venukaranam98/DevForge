import json
import os
from fastapi import APIRouter, Depends, HTTPException, status, Query, Header
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Optional, List

from app.core.database import get_db
from app.api.v1.endpoints.auth import get_current_user_optional, get_current_user
from app.db.models.user import User
from app.schemas.project import (
    ProjectGenerateRequest,
    ProjectResponse,
    ProjectPreviewResponse,
    ProjectListResponse,
    GeneratedFileItem
)
from app.services.orchestration_service import OrchestrationService
from app.services.storage_service import StorageService
from app.db.repositories.project_repository import ProjectRepository

router = APIRouter(tags=["Projects"])

@router.post("/generate-project", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
@router.post("/projects/generate", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def generate_project(
    request: ProjectGenerateRequest,
    x_groq_api_key: Optional[str] = Header(None, alias="X-Groq-Api-Key"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not request.prompt or not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt string cannot be empty.")
    
    orchestrator = OrchestrationService(db, api_key=x_groq_api_key)
    
    try:
        project = orchestrator.generate_project(request, user_id=current_user.id)
        return project
    except ValueError as ve:
        raise HTTPException(
            status_code=400,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Project generation failed: {str(e)}"
        )

@router.get("/projects", response_model=ProjectListResponse)
def list_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repo = ProjectRepository(db)
    items, total = repo.list(user_id=current_user.id, skip=skip, limit=limit)
    return ProjectListResponse(
        items=[ProjectResponse.model_validate(p) for p in items],
        total=total,
        skip=skip,
        limit=limit
    )

@router.get("/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    repo = ProjectRepository(db)
    project = repo.get_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/projects/{project_id}/preview", response_model=ProjectPreviewResponse)
def preview_project(project_id: int, db: Session = Depends(get_db)):
    repo = ProjectRepository(db)
    project = repo.get_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    files_list = []
    if project.file_structure_json:
        try:
            raw_files = json.loads(project.file_structure_json)
            files_list = [GeneratedFileItem(**f) for f in raw_files]
        except Exception:
            files_list = []

    return ProjectPreviewResponse(
        id=project.id,
        project_name=project.project_name,
        prompt=project.prompt,
        architecture=project.architecture,
        file_count=project.file_count,
        storage_size_kb=project.storage_size_kb,
        files=files_list,
        download_url=project.download_url or f"/api/v1/download/{project.project_name}.zip",
        created_at=project.created_at
    )

@router.get("/download/{filename}")
def download_zip(filename: str):
    storage = StorageService()
    zip_path = os.path.join(storage.base_dir, filename)
    if not os.path.exists(zip_path):
        possible_files = [f for f in os.listdir(storage.base_dir) if f.startswith(filename) or f.endswith(filename)]
        if possible_files:
            zip_path = os.path.join(storage.base_dir, possible_files[0])
        else:
            raise HTTPException(status_code=404, detail="Requested project ZIP file not found.")

    return FileResponse(
        path=zip_path,
        filename=os.path.basename(zip_path),
        media_type="application/zip"
    )
