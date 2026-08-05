import api from "./api";

export const projectService = {
  async generateProject(data) {
    const response = await api.post("/api/v1/projects/generate", data);
    return response.data;
  },

  async getProjects(skip = 0, limit = 20) {
    try {
      const response = await api.get("/api/v1/projects", { params: { skip, limit } });
      return response.data;
    } catch (err) {
      // Fallback for legacy history endpoint
      try {
        const response = await api.get("/history");
        const legacyData = response.data?.data || [];
        return {
          items: legacyData.map((item, index) => ({
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
            download_url: item.download_url || `/api/v1/download/${item.project_name}.zip`,
            created_at: item.created_at || new Date().toISOString()
          })),
          total: legacyData.length
        };
      } catch {
        return { items: [], total: 0 };
      }
    }
  },

  async getProjectPreview(id) {
    const response = await api.get(`/api/v1/projects/${id}/preview`);
    return response.data;
  },

  async getStats() {
    const response = await api.get("/api/v1/stats");
    return response.data;
  },

  async downloadZip(downloadUrl, filename) {
    try {
      const cleanUrl = downloadUrl.startsWith("http")
        ? downloadUrl.replace(/^http:\/\/[^\/]+/, "")
        : downloadUrl;
      const response = await api.get(cleanUrl, { responseType: "blob" });
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename || "project.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("ZIP download error:", err);
    }
  }
};
