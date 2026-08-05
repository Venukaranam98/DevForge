import React, { useEffect, useState } from "react";
import { StatsCards } from "../components/dashboard/StatsCards";
import { QuickGenerateCard } from "../components/dashboard/QuickGenerateCard";
import { RecentProjectsTable } from "../components/dashboard/RecentProjectsTable";
import { projectService } from "../services/projectService";
import { Project, PlatformStats } from "../types";

interface DashboardPageProps {
  onNavigateToGenerate: (initialPrompt?: string) => void;
  onPreviewProject: (project: Project) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateToGenerate,
  onPreviewProject,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<PlatformStats>({
    success: true,
    total_projects: 0,
    storage_used_mb: 0,
    total_users: 1,
    status: "healthy",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([projectService.getProjects(0, 10), projectService.getStats()])
      .then(([projRes, statsRes]) => {
        if (isMounted) {
          setProjects(projRes.items);
          setStats(statsRes);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Dashboard data load error:", err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDownload = (downloadUrl: string, name: string) => {
    projectService.downloadZip(downloadUrl, name);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Quick Generator Prompt Banner */}
      <QuickGenerateCard onGenerate={(prompt) => onNavigateToGenerate(prompt)} />

      {/* Analytics Cards */}
      <StatsCards
        totalProjects={stats.total_projects || projects.length}
        storageUsedMb={stats.storage_used_mb || 1.2}
        activeEngine="Gemini 2.5 AI"
      />

      {/* Recent Projects Table */}
      <RecentProjectsTable
        projects={projects}
        onPreview={onPreviewProject}
        onDownload={handleDownload}
      />
    </div>
  );
};
