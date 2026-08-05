from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.core.database import get_db
from app.db.models.project import Project
from app.db.models.user import User
from app.api.v1.endpoints.auth import get_current_user_optional

router = APIRouter(prefix="/stats", tags=["Stats"])

@router.get("/")
def get_stats(
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    query = db.query(Project)
    if current_user:
        query = query.filter(Project.user_id == current_user.id)
        
    total_projects = query.count()
    total_storage_kb = query.with_entities(func.sum(Project.storage_size_kb)).scalar() or 0.0
    total_users = db.query(User).count()
    
    return {
        "success": True,
        "total_projects": total_projects,
        "storage_used_mb": round(total_storage_kb / 1024.0, 2),
        "total_users": total_users,
        "status": "healthy"
    }
