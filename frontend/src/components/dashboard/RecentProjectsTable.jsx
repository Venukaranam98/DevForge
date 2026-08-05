import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, Eye, Download, Sparkles, Clock, FileCode } from "lucide-react";

export const RecentProjectsTable = ({ projects = [], onPreview, onDownload }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: "2.5rem", textAlign: "center", borderRadius: "1rem" }}>
        <FolderGit2 style={{ width: 40, height: 40, color: "var(--text-muted)", margin: "0 auto 1rem auto" }} />
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.35rem" }}>No Generated Projects Yet</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto" }}>
          You haven't generated any projects under your account yet. Use the AI Generator to synthesize your first starter repository!
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: "1.25rem", borderRadius: "1rem", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
          Your Recent Projects
        </h3>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Showing {projects.length} project{projects.length === 1 ? "" : "s"}
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>
              <th style={{ padding: "0.75rem 1rem" }}>Project Name</th>
              <th style={{ padding: "0.75rem 1rem" }}>Stack</th>
              <th style={{ padding: "0.75rem 1rem" }}>Created</th>
              <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <motion.tr
                key={project.id || idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
              >
                <td style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.5rem",
                      background: "rgba(139, 92, 246, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)"
                    }}>
                      <FileCode style={{ width: 16, height: 16 }} />
                    </div>
                    <div>
                      <div style={{ color: "var(--text-primary)" }}>{project.project_name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {project.prompt}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "0.85rem 1rem" }}>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    {project.frontend && (
                      <span className="df-badge df-badge-purple" style={{ fontSize: "0.65rem" }}>
                        {project.frontend}
                      </span>
                    )}
                    {project.backend && (
                      <span className="df-badge df-badge-cyan" style={{ fontSize: "0.65rem" }}>
                        {project.backend}
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Clock style={{ width: 12, height: 12 }} />
                    {project.created_at ? new Date(project.created_at).toLocaleDateString() : "Recent"}
                  </div>
                </td>
                <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <button
                      onClick={() => onPreview && onPreview(project)}
                      className="df-button df-button-secondary"
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
                    >
                      <Eye style={{ width: 14, height: 14 }} /> Preview
                    </button>
                    {project.download_url && (
                      <button
                        onClick={() => onDownload && onDownload(project.download_url, `${project.project_name}.zip`)}
                        className="df-button df-button-primary"
                        style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
                      >
                        <Download style={{ width: 14, height: 14 }} /> ZIP
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
