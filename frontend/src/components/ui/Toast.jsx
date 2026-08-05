import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export const Toast = ({ message, type = "info", onClose }) => {
  if (!message) return null;

  const isError = type === "error";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.875rem 1.25rem",
          borderRadius: "0.875rem",
          background: isError ? "#1C0A0A" : "#0D0D11",
          border: `1px solid ${isError ? "rgba(239, 68, 68, 0.3)" : "rgba(139, 92, 246, 0.3)"}`,
          boxShadow: isError
            ? "0 10px 30px rgba(239, 68, 68, 0.2)"
            : "0 10px 30px rgba(139, 92, 246, 0.2)",
          color: "#F5F5F7",
          maxWidth: "420px"
        }}
      >
        {isError ? (
          <AlertCircle style={{ color: "#EF4444", width: 20, height: 20, flexShrink: 0 }} />
        ) : (
          <CheckCircle2 style={{ color: "#10B981", width: 20, height: 20, flexShrink: 0 }} />
        )}
        <span style={{ fontSize: "0.85rem", fontWeight: 500, lineHeight: 1.4 }}>
          {message}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#A1A1AA",
              cursor: "pointer",
              marginLeft: "auto",
              padding: "2px"
            }}
          >
            <X style={{ width: 16, height: 16 }} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
