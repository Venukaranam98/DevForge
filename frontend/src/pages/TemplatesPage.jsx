import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Database, Server, Cpu } from "lucide-react";

export const TemplatesPage = ({ onSelectTemplate }) => {
  const templates = [
    {
      title: "Ecommerce Backend API",
      category: "Python / FastAPI",
      description: "FastAPI backend with PostgreSQL models, JWT authentication, Redis caching, Celery worker queue, and Docker Compose.",
      prompt: "Build an Ecommerce Backend using FastAPI PostgreSQL JWT Redis Docker Celery Swagger.",
      icon: Server,
      badge: "Popular",
    },
    {
      title: "Hospital Management System",
      category: "Healthcare SaaS",
      description: "Complete hospital management backend with patient records, doctor scheduling, JWT security, PostgreSQL, and Swagger UI docs.",
      prompt: "Create a Hospital Management Backend using FastAPI PostgreSQL Docker JWT Redis Celery Swagger.",
      icon: ShieldCheck,
      badge: "Enterprise",
    },
    {
      title: "Node.js Express Microservice",
      category: "Node.js / Express",
      description: "Scalable Node.js Express REST API starter with MongoDB, JWT Auth, Swagger docs, environment config, and Docker containerization.",
      prompt: "Build a Node.js Express REST API with MongoDB, JWT Authentication, Swagger Docs, and Docker Compose.",
      icon: Database,
      badge: "Node.js",
    },
    {
      title: "Fullstack AI SaaS Starter",
      category: "React + FastAPI",
      description: "Production-grade fullstack application template with React Vite frontend, FastAPI backend, PostgreSQL, Docker, and GitHub Actions CI/CD.",
      prompt: "Create a Fullstack SaaS template with FastAPI backend, PostgreSQL, JWT Auth, React Vite frontend, Docker, and GitHub Actions.",
      icon: Cpu,
      badge: "Fullstack",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="df-container"
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
          Curated Project Templates
        </h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Production-ready starter repository blueprints powered by Groq AI
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {templates.map((tpl, idx) => {
          const Icon = tpl.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="glass-panel glass-panel-hover"
              style={{
                padding: "1.5rem",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      padding: "0.65rem",
                      borderRadius: "0.75rem",
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.25)",
                      color: "var(--accent)"
                    }}>
                      <Icon style={{ width: 20, height: 20 }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#FFFFFF" }}>
                        {tpl.title}
                      </h3>
                      <span style={{ fontSize: "0.725rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{tpl.category}</span>
                    </div>
                  </div>
                  <span className="df-badge df-badge-purple" style={{ fontFamily: "monospace", fontSize: "0.675rem" }}>
                    {tpl.badge}
                  </span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "monospace", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {tpl.description}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTemplate(tpl.prompt)}
                className="df-button df-button-secondary"
                style={{ width: "100%", padding: "0.75rem", fontSize: "0.85rem", borderRadius: "0.75rem" }}
              >
                <Sparkles style={{ width: 16, height: 16, color: "var(--accent)" }} />
                <span>Use This Template</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
