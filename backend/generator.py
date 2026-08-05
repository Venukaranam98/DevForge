import os
from app.services.groq_service import GroqService
from app.services.storage_service import StorageService

def create_project(
    project_name: str,
    frontend: str = "React",
    backend: str = "FastAPI",
    database: str = "PostgreSQL",
    project_type: str = "FullStack Starter"
) -> str:
    """
    Legacy wrapper function now fully powered by Groq AI API.
    Sends prompt to Groq API to generate all files dynamically.
    """
    prompt = f"Create a production ready {project_type} named '{project_name}' using {backend} backend, {frontend} frontend, {database} database, Docker, and Swagger API documentation."
    
    groq = GroqService()
    groq_output = groq.generate_project_json(prompt)
    
    files = groq_output.get("files", [])
    storage = StorageService()
    _, zip_filepath, _, _ = storage.write_project_files(project_name=project_name, files=files)
    
    return zip_filepath
