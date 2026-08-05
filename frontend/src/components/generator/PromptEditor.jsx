import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

export const PromptEditor = ({
  prompt,
  setPrompt,
  projectName,
  setProjectName,
  onGenerate,
  loading,
}) => {
  return (
    <div className="glass-panel" style={{ borderRadius: "1rem", padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifySpace: "between", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Terminal style={{ width: 20, height: 20, color: "var(--accent)" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>Prompt Editor</h3>
        </div>
        <span className="df-badge df-badge-purple" style={{ fontFamily: "monospace", fontSize: "0.725rem" }}>
          Groq Llama 3.3 Orchestration
        </span>
      </div>

      {/* Project Name Optional Override */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{
          display: "block",
          fontSize: "0.725rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          marginBottom: "0.4rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em"
        }}>
          Project Name (Optional)
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g. ecommerce-microservices-api"
          className="df-input"
          style={{ fontFamily: "monospace" }}
        />
      </div>

      {/* Main Prompt Textarea */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.4rem"
        }}>
          <label style={{
            fontSize: "0.725rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.04em"
          }}>
            Detailed Prompt Instruction
          </label>
          <span style={{ color: "var(--text-muted)", fontFamily: "monospace", fontSize: "0.7rem" }}>
            {prompt.length} characters
          </span>
        </div>
        <textarea
          rows={7}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your desired project architecture, REST endpoints, database entities, authentication scheme, and third-party tools...&#10;&#10;Example: Create a FullStack AI SaaS platform named 'devforge-app' with FastAPI backend, PostgreSQL DB, Redis caching, Docker setup, and React frontend."
          className="df-input"
          style={{ fontFamily: "monospace", resize: "none", lineHeight: 1.6 }}
        />
      </div>

      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: loading || !prompt.trim() ? 1 : 1.01 }}
        whileTap={{ scale: loading || !prompt.trim() ? 1 : 0.99 }}
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className="df-button df-button-primary"
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "0.75rem",
          opacity: loading || !prompt.trim() ? 0.5 : 1,
          cursor: loading || !prompt.trim() ? "not-allowed" : "pointer",
          boxShadow: "0 0 25px var(--accent-glow)"
        }}
      >
        <Sparkles style={{ width: 20, height: 20 }} />
        <span>{loading ? "Synthesizing Repository with Groq AI..." : "Generate Project with Groq AI"}</span>
      </motion.button>
    </div>
  );
};
