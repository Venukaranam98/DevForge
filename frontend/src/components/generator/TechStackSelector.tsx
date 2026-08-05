import React from "react";
import { Layers, Plus } from "lucide-react";

interface TechStackSelectorProps {
  onAppendTag: (tag: string) => void;
}

export const TechStackSelector: React.FC<TechStackSelectorProps> = ({ onAppendTag }) => {
  const stackCategories = [
    {
      category: "Backend Frameworks",
      tags: ["FastAPI", "Node.js (Express)", "Django", "Go (Gin)", "Spring Boot"],
    },
    {
      category: "Databases & Storage",
      tags: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "MySQL"],
    },
    {
      category: "Frontend Stack",
      tags: ["React + Vite", "Next.js", "Vue.js", "TailwindCSS"],
    },
    {
      category: "DevOps & Tooling",
      tags: ["Docker & Compose", "JWT Authentication", "Celery Tasks", "Swagger Docs", "GitHub Actions"],
    },
  ];

  return (
    <div className="rounded-2xl bg-[#121215] border border-[#1f1f23] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-indigo-400" />
        <h4 className="text-sm font-bold text-white tracking-tight">Technology Stack Pills</h4>
      </div>

      <div className="space-y-4">
        {stackCategories.map((cat, idx) => (
          <div key={idx}>
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
              {cat.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onAppendTag(tag)}
                  className="px-3 py-1.5 rounded-lg bg-[#18181d] border border-[#26262e] text-xs font-mono text-zinc-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-indigo-400" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
