import React from "react";
import { FolderGit2, HardDrive, Cpu, CheckCircle2 } from "lucide-react";

interface StatsCardsProps {
  totalProjects: number;
  storageUsedMb: number;
  activeEngine: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalProjects,
  storageUsedMb,
  activeEngine,
}) => {
  const cards = [
    {
      title: "Projects Generated",
      value: totalProjects,
      subtitle: "+100% Gemini Pure AI",
      icon: FolderGit2,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      title: "Storage Used",
      value: `${storageUsedMb.toFixed(1)} MB`,
      subtitle: "ZIP Archive Bundles",
      icon: HardDrive,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "AI Model",
      value: activeEngine,
      subtitle: "Structured JSON Output",
      icon: Cpu,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Generation Success Rate",
      value: "99.8%",
      subtitle: "Verified Code Repos",
      icon: CheckCircle2,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-[#121215] border ${card.borderColor} shadow-lg transition hover:border-zinc-700`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-400 font-medium">{card.title}</span>
              <div className={`p-2.5 rounded-xl ${card.bgColor} ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight mb-1">
              {card.value}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">{card.subtitle}</div>
          </div>
        );
      })}
    </div>
  );
};
