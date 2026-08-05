from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base
from app.db.models.user import User

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, index=True, nullable=False)
    prompt = Column(Text, nullable=False)
    frontend = Column(String, nullable=True, default="React")
    backend = Column(String, nullable=True, default="FastAPI")
    database = Column(String, nullable=True, default="PostgreSQL")
    project_type = Column(String, nullable=True, default="FullStack")
    
    file_count = Column(Integer, default=0)
    storage_size_kb = Column(Float, default=0.0)
    zip_path = Column(String, nullable=True)
    download_url = Column(String, nullable=True)
    status = Column(String, default="COMPLETED") # COMPLETED, GENERATING, FAILED
    
    architecture = Column(Text, nullable=True)
    file_structure_json = Column(Text, nullable=True) # JSON array of {path, content}
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="projects")
