import React from "react";
import { motion } from "framer-motion";
import { Download, Eye, Terminal, Clock, FileCode, HardDrive } from "lucide-react";

export const RecentProjectsTable = ({ projects, onPreview, onDownload }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: "3rem", textAlign: "center", borderRadius: "1rem" }}>
        <Terminal style={{ width: 40, height: 40, color: "var(--text-muted)", margin: "0 auto 1rem auto" }} />
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          No Projects Generated Yet
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "24rem", margin: "0 auto" }}>
          Type a prompt in the Project Generator to create your first Groq AI starter repository.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ borderRadius: "1rem", overflow: "hidden" }}>
      <div style={{
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
            Recent Projects
          </h3>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            All Groq AI synthesized repositories
          </p>
        </div>
        <span className="df-badge df-badge-purple" style={{ fontFamily: "monospace" }}>
          {projects.length} Total
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{
              background: "rgba(255, 255, 255, 0.02)",
              borderBottom: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontFamily: "monospace",
              fontSize: "0.725rem",
              textTransform: "uppercase"
            }}>
              <th style={{ padding: "0.85rem 1.25rem" }}>Project Name & Prompt</th>
              <th style={{ padding: "0.85rem 1rem" }}>Stack</th>
              <th style={{ padding: "0.85rem 1rem" }}>Files & Size</th>
              <th style={{ padding: "0.85rem 1rem" }}>Created</th>
              <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                style={{
                  borderBottom: "1px solid var(--border)",
                  transition: "background 0.15s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card-hover)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ fontWeight: 600, color: "#FFFFFF", marginBottom: "0.2rem" }}>
                    {project.project_name}
                  </div>
                  <div style={{
                    color: "var(--text-muted)",
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    maxWidth: "28rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    "{project.prompt}"
                  </div>
                </td>

                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    <span className="df-badge df-badge-purple" style={{ fontFamily: "monospace", fontSize: "0.7rem" }}>
                      {project.backend || "FastAPI"}
                    </span>
                    {project.database && (
                      <span className="df-badge" style={{ fontFamily: "monospace", fontSize: "0.7rem" }}>
                        {project.database}
                      </span>
                    )}
                  </div>
                </td>

                <td style={{ padding: "1rem", fontFamily: "monospace", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-secondary)" }}>
                      <FileCode style={{ width: 14, height: 14, color: "var(--accent)" }} />
                      {project.file_count || 12} files
                    </span>
                    <span>•</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <HardDrive style={{ width: 14, height: 14 }} />
                      {project.storage_size_kb ? `${project.storage_size_kb} KB` : "32 KB"}
                    </span>
                  </div>
                </td>

                <td style={{ padding: "1rem", fontFamily: "monospace", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Clock style={{ width: 14, height: 14 }} />
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </td>

                <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onPreview(project)}
                      className="df-button df-button-secondary"
                      style={{ padding: "0.4rem 0.75rem", fontSize: "0.775rem", borderRadius: "0.5rem" }}
                    >
                      <Eye style={{ width: 14, height: 14, color: "var(--accent)" }} />
                      <span>Preview</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        onDownload(
                          project.download_url || `/download/${project.project_name}.zip`,
                          `${project.project_name}.zip`
                        )
                      }
                      className="df-button df-button-primary"
                      style={{ padding: "0.4rem 0.75rem", fontSize: "0.775rem", borderRadius: "0.5rem" }}
                    >
                      <Download style={{ width: 14, height: 14 }} />
                      <span>ZIP</span>
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
