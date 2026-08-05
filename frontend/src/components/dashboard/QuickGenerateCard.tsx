import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface QuickGenerateCardProps {
  onGenerate: (prompt: string) => void;
}

export const QuickGenerateCard: React.FC<QuickGenerateCardProps> = ({ onGenerate }) => {
  const [quickPrompt, setQuickPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    onGenerate(quickPrompt);
  };

  return (
    <div className="p-6 rounded-2xl glass-panel-glow mb-8 relative overflow-hidden">
      <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono mb-2 uppercase tracking-wider">
        <Sparkles className="w-4 h-4" />
        <span>Quick Generator</span>
      </div>

      <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">
        What do you want to build today?
      </h3>
      <p className="text-xs text-zinc-400 mb-4 max-w-xl">
        Describe your project idea in natural language. Gemini AI will generate the entire folder tree, source code, Docker setup, and GitHub Actions repository.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={quickPrompt}
          onChange={(e) => setQuickPrompt(e.target.value)}
          placeholder="e.g. Build an Ecommerce Backend using FastAPI PostgreSQL JWT Redis Docker..."
          className="flex-1 bg-[#0d0d10] border border-[#272730] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 transition placeholder:text-zinc-600 font-mono"
        />
        <button
          type="submit"
          disabled={!quickPrompt.trim()}
          className="px-5 py-3 rounded-xl gradient-accent text-white font-semibold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 disabled:opacity-50 transition shadow-lg shadow-indigo-500/20"
        >
          <span>Generate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
