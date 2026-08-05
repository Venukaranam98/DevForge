import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  FileCode, 
  BookOpen, 
  Cpu, 
  Container, 
  Loader2 
} from "lucide-react";
import { projectService } from "../../services/projectService";
import { FileTreeExplorer } from "./FileTreeExplorer";
import { CodeViewer } from "./CodeViewer";

export const ProjectPreviewModal = ({ project, onClose, onDownload }) => {
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("code");

  useEffect(() => {
    let isMounted = true;
    projectService
      .getProjectPreview(project.id)
      .then((data) => {
        if (isMounted) {
          setPreviewData(data);
          if (data.files && data.files.length > 0) {
            setSelectedFile(data.files[0]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Preview load error:", err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [project.id]);

  const readmeFile = previewData?.files?.find((f) => f.path.toLowerCase().includes("readme.md"));
  const dockerFile = previewData?.files?.find(
    (f) => f.path.includes("Dockerfile") || f.path.includes("docker-compose")
  );

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="glass-panel"
          style={{
            width: "100%",
            maxWidth: "75rem",
            height: "85vh",
            borderRadius: "1.25rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)"
          }}
        >
          {/* Header Bar */}
          <div style={{
            height: "4rem",
            padding: "0 1.5rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(13, 13, 17, 0.9)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "0.6rem",
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)"
              }}>
                <FileCode style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-heading)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span>{project.project_name}</span>
                  <span className="df-badge df-badge-purple" style={{ fontFamily: "monospace", fontSize: "0.675rem" }}>
                    {project.backend || "FastAPI"}
                  </span>
                </h3>
                <p style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily: "monospace",
                  maxWidth: "28rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  "{project.prompt}"
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  onDownload(
                    project.download_url || `/download/${project.project_name}.zip`,
                    `${project.project_name}.zip`
                  )
                }
                className="df-button df-button-primary"
                style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", borderRadius: "0.6rem" }}
              >
                <Download style={{ width: 14, height: 14 }} />
                <span>Download ZIP</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  padding: "0.45rem",
                  borderRadius: "0.6rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                <X style={{ width: 18, height: 18 }} />
              </motion.button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{
            padding: "0 1.5rem",
            background: "#08080C",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            gap: "1rem",
            fontSize: "0.825rem",
            fontWeight: 500
          }}>
            {[
              { id: "code", label: "Code Tree Explorer", icon: FileCode },
              { id: "readme", label: "README Documentation", icon: BookOpen },
              { id: "architecture", label: "Architecture Breakdown", icon: Cpu },
              { id: "docker", label: "Docker & CI Setup", icon: Container },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "0.75rem 0.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                    color: isActive ? "#F5F5F7" : "var(--text-muted)",
                    background: "transparent",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <Icon style={{ width: 16, height: 16, color: isActive ? "var(--accent)" : "var(--text-muted)" }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            {loading ? (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyCenter: "center", justifyContent: "center", gap: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace", fontSize: "0.875rem" }}>
                <Loader2 style={{ width: 20, height: 20, color: "var(--accent)", animation: "spin 1s linear infinite" }} />
                <span>Fetching project files from backend...</span>
              </div>
            ) : (
              <>
                {activeTab === "code" && (
                  <div style={{ height: "100%", display: "flex" }}>
                    <FileTreeExplorer
                      files={previewData?.files || []}
                      selectedPath={selectedFile?.path || ""}
                      onSelectFile={(f) => setSelectedFile(f)}
                    />
                    <CodeViewer file={selectedFile} />
                  </div>
                )}

                {activeTab === "readme" && (
                  <div style={{ height: "100%", overflowY: "auto", padding: "2rem", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: 1.6, background: "#050507" }}>
                    {readmeFile ? (
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", color: "#F5F5F7" }}>
                        {readmeFile.content}
                      </pre>
                    ) : (
                      <div style={{ color: "var(--text-muted)" }}>No README.md found in generated files.</div>
                    )}
                  </div>
                )}

                {activeTab === "architecture" && (
                  <div style={{ height: "100%", overflowY: "auto", padding: "2rem", background: "#050507", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "1rem" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#FFFFFF", marginBottom: "0.5rem" }}>
                        System Architecture Summary
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontFamily: "monospace", lineHeight: 1.6 }}>
                        {previewData?.architecture || "Production-ready architecture synthesized by Groq AI."}
                      </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", fontFamily: "monospace" }}>
                      <div className="glass-panel" style={{ padding: "1rem", borderRadius: "0.75rem" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "0.25rem" }}>Total Files</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent)" }}>{previewData?.file_count || 12} files</div>
                      </div>
                      <div className="glass-panel" style={{ padding: "1rem", borderRadius: "0.75rem" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "0.25rem" }}>ZIP Size</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#A78BFA" }}>{previewData?.storage_size_kb || 42} KB</div>
                      </div>
                      <div className="glass-panel" style={{ padding: "1rem", borderRadius: "0.75rem" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "0.25rem" }}>AI Engine</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#10B981" }}>Groq Llama 3.3</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "docker" && (
                  <div style={{ height: "100%", overflowY: "auto", padding: "2rem", background: "#050507" }}>
                    {dockerFile ? (
                      <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "1rem" }}>
                        <h4 style={{ fontSize: "0.9rem", fontWeight: 700, fontFamily: "monospace", color: "#FFFFFF", marginBottom: "0.75rem" }}>{dockerFile.path}</h4>
                        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.8rem", color: "#F5F5F7", background: "#09090C", padding: "1rem", borderRadius: "0.75rem" }}>
                          {dockerFile.content}
                        </pre>
                      </div>
                    ) : (
                      <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "monospace" }}>
                        Docker setup included in repository files. Select "Dockerfile" or "docker-compose.yml" from Code Explorer tab.
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
