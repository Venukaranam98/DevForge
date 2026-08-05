import os
import shutil
import time
import re
import json
from typing import Dict, Any, List, Tuple
from app.core.config import settings

class StorageService:
    def __init__(self, base_dir: str = None):
        if base_dir is None:
            backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            self.base_dir = os.path.join(backend_dir, "generated_projects")
        else:
            self.base_dir = base_dir
        
        os.makedirs(self.base_dir, exist_ok=True)

    def sanitize_path(self, relative_path: str) -> str:
        """Sanitizes file path to prevent directory traversal vulnerabilities."""
        clean_path = re.sub(r'^[/\\]+', '', relative_path)
        clean_path = os.path.normpath(clean_path)
        if clean_path.startswith("..") or ".." in clean_path.split(os.sep):
            raise ValueError(f"Invalid path traversal attempt: {relative_path}")
        return clean_path

    def write_project_files(self, project_name: str, files: List[Dict[str, str]]) -> Tuple[str, str, int, float]:
        """
        Creates directory tree, writes all files, builds ZIP package.
        Returns (project_dir, zip_filepath, file_count, total_size_kb).
        """
        timestamp = int(time.time())
        sanitized_project_name = re.sub(r'[^a-zA-Z0-9_-]', '_', project_name) or "devforge_project"
        folder_name = f"{sanitized_project_name}_{timestamp}"
        
        project_dir = os.path.join(self.base_dir, folder_name)
        os.makedirs(project_dir, exist_ok=True)

        total_bytes = 0
        file_count = 0

        for file_item in files:
            rel_path = file_item.get("path", "")
            content = file_item.get("content", "")
            if not rel_path:
                continue


            clean_rel_path = self.sanitize_path(rel_path)
            full_file_path = os.path.join(project_dir, clean_rel_path)
            
            # Create parent directories if needed
            os.makedirs(os.path.dirname(full_file_path), exist_ok=True)

            # Write file content
            with open(full_file_path, "w", encoding="utf-8") as f:
                f.write(content)

            file_bytes = len(content.encode("utf-8"))
            total_bytes += file_bytes
            file_count += 1

        # Package project into ZIP archive
        zip_base_path = os.path.join(self.base_dir, folder_name)
        zip_filepath = shutil.make_archive(
            base_name=zip_base_path,
            format='zip',
            root_dir=project_dir
        )

        total_size_kb = round(total_bytes / 1024.0, 2)
        return project_dir, zip_filepath, file_count, total_size_kb

    def get_zip_path(self, folder_name: str) -> str:
        zip_path = os.path.join(self.base_dir, f"{folder_name}.zip")
        return zip_path if os.path.exists(zip_path) else None
