from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ProjectGenerateRequest(BaseModel):
    prompt: str = Field(..., description="Plain English project description prompt for Groq AI")
    project_name: Optional[str] = Field(None, description="Optional custom project name override")
    frontend: Optional[str] = Field("React", description="Frontend technology preference")
    backend: Optional[str] = Field("FastAPI", description="Backend technology preference")
    database: Optional[str] = Field("PostgreSQL", description="Database technology preference")
    project_type: Optional[str] = Field("FullStack Starter", description="Starter type")

class GeneratedFileItem(BaseModel):
    path: str
    content: str

class ProjectPreviewResponse(BaseModel):
    id: int
    project_name: str
    prompt: str
    architecture: Optional[str] = None
    file_count: int
    storage_size_kb: float
    files: List[GeneratedFileItem]
    download_url: str
    created_at: datetime

class ProjectResponse(BaseModel):
    id: int
    project_name: str
    prompt: str
    frontend: Optional[str] = None
    backend: Optional[str] = None
    database: Optional[str] = None
    project_type: Optional[str] = None
    file_count: int
    storage_size_kb: float
    status: str
    download_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectListResponse(BaseModel):
    items: List[ProjectResponse]
    total: int
    skip: int
    limit: int
