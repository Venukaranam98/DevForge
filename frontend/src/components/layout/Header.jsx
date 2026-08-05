import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Bell, Search, Cpu } from "lucide-react";

export const Header = ({ title, onNewProjectClick }) => {
  return (
    <header className="glass-panel" style={{
      height: "4rem",
      borderBottom: "1px solid var(--border)",
      background: "rgba(13, 13, 17, 0.8)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      padding: "0 1.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 30
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2 style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.02em"
        }}>
          {title}
        </h2>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.25rem 0.65rem",
          borderRadius: "9999px",
          background: "rgba(139, 92, 246, 0.1)",
          border: "1px solid rgba(139, 92, 246, 0.25)",
          color: "#A78BFA",
          fontSize: "0.725rem",
          fontWeight: 600
        }}>
          <Cpu style={{ width: 14, height: 14 }} />
          <span>Groq Llama 3.3 Active</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Search Bar */}
        <div style={{ position: "relative", width: "220px" }}>
          <Search style={{
            position: "absolute",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: 14,
            height: 14,
            color: "var(--text-muted)"
          }} />
          <input
            type="text"
            placeholder="Search projects..."
            className="df-input"
            style={{
              paddingLeft: "2.25rem",
              paddingTop: "0.45rem",
              paddingBottom: "0.45rem",
              fontSize: "0.8rem",
              borderRadius: "0.65rem"
            }}
          />
        </div>

        {/* Quick Generate Button */}
        {onNewProjectClick && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNewProjectClick}
            className="df-button df-button-primary"
            style={{
              padding: "0.45rem 1rem",
              fontSize: "0.8rem",
              borderRadius: "0.65rem",
              boxShadow: "0 0 20px var(--accent-glow)"
            }}
          >
            <Sparkles style={{ width: 14, height: 14 }} />
            <span>New Project</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "0.5rem",
            borderRadius: "0.65rem",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            cursor: "pointer"
          }}
        >
          <Bell style={{ width: 16, height: 16 }} />
        </motion.button>
      </div>
    </header>
  );
};
