import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Database, Server, Cpu } from "lucide-react";

interface TemplatesPageProps {
  onSelectTemplate: (prompt: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      title: "Ecommerce Backend API",
      category: "Python / FastAPI",
      description: "FastAPI backend with PostgreSQL models, JWT authentication, Redis caching, Celery worker queue, and Docker Compose.",
      prompt: "Build an Ecommerce Backend using FastAPI PostgreSQL JWT Redis Docker Celery Swagger.",
      icon: Server,
      badge: "Popular",
    },
    {
      title: "Hospital Management Microservice",
      category: "Healthcare SaaS",
      description: "Complete hospital management backend with patient records, doctor scheduling, JWT security, PostgreSQL, and Swagger UI docs.",
      prompt: "Create a Hospital Management Backend using FastAPI PostgreSQL Docker JWT Redis Celery Swagger.",
      icon: ShieldCheck,
      badge: "Enterprise",
    },
    {
      title: "Node.js Express Microservice",
      category: "Node.js / Express",
      description: "Scalable Node.js Express REST API starter with MongoDB, JWT Auth, Swagger docs, environment config, and Docker containerization.",
      prompt: "Build a Node.js Express REST API with MongoDB, JWT Authentication, Swagger Docs, and Docker Compose.",
      icon: Database,
      badge: "Node",
    },
    {
      title: "Fullstack SaaS Starter Stack",
      category: "React + FastAPI",
      description: "Production grade fullstack application template with React Vite frontend, FastAPI backend, PostgreSQL, Docker, and GitHub Actions CI/CD.",
      prompt: "Create a Fullstack SaaS template with FastAPI backend, PostgreSQL, JWT Auth, React Vite frontend, Docker, and GitHub Actions.",
      icon: Cpu,
      badge: "Fullstack",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Curated Project Templates</h2>
        <p className="text-xs text-zinc-400">Production-ready starter repository blueprints powered by Gemini AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl, idx) => {
          const Icon = tpl.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121215] border border-[#1f1f23] hover:border-indigo-500/40 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition">
                        {tpl.title}
                      </h3>
                      <span className="text-xs text-zinc-500 font-mono">{tpl.category}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300">
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                  {tpl.description}
                </p>
              </div>

              <button
                onClick={() => onSelectTemplate(tpl.prompt)}
                className="w-full py-3 rounded-xl bg-[#18181e] border border-[#252530] text-zinc-200 text-xs font-semibold hover:bg-indigo-600 hover:text-white hover:border-transparent transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Use This Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
