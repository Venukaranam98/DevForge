import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RecentProjectsTable } from "../components/dashboard/RecentProjectsTable";
import { projectService } from "../services/projectService";
import { Search } from "lucide-react";

export const HistoryPage = ({ onPreviewProject }) => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService
      .getProjects(0, 100)
      .then((res) => {
        setProjects(res.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("History fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      p.project_name.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (downloadUrl, name) => {
    projectService.downloadZip(downloadUrl, name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="df-container"
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
            Project Generation History
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            View, preview, and download all past Groq AI synthesized repositories
          </p>
        </div>

        <div style={{ position: "relative", width: "18rem" }}>
          <Search style={{
            position: "absolute",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: 14,
            height: 14,
            color: "var(--text-muted)"
          }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..."
            className="df-input"
            style={{ paddingLeft: "2.25rem", fontFamily: "monospace" }}
          />
        </div>
      </div>

      <RecentProjectsTable
        projects={filteredProjects}
        onPreview={onPreviewProject}
        onDownload={handleDownload}
      />
    </motion.div>
  );
};
