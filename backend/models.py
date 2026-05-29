from sqlalchemy import Column, Integer, String
from database import Base

class Project(Base):

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String)

    frontend = Column(String)

    backend = Column(String)

    database = Column(String)

    project_type = Column(String)