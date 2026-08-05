import React from "react";
import { motion } from "framer-motion";
import { Layers, Plus } from "lucide-react";

export const TechStackSelector = ({ onAppendTag }) => {
  const stackCategories = [
    {
      category: "Backend Frameworks",
      tags: ["FastAPI", "Node.js (Express)", "Django", "Go (Gin)", "Spring Boot"],
    },
    {
      category: "Databases & Storage",
      tags: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "MySQL"],
    },
    {
      category: "Frontend Stack",
      tags: ["React + Vite", "Next.js", "Vue.js", "Vanilla CSS"],
    },
    {
      category: "DevOps & Tooling",
      tags: ["Docker & Compose", "JWT Authentication", "Celery Tasks", "Swagger Docs", "GitHub Actions"],
    },
  ];

  return (
    <div className="glass-panel" style={{ borderRadius: "1rem", padding: "1.25rem" }}>
      <div style={{ display: "flex", items: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <Layers style={{ width: 16, height: 16, color: "var(--accent)" }} />
        <h4 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
          Technology Stack Pills
        </h4>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {stackCategories.map((cat, idx) => (
          <div key={idx}>
            <div style={{
              fontSize: "0.7rem",
              fontFamily: "monospace",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.4rem"
            }}>
              {cat.category}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {cat.tags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onAppendTag(tag)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "0.5rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <Plus style={{ width: 12, height: 12, color: "var(--accent)" }} />
                  <span>{tag}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
