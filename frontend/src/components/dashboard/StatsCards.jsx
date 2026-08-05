import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, HardDrive, Cpu, CheckCircle2 } from "lucide-react";

export const StatsCards = ({ totalProjects, storageUsedMb, activeEngine }) => {
  const cards = [
    {
      title: "Projects Generated",
      value: totalProjects,
      subtitle: "+100% Groq Pure AI",
      icon: FolderGit2,
      color: "#8B5CF6",
      bg: "rgba(139, 92, 246, 0.1)"
    },
    {
      title: "Storage Used",
      value: `${storageUsedMb.toFixed(1)} MB`,
      subtitle: "ZIP Archive Bundles",
      icon: HardDrive,
      color: "#A78BFA",
      bg: "rgba(167, 139, 250, 0.1)"
    },
    {
      title: "AI Model",
      value: activeEngine || "Groq Llama 3.3",
      subtitle: "Structured JSON Output",
      icon: Cpu,
      color: "#10B981",
      bg: "rgba(16, 185, 129, 0.1)"
    },
    {
      title: "Generation Success",
      value: "99.9%",
      subtitle: "Verified Code Repos",
      icon: CheckCircle2,
      color: "#EC4899",
      bg: "rgba(236, 72, 153, 0.1)"
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem"
    }}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass-panel glass-panel-hover"
            style={{
              padding: "1.25rem",
              borderRadius: "0.875rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifySpace: "between", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontWeight: 500 }}>
                {card.title}
              </span>
              <div style={{
                padding: "0.5rem",
                borderRadius: "0.65rem",
                background: card.bg,
                color: card.color
              }}>
                <Icon style={{ width: 16, height: 16 }} />
              </div>
            </div>
            <div style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              color: "#FFFFFF",
              marginBottom: "0.2rem"
            }}>
              {card.value}
            </div>
            <div style={{ fontSize: "0.725rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
              {card.subtitle}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
