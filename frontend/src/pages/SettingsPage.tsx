import React, { useState, useEffect } from "react";
import { Key, Server, Check } from "lucide-react";

export const SettingsPage: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState("");
  const [backendUrl, setBackendUrl] = useState("http://localhost:8000");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("devforge_gemini_key");
    if (key) setGeminiKey(key);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (geminiKey.trim()) {
      localStorage.setItem("devforge_gemini_key", geminiKey.trim());
    } else {
      localStorage.removeItem("devforge_gemini_key");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Platform Settings</h2>
        <p className="text-xs text-zinc-400">Configure your Gemini AI API Key, backend server URL, and generation preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Gemini API Key */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#1f1f23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Gemini API Key</h3>
              <p className="text-xs text-zinc-500">Your Gemini API key used for generating 100% of all project repositories</p>
            </div>
          </div>
          <input
            type="password"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIzaSy... (Enter your Gemini API key)"
            className="w-full bg-[#17171c] border border-[#232328] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
          />
        </div>

        {/* Backend Endpoint URL */}
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#1f1f23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">FastAPI Backend Server URL</h3>
              <p className="text-xs text-zinc-500">Address of your running FastAPI orchestration server</p>
            </div>
          </div>
          <input
            type="text"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            className="w-full bg-[#17171c] border border-[#232328] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl gradient-accent text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
          <span>{saved ? "Settings Saved Successfully!" : "Save Configuration"}</span>
        </button>
      </form>
    </div>
  );
};
