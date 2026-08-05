from sqlalchemy.orm import Session
from typing import Optional, List, Tuple
from app.db.models.project import Project

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, project_id: int) -> Optional[Project]:
        return self.db.query(Project).filter(Project.id == project_id).first()

    def create(self, **kwargs) -> Project:
        project = Project(**kwargs)
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def update(self, project_id: int, **kwargs) -> Optional[Project]:
        project = self.get_by_id(project_id)
        if project:
            for key, value in kwargs.items():
                if hasattr(project, key):
                    setattr(project, key, value)
            self.db.commit()
            self.db.refresh(project)
        return project

    def list(self, user_id: Optional[int] = None, skip: int = 0, limit: int = 50) -> Tuple[List[Project], int]:
        query = self.db.query(Project)
        if user_id is not None:
            query = query.filter(Project.user_id == user_id)
        total = query.count()
        projects = query.order_by(Project.created_at.desc()).offset(skip).limit(limit).all()
        return projects, total

    def delete(self, project_id: int) -> bool:
        project = self.get_by_id(project_id)
        if project:
            self.db.delete(project)
            self.db.commit()
            return True
        return False
