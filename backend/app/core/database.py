from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Fix postgresql:// prefix if using Neon/Heroku postgres with postgres://
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

# SQLite fallback arguments
connect_args = {"check_same_thread": False} if db_url.startswith("sqlite") else {}

engine = create_engine(
    db_url,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def auto_migrate_schema():
    """Ensures all new columns exist on remote database tables."""
    from sqlalchemy import inspect, text
    inspector = inspect(engine)
    if "projects" in inspector.get_table_names():
        columns = [c["name"] for c in inspector.get_columns("projects")]
        with engine.connect() as conn:
            if "prompt" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN prompt TEXT DEFAULT ''"))
            if "file_count" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN file_count INTEGER DEFAULT 0"))
            if "storage_size_kb" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN storage_size_kb FLOAT DEFAULT 0.0"))
            if "zip_path" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN zip_path VARCHAR"))
            if "download_url" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN download_url VARCHAR"))
            if "status" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN status VARCHAR DEFAULT 'COMPLETED'"))
            if "architecture" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN architecture TEXT"))
            if "file_structure_json" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN file_structure_json TEXT"))
            if "user_id" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN user_id INTEGER"))
            if "created_at" not in columns:
                conn.execute(text("ALTER TABLE projects ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"))
            conn.commit()

