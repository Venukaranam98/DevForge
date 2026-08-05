import React from "react";
import { motion } from "framer-motion";
import { HardDrive, Terminal } from "lucide-react";

export const ProfilePage = ({ user }) => {
  const name = user?.full_name || "DevForge Developer";
  const email = user?.email || "developer@devforge.ai";
  const initials = (name[0] || email[0] || "D").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="df-container"
      style={{ maxWidth: "56rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
          Developer Profile
        </h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Account status, subscription tier, and Groq AI quota details
        </p>
      </div>

      <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "1rem",
          background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontSize: "1.5rem",
          fontWeight: 800,
          boxShadow: "0 0 25px var(--accent-glow)"
        }}>
          {initials}
        </div>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#FFFFFF" }}>
            {name}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
            {email}
          </p>
          <div style={{ marginTop: "0.5rem" }}>
            <span className="df-badge df-badge-purple" style={{ fontFamily: "monospace", fontSize: "0.7rem" }}>
              Pro Tier Unlimited
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", fontFamily: "monospace" }}>
        <div className="glass-panel" style={{ padding: "1.25rem", borderRadius: "0.875rem" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <HardDrive style={{ width: 16, height: 16, color: "#A78BFA" }} />
            <span>Allowed Quota</span>
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF" }}>Unlimited Generation</div>
        </div>
        <div className="glass-panel" style={{ padding: "1.25rem", borderRadius: "0.875rem" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Terminal style={{ width: 16, height: 16, color: "#10B981" }} />
            <span>AI Model Engine</span>
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#10B981" }}>Groq Llama 3.3 70B</div>
        </div>
      </div>
    </motion.div>
  );
};
