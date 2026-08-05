import React from "react";
import { Sparkles, Bell, Search, ShieldCheck } from "lucide-react";

interface HeaderProps {
  title: string;
  onNewProjectClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onNewProjectClick }) => {
  return (
    <header className="h-16 border-b border-[#1f1f23] bg-[#09090b]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Gemini 2.5 Active</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or stacks..."
            className="w-full bg-[#141417] border border-[#232328] rounded-xl text-xs text-zinc-300 pl-9 pr-3 py-2 outline-none focus:border-indigo-500/50 transition"
          />
        </div>

        {/* Quick Generate Action */}
        {onNewProjectClick && (
          <button
            onClick={onNewProjectClick}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl gradient-accent text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 hover:opacity-90 active:scale-95 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        )}

        <button className="p-2 rounded-xl bg-[#141417] border border-[#232328] text-zinc-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
