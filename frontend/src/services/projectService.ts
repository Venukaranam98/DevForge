import api, { API_BASE_URL } from "./api";
import { Project, ProjectPreview, GenerationRequest, PlatformStats } from "../types";

export const projectService = {
  async generateProject(data: GenerationRequest): Promise<Project> {
    const response = await api.post<Project>("/generate-project", data);
    return response.data;
  },

  async getProjects(skip = 0, limit = 20): Promise<{ items: Project[]; total: number }> {
    try {
      const response = await api.get("/api/v1/projects", { params: { skip, limit } });
      return response.data;
    } catch {
      // Fallback for legacy history endpoint
      const response = await api.get("/history");
      const legacyData = response.data?.data || [];
      return {
        items: legacyData.map((item: any, index: number) => ({
          id: item.id || index + 1,
          project_name: item.project_name || "Starter Project",
          prompt: `${item.project_type || "Starter"} using ${item.backend || "FastAPI"} & ${item.frontend || "React"}`,
          frontend: item.frontend,
          backend: item.backend,
          database: item.database,
          project_type: item.project_type,
          file_count: 12,
          storage_size_kb: 45.5,
          status: "COMPLETED",
          download_url: item.download_url || `/download/${item.project_name}.zip`,
          created_at: item.created_at || new Date().toISOString()
        })),
        total: legacyData.length
      };
    }
  },

  async getProjectPreview(id: number): Promise<ProjectPreview> {
    const response = await api.get<ProjectPreview>(`/api/v1/projects/${id}/preview`);
    return response.data;
  },

  async getStats(): Promise<PlatformStats> {
    const response = await api.get<PlatformStats>("/stats");
    return response.data;
  },

  downloadZip(downloadUrl: string, filename: string) {
    const fullUrl = downloadUrl.startsWith("http") ? downloadUrl : `${API_BASE_URL}${downloadUrl}`;
    const link = document.createElement("a");
    link.href = fullUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
