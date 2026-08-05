import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Lock, Mail, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { authService } from "../services/authService";

export const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await authService.login(email, password);
      } else {
        if (!fullName.trim()) {
          setError("Full name is required for registration.");
          setLoading(false);
          return;
        }
        result = await authService.register(email, password, fullName);
      }
      if (onAuthSuccess) {
        onAuthSuccess(result.user);
      }
    } catch (err) {
      console.error("Auth error:", err);
      const detail = err.response?.data?.detail;
      setError(detail || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@devforge.ai");
    setPassword("password123");
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(13, 14, 20, 1) 70%)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Ambient Glows */}
      <div style={{
        position: "absolute",
        top: "-15%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "2.5rem",
          borderRadius: "1.25rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 10
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
            boxShadow: "0 0 25px var(--accent-glow)",
            marginBottom: "1rem"
          }}>
            <Terminal style={{ width: 28, height: 28, color: "#FFFFFF" }} />
          </div>
          <h1 style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem"
          }}>
            DevForge AI
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            {isLogin ? "Sign in to access your AI project workspace" : "Create an account to start generating repositories"}
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{
          display: "flex",
          background: "rgba(255, 255, 255, 0.05)",
          padding: "0.25rem",
          borderRadius: "0.75rem",
          marginBottom: "1.5rem",
          border: "1px solid var(--border)"
        }}>
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(""); }}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: isLogin ? "var(--accent)" : "transparent",
              color: isLogin ? "#FFFFFF" : "var(--text-muted)",
              transition: "all 0.2s ease"
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(""); }}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: !isLogin ? "var(--accent)" : "transparent",
              color: !isLogin ? "#FFFFFF" : "var(--text-muted)",
              transition: "all 0.2s ease"
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#FCA5A5",
            fontSize: "0.825rem",
            marginBottom: "1.25rem",
            lineHeight: 1.4
          }}>
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {!isLogin && (
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--text-secondary)" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-muted)" }} />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="df-input"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--text-secondary)" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-muted)" }} />
              <input
                type="email"
                required
                placeholder="developer@devforge.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="df-input"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--text-secondary)" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-muted)" }} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="df-input"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="df-button df-button-primary"
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              fontSize: "0.95rem",
              justifyContent: "center",
              width: "100%"
            }}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
                <ArrowRight style={{ width: 18, height: 18 }} />
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Helper */}
        {isLogin && (
          <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <button
              type="button"
              onClick={handleDemoLogin}
              style={{
                background: "none",
                border: "none",
                color: "#A78BFA",
                fontSize: "0.8rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                textDecoration: "underline"
              }}
            >
              <Sparkles style={{ width: 12, height: 12 }} /> Fill demo login credentials
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
