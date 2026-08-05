import React from "react";
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  LayoutTemplate, 
  Settings, 
  User, 
  Terminal,
  Zap
} from "lucide-react";

export type NavTab = "dashboard" | "generate" | "history" | "templates" | "settings" | "profile";

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "generate", label: "Generate Project", icon: Sparkles, highlight: true },
    { id: "history", label: "History", icon: History },
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0c0c0e] border-r border-[#1f1f23] flex flex-col justify-between p-4 sticky top-0">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-[#1f1f23]">
          <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wide">DevForge</h1>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>v2.0 Gemini AI</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as NavTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-inner"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#16161a]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-zinc-500"}`} />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Zap className="w-2.5 h-2.5" /> AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Storage / Pro Badge */}
      <div className="p-3 rounded-2xl bg-[#131317] border border-[#1f1f23]">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <span>Engine Status</span>
          <span className="text-emerald-400 font-mono">Ready</span>
        </div>
        <div className="w-full bg-[#202026] h-1.5 rounded-full overflow-hidden mb-3">
          <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[24%]" />
        </div>
        <p className="text-[11px] text-zinc-500 leading-tight">
          Powered by Gemini 2.5 AI Model & FastAPI Orchestration.
        </p>
      </div>
    </aside>
  );
};
