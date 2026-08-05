import React from "react";
import { Sparkles, Terminal, Code2 } from "lucide-react";

interface PromptEditorProps {
  prompt: string;
  setPrompt: (v: string) => void;
  projectName: string;
  setProjectName: (v: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  prompt,
  setPrompt,
  projectName,
  setProjectName,
  onGenerate,
  loading,
}) => {
  return (
    <div className="rounded-2xl bg-[#121215] border border-[#1f1f23] p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">Prompt Editor</h3>
        </div>
        <span className="text-xs text-zinc-500 font-mono">Gemini 2.5 Pure Orchestration</span>
      </div>

      {/* Project Name Optional Override */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
          Project Name (Optional)
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g. hospital-management-backend"
          className="w-full bg-[#17171c] border border-[#232328] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition font-mono"
        />
      </div>

      {/* Main Prompt Textarea */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
          <span>Detailed Prompt Instruction</span>
          <span className="text-zinc-600 font-mono text-[10px]">{prompt.length} chars</span>
        </label>
        <textarea
          rows={7}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your desired project architecture, endpoints, database entities, authentication rules, and tools...

Example: Create a Hospital Management Backend using FastAPI, PostgreSQL, Docker, JWT, Redis, Celery, and Swagger API docs."
          className="w-full bg-[#17171c] border border-[#232328] rounded-xl p-4 text-sm text-zinc-100 outline-none focus:border-indigo-500 transition font-mono resize-none leading-relaxed"
        />
      </div>

      {/* Generate Submit Button */}
      <button
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full py-4 rounded-xl gradient-accent text-white font-bold text-base shadow-xl shadow-indigo-500/20 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-5 h-5" />
        <span>{loading ? "Generating Project Repository..." : "Generate Project with Gemini AI"}</span>
      </button>
    </div>
  );
};
