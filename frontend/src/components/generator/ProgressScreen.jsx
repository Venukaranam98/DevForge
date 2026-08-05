import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2, Loader2, Package, FileCode, Shield } from "lucide-react";

export const ProgressScreen = ({ prompt }) => {
  const steps = [
    { label: "Validating prompt parameters & environment configuration", icon: Shield },
    { label: "Contacting Groq AI API (llama-3.3-70b-versatile)", icon: Cpu },
    { label: "Generating source code, Docker setup & architecture", icon: FileCode },
    { label: "Synthesizing directory structure & file content", icon: Package },
    { label: "Packaging production-ready starter ZIP bundle", icon: CheckCircle2 },
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 5, 7, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="glass-panel"
          style={{
            maxWidth: "32rem",
            width: "100%",
            borderRadius: "1.25rem",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px var(--accent-glow)"
          }}
        >
          <div style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "1rem",
            background: "var(--accent)",
            margin: "0 auto 1.5rem auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px var(--accent-glow-strong)"
          }}>
            <Loader2 style={{ width: 32, height: 32, color: "#FFFFFF", animation: "spin 1s linear infinite" }} />
          </div>

          <h3 style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            fontFamily: "var(--font-heading)",
            color: "#FFFFFF",
            marginBottom: "0.4rem"
          }}>
            Synthesizing Project Repository
          </h3>
          <p style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            fontFamily: "monospace",
            marginBottom: "1.75rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "0 1rem"
          }}>
            "{prompt}"
          </p>

          {/* Dynamic Progress Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", textAlign: "left", marginBottom: "1.75rem" }}>
            {steps.map((step, idx) => {
              const isDone = idx < activeStep;
              const isCurrent = idx === activeStep;

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "0.75rem",
                    background: isCurrent ? "rgba(139, 92, 246, 0.12)" : isDone ? "rgba(255, 255, 255, 0.02)" : "transparent",
                    border: isCurrent ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid transparent",
                    color: isCurrent ? "#F5F5F7" : isDone ? "var(--text-secondary)" : "var(--text-muted)",
                    opacity: isCurrent || isDone ? 1 : 0.45,
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{
                    width: "1.75rem",
                    height: "1.75rem",
                    borderRadius: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    background: isDone ? "rgba(16, 185, 129, 0.2)" : isCurrent ? "var(--accent)" : "rgba(255, 255, 255, 0.06)",
                    color: isDone ? "#34D399" : isCurrent ? "#FFFFFF" : "var(--text-muted)"
                  }}>
                    {isDone ? <CheckCircle2 style={{ width: 14, height: 14 }} /> : idx + 1}
                  </div>
                  <span style={{ fontSize: "0.8rem", fontFamily: "monospace", flex: 1 }}>{step.label}</span>
                  {isCurrent && <Loader2 style={{ width: 14, height: 14, color: "var(--accent)", animation: "spin 1s linear infinite" }} />}
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
            Groq AI is compiling production code. Takes ~3–8 seconds...
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
