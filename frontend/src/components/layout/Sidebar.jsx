import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Sparkles, 
  History,
  LayoutTemplate, 
  Settings, 
  User as UserIcon, 
  Terminal,
  Zap,
  Cpu,
  LogOut
} from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "generate", label: "Generate Project", icon: Sparkles, highlight: true },
    { id: "history", label: "History", icon: History },
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <aside style={{
      width: "16rem",
      height: "100vh",
      background: "var(--bg-sidebar)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "1.25rem",
      position: "sticky",
      top: 0,
      zIndex: 40
    }}>
      <div>
        {/* Brand Logo Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.5rem 0.5rem 1.25rem 0.5rem",
          marginBottom: "1.25rem",
          borderBottom: "1px solid var(--border)"
        }}>
          <div style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.75rem",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px var(--accent-glow)"
          }}>
            <Terminal style={{ width: 20, height: 20, color: "#FFFFFF" }} />
          </div>
          <div>
            <h1 style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.01em"
            }}>
              DevForge
            </h1>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.725rem",
              color: "#A78BFA",
              fontWeight: 500
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "9999px",
                background: "#10B981"
              }} />
              <span>v2.0 Groq AI</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: isActive ? "1px solid rgba(139, 92, 246, 0.35)" : "1px solid transparent",
                  background: isActive ? "rgba(139, 92, 246, 0.12)" : "transparent",
                  color: isActive ? "#F5F5F7" : "var(--text-muted)",
                  transition: "all 0.15s ease"
                }}
              >
                <Icon style={{ width: 18, height: 18, color: isActive ? "var(--accent)" : "var(--text-muted)" }} />
                <span>{item.label}</span>
                {item.highlight && (
                  <span style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "9999px",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    background: "rgba(139, 92, 246, 0.2)",
                    color: "#C4B5FD",
                    border: "1px solid rgba(139, 92, 246, 0.3)"
                  }}>
                    <Zap style={{ width: 10, height: 10 }} /> Groq
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Footer User & Engine Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {user && (
          <div className="glass-panel" style={{
            padding: "0.75rem 0.85rem",
            borderRadius: "0.875rem",
            background: "rgba(255, 255, 255, 0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", overflow: "hidden" }}>
              <div style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#FFFFFF"
              }}>
                {(user.full_name || user.email || "U")[0].toUpperCase()}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {user.full_name || "Developer"}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {user.email}
                </div>
              </div>
            </div>
            <button
              title="Sign Out"
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "0.35rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <LogOut style={{ width: 16, height: 16 }} />
            </button>
          </div>
        )}

        <div className="glass-panel" style={{
          padding: "0.85rem",
          borderRadius: "0.875rem",
          background: "var(--bg-card)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Cpu style={{ width: 12, height: 12, color: "var(--accent)" }} /> Groq Llama 3.3
            </span>
            <span style={{ color: "#10B981", fontWeight: 600 }}>Active</span>
          </div>
          <div style={{ width: "100%", background: "rgba(255, 255, 255, 0.06)", height: "4px", borderRadius: "9999px", overflow: "hidden", marginBottom: "0.5rem" }}>
            <div style={{ background: "linear-gradient(90deg, #8B5CF6, #10B981)", height: "100%", width: "100%" }} />
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.3 }}>
            High-performance project synthesis powered by Groq Llama 3.3 70B.
          </p>
        </div>
      </div>
    </aside>
  );
};
