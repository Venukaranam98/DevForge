import json
import os
import logging
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from app.services.groq_service import GroqService
from app.services.storage_service import StorageService
from app.db.repositories.project_repository import ProjectRepository
from app.schemas.project import ProjectGenerateRequest
from app.db.models.project import Project

logger = logging.getLogger("devforge.orchestrator")

class OrchestrationService:
    def __init__(self, db: Session, api_key: Optional[str] = None):
        self.db = db
        self.groq_service = GroqService(api_key=api_key)
        self.storage_service = StorageService()
        self.project_repo = ProjectRepository(db)

    def generate_project(self, request: ProjectGenerateRequest, user_id: Optional[int] = None) -> Project:
        """
        Orchestrates full workflow: Prompt -> Groq API -> Disk Storage -> ZIP packaging -> DB Record.
        Strictly relies on Groq AI for 100% of generated project files.
        """
        logger.info(f"Orchestrating Groq AI project generation for prompt: '{request.prompt[:60]}...'")

        # 1. Forward prompt to Groq AI API (Raises error if API key missing or generation fails)
        groq_output = self.groq_service.generate_project_json(request.prompt)

        project_name = request.project_name or groq_output.get("projectName") or "devforge-project"
        architecture = groq_output.get("architecture", "AI Generated Architecture")
        files = groq_output.get("files", [])

        # 2. Storage Service writes physical files & ZIP archive
        project_dir, zip_filepath, file_count, storage_size_kb = self.storage_service.write_project_files(
            project_name=project_name,
            files=files
        )

        zip_filename = os.path.basename(zip_filepath)
        download_url = f"/api/v1/download/{zip_filename}"

        # 3. Store Metadata & File Structure JSON in DB
        db_project = self.project_repo.create(
            project_name=project_name,
            prompt=request.prompt,
            frontend=request.frontend,
            backend=request.backend,
            database=request.database,
            project_type=request.project_type,
            file_count=file_count,
            storage_size_kb=storage_size_kb,
            zip_path=zip_filepath,
            download_url=download_url,
            status="COMPLETED",
            architecture=architecture,
            file_structure_json=json.dumps(files),
            user_id=user_id
        )

        logger.info(f"Project '{project_name}' generated successfully via Groq API with ID {db_project.id}")
        return db_project
