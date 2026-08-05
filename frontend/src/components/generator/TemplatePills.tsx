import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface TemplatePillsProps {
  onSelectTemplate: (prompt: string, name: string) => void;
}

export const TemplatePills: React.FC<TemplatePillsProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      title: "Ecommerce Backend API",
      prompt: "Build an Ecommerce Backend using FastAPI PostgreSQL JWT Redis Docker Celery Swagger.",
      name: "ecommerce-backend-api",
      badge: "Popular",
    },
    {
      title: "Hospital Management",
      prompt: "Create a Hospital Management Backend using FastAPI PostgreSQL Docker JWT Redis Celery Swagger.",
      name: "hospital-management-api",
      badge: "Enterprise",
    },
    {
      title: "Node.js Express Microservice",
      prompt: "Build a Node.js Express REST API with MongoDB, JWT Authentication, Swagger Docs, and Docker Compose.",
      name: "node-express-microservice",
      badge: "Node",
    },
    {
      title: "Fullstack React + Python Starter",
      prompt: "Create a Fullstack SaaS template with FastAPI backend, PostgreSQL, JWT Auth, React Vite frontend, Docker, and GitHub Actions.",
      name: "fullstack-saas-starter",
      badge: "Fullstack",
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Quick Preset Starters</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {templates.map((tpl, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTemplate(tpl.prompt, tpl.name)}
            className="p-3.5 rounded-xl bg-[#121215] border border-[#1f1f23] text-left hover:border-indigo-500/40 hover:bg-[#16161b] transition group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs text-white group-hover:text-indigo-300 transition">
                {tpl.title}
              </span>
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400">
                  {tpl.badge}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 line-clamp-1 font-mono">{tpl.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
