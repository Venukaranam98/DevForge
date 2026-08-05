import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export const QuickGenerateCard = ({ onGenerate }) => {
  const [quickPrompt, setQuickPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    onGenerate(quickPrompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-panel glass-panel-hover"
      style={{
        padding: "1.75rem",
        borderRadius: "1rem",
        marginBottom: "2rem",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0D0D11 0%, #14141B 100%)"
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "#A78BFA",
        fontSize: "0.75rem",
        fontWeight: 600,
        marginBottom: "0.5rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase"
      }}>
        <Sparkles style={{ width: 16, height: 16 }} />
        <span>Quick Project Generator</span>
      </div>

      <h3 style={{
        fontSize: "1.35rem",
        fontWeight: 700,
        fontFamily: "var(--font-heading)",
        color: "#FFFFFF",
        marginBottom: "0.35rem"
      }}>
        What do you want to build today?
      </h3>
      <p style={{
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        marginBottom: "1.25rem",
        maxWidth: "40rem",
        lineHeight: 1.5
      }}>
        Describe your project idea in natural language. Groq AI will generate the entire directory structure, production-ready source code, Docker setup, and configuration files instantly.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem" }}>
        <input
          type="text"
          value={quickPrompt}
          onChange={(e) => setQuickPrompt(e.target.value)}
          placeholder="e.g. Build a Microservices AI SaaS backend using FastAPI, PostgreSQL, Redis and Docker..."
          className="df-input"
          style={{ flex: 1, fontFamily: "monospace" }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!quickPrompt.trim()}
          className="df-button df-button-primary"
          style={{
            opacity: !quickPrompt.trim() ? 0.5 : 1,
            cursor: !quickPrompt.trim() ? "not-allowed" : "pointer"
          }}
        >
          <span>Generate</span>
          <ArrowRight style={{ width: 16, height: 16 }} />
        </motion.button>
      </form>
    </motion.div>
  );
};
