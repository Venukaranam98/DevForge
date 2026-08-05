from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.db.models.project import Project
from app.db.models.user import User

router = APIRouter(prefix="/stats", tags=["Stats"])

@router.get("/")
def get_stats(db: Session = Depends(get_db)):
    total_projects = db.query(Project).count()
    total_storage_kb = db.query(func.sum(Project.storage_size_kb)).scalar() or 0.0
    total_users = db.query(User).count()
    
    return {
        "success": True,
        "total_projects": total_projects,
        "storage_used_mb": round(total_storage_kb / 1024.0, 2),
        "total_users": total_users,
        "status": "healthy"
    }
