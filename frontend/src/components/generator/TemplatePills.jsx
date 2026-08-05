import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const TemplatePills = ({ onSelectTemplate }) => {
  const templates = [
    {
      title: "Ecommerce Backend API",
      prompt: "Build an Ecommerce Backend using FastAPI PostgreSQL JWT Redis Docker Celery Swagger.",
      name: "ecommerce-backend-api",
      badge: "Popular",
    },
    {
      title: "Hospital Management System",
      prompt: "Create a Hospital Management Backend using FastAPI PostgreSQL Docker JWT Redis Celery Swagger.",
      name: "hospital-management-api",
      badge: "Enterprise",
    },
    {
      title: "Node.js Express Microservice",
      prompt: "Build a Node.js Express REST API with MongoDB, JWT Authentication, Swagger Docs, and Docker Compose.",
      name: "node-express-microservice",
      badge: "Node.js",
    },
    {
      title: "Fullstack AI SaaS Starter",
      prompt: "Create a Fullstack SaaS template with FastAPI backend, PostgreSQL, JWT Auth, React Vite frontend, Docker, and GitHub Actions.",
      name: "fullstack-saas-starter",
      badge: "Fullstack",
    },
  ];

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Sparkles style={{ width: 16, height: 16, color: "var(--accent)" }} />
        <h4 style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
          Quick Preset Starters
        </h4>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "0.75rem"
      }}>
        {templates.map((tpl, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTemplate(tpl.prompt, tpl.name)}
            className="glass-panel glass-panel-hover"
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "0.75rem",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#FFFFFF" }}>
                {tpl.title}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span className="df-badge df-badge-purple" style={{ fontFamily: "monospace", fontSize: "0.675rem" }}>
                  {tpl.badge}
                </span>
                <ArrowUpRight style={{ width: 14, height: 14, color: "var(--accent)" }} />
              </div>
            </div>
            <p style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              {tpl.prompt}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
