export interface User {
  id: number;
  email: string;
  full_name?: string;
  is_active: boolean;
  created_at: string;
}

export interface GeneratedFileItem {
  path: string;
  content: string;
}

export interface Project {
  id: number;
  project_name: string;
  prompt: string;
  frontend?: string;
  backend?: string;
  database?: string;
  project_type?: string;
  file_count: number;
  storage_size_kb: number;
  status: string;
  download_url?: string;
  created_at: string;
}

export interface ProjectPreview {
  id: number;
  project_name: string;
  prompt: string;
  architecture?: string;
  file_count: number;
  storage_size_kb: number;
  files: GeneratedFileItem[];
  download_url: string;
  created_at: string;
}

export interface GenerationRequest {
  prompt: string;
  project_name?: string;
  frontend?: string;
  backend?: string;
  database?: string;
  project_type?: string;
}

export interface PlatformStats {
  success: boolean;
  total_projects: number;
  storage_used_mb: number;
  total_users: number;
  status: string;
}
