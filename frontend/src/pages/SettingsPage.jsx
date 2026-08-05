import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, Server, Check, Cpu } from "lucide-react";
import { Toast } from "../components/ui/Toast";

export const SettingsPage = () => {
  const [groqKey, setGroqKey] = useState("");
  const [backendUrl, setBackendUrl] = useState("http://localhost:8000");
  const [modelName, setModelName] = useState("llama-3.3-70b-versatile");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("devforge_groq_key");
    if (key) setGroqKey(key);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (groqKey.trim()) {
      localStorage.setItem("devforge_groq_key", groqKey.trim());
    } else {
      localStorage.removeItem("devforge_groq_key");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="df-container"
      style={{ maxWidth: "56rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      {saved && <Toast message="Platform Configuration Saved Successfully!" type="info" onClose={() => setSaved(false)} />}

      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
          Platform Settings
        </h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Configure your Groq AI API Key, default model, and FastAPI backend URL
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Groq API Key */}
        <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{
              padding: "0.65rem",
              borderRadius: "0.75rem",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              color: "var(--accent)"
            }}>
              <Key style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#FFFFFF" }}>
                Groq API Key
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Your Groq API key used for project repository generation (sent via X-Groq-Api-Key)
              </p>
            </div>
          </div>
          <input
            type="password"
            value={groqKey}
            onChange={(e) => setGroqKey(e.target.value)}
            placeholder="gsk_... (Enter your Groq API key from console.groq.com)"
            className="df-input"
            style={{ fontFamily: "monospace" }}
          />
        </div>

        {/* Default Groq Model */}
        <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{
              padding: "0.65rem",
              borderRadius: "0.75rem",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#10B981"
            }}>
              <Cpu style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#FFFFFF" }}>
                Active Groq Model
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Primary LLM engine used for project code synthesis
              </p>
            </div>
          </div>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            readOnly
            className="df-input"
            style={{ fontFamily: "monospace", opacity: 0.8 }}
          />
        </div>

        {/* Backend Endpoint URL */}
        <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{
              padding: "0.65rem",
              borderRadius: "0.75rem",
              background: "rgba(167, 139, 250, 0.1)",
              border: "1px solid rgba(167, 139, 250, 0.25)",
              color: "#A78BFA"
            }}>
              <Server style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#FFFFFF" }}>
                FastAPI Backend Server URL
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Address of your running DevForge FastAPI orchestration server
              </p>
            </div>
          </div>
          <input
            type="text"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            className="df-input"
            style={{ fontFamily: "monospace" }}
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="df-button df-button-primary"
          style={{
            alignSelf: "flex-start",
            padding: "0.85rem 1.5rem",
            fontSize: "0.875rem",
            borderRadius: "0.75rem"
          }}
        >
          {saved ? <Check style={{ width: 16, height: 16, color: "#34D399" }} /> : null}
          <span>{saved ? "Settings Saved Successfully!" : "Save Configuration"}</span>
        </motion.button>
      </form>
    </motion.div>
  );
};
