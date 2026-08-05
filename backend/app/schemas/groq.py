from pydantic import BaseModel, Field
from typing import List, Optional

class GroqFile(BaseModel):
    path: str = Field(..., description="Relative file path, e.g., app/main.py, Dockerfile, README.md")
    content: str = Field(..., description="Complete, production-ready source code or config content")

class GroqProjectOutput(BaseModel):
    projectName: str = Field(..., description="Sanitized project name (slug format)")
    architecture: Optional[str] = Field("", description="Architectural summary and setup instructions")
    files: List[GroqFile] = Field(..., description="Array of all generated project files")
