import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatsCards } from "../components/dashboard/StatsCards";
import { QuickGenerateCard } from "../components/dashboard/QuickGenerateCard";
import { RecentProjectsTable } from "../components/dashboard/RecentProjectsTable";
import { projectService } from "../services/projectService";

export const DashboardPage = ({ onNavigateToGenerate, onPreviewProject }) => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
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
          setProjects(projRes.items || []);
          setStats(statsRes || {});
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

  const handleDownload = (downloadUrl, name) => {
    projectService.downloadZip(downloadUrl, name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="df-container"
    >
      {/* Quick Generator Banner */}
      <QuickGenerateCard onGenerate={(prompt) => onNavigateToGenerate(prompt)} />

      {/* Analytics Cards */}
      <StatsCards
        totalProjects={stats.total_projects || projects.length}
        storageUsedMb={stats.storage_used_mb || 0}
        activeEngine="Groq Llama 3.3"
      />

      {/* User's Recent Projects Table */}
      <RecentProjectsTable
        projects={projects}
        onPreview={onPreviewProject}
        onDownload={handleDownload}
      />
    </motion.div>
  );
};
