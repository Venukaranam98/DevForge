import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, FileCode } from "lucide-react";

export const CodeViewer = ({ file }) => {
  const [copied, setCopied] = useState(false);

  if (!file) {
    return (
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem",
        color: "var(--text-muted)",
        fontSize: "0.8rem",
        fontFamily: "monospace"
      }}>
        Select a file from the explorer on the left to preview code.
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = file.content.split("\n");

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "#050507" }}>
      {/* File Top Bar */}
      <div style={{
        height: "2.5rem",
        borderBottom: "1px solid var(--border)",
        background: "#0D0D11",
        padding: "0 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.775rem",
        fontFamily: "monospace"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
          <FileCode style={{ width: 15, height: 15, color: "var(--accent)" }} />
          <span style={{ fontWeight: 600, color: "#FFFFFF" }}>{file.path}</span>
          <span style={{ color: "var(--text-muted)" }}>({lines.length} lines)</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.25rem 0.65rem",
            borderRadius: "0.4rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border)",
            color: copied ? "#10B981" : "var(--text-secondary)",
            fontSize: "0.725rem",
            cursor: "pointer"
          }}
        >
          {copied ? (
            <>
              <Check style={{ width: 14, height: 14, color: "#10B981" }} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
              <span>Copy Code</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "1rem",
        fontFamily: "monospace",
        fontSize: "0.8rem",
        lineHeight: 1.6,
        background: "#07070A"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx}>
                <td style={{
                  userSelect: "none",
                  color: "var(--text-muted)",
                  textAlign: "right",
                  paddingRight: "1rem",
                  paddingLeft: "0.25rem",
                  width: "2.5rem",
                  fontSize: "0.725rem",
                  opacity: 0.6
                }}>
                  {idx + 1}
                </td>
                <td style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontFamily: "monospace", color: "#F5F5F7" }}>{line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
