import React from "react";
import { motion } from "framer-motion";
import { FileCode, FileText, Cpu } from "lucide-react";

export const FileTreeExplorer = ({ files, selectedPath, onSelectFile }) => {
  const getIcon = (path) => {
    if (path.includes("Dockerfile") || path.includes("docker-compose")) return FileCode;
    if (path.endsWith(".md")) return FileText;
    if (path.endsWith(".json") || path.endsWith(".yml")) return Cpu;
    return FileCode;
  };

  return (
    <div style={{
      width: "16rem",
      borderRight: "1px solid var(--border)",
      background: "#08080C",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden"
    }}>
      <div style={{
        padding: "0.75rem 1rem",
        borderBottom: "1px solid var(--border)",
        fontSize: "0.725rem",
        fontFamily: "monospace",
        fontWeight: 700,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
        Project Files ({files.length})
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {files.map((file) => {
          const isSelected = selectedPath === file.path;
          const Icon = getIcon(file.path);

          return (
            <motion.button
              key={file.path}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectFile(file)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 0.65rem",
                borderRadius: "0.5rem",
                fontSize: "0.775rem",
                fontFamily: "monospace",
                textAlign: "left",
                cursor: "pointer",
                border: isSelected ? "1px solid rgba(139, 92, 246, 0.35)" : "1px solid transparent",
                background: isSelected ? "rgba(139, 92, 246, 0.12)" : "transparent",
                color: isSelected ? "#F5F5F7" : "var(--text-muted)",
                transition: "all 0.15s ease"
              }}
            >
              <Icon style={{ width: 14, height: 14, color: isSelected ? "var(--accent)" : "var(--text-muted)", flexShrink: 0 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.path}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
