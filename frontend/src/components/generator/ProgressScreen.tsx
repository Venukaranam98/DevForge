import React, { useEffect, useState } from "react";
import { Cpu, CheckCircle2, Loader2, Package, FileCode, Shield } from "lucide-react";

interface ProgressScreenProps {
  prompt: string;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ prompt }) => {
  const steps = [
    { label: "Validating user prompt & rate limit constraints", icon: Shield },
    { label: "Contacting Gemini AI Model API for generation", icon: Cpu },
    { label: "Generating full source code, Docker configs & CI/CD", icon: FileCode },
    { label: "Writing directory structure & file assets", icon: Package },
    { label: "Packaging production ready starter ZIP archive", icon: CheckCircle2 },
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#09090b]/90 backdrop-blur-xl z-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full rounded-3xl glass-panel-glow p-8 border border-indigo-500/30 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl gradient-accent mx-auto flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/30 animate-pulse">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
          Generating Project Repository
        </h3>
        <p className="text-xs text-zinc-400 font-mono mb-8 line-clamp-2 px-4">
          "{prompt}"
        </p>

        {/* Dynamic Progress Steps */}
        <div className="space-y-3 text-left mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 p-3 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? "bg-indigo-500/15 border border-indigo-500/30 text-indigo-300"
                    : isDone
                    ? "bg-[#141419] text-zinc-400 opacity-75"
                    : "text-zinc-600 opacity-40"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : isCurrent
                      ? "bg-indigo-500 text-white animate-pulse"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className="text-xs font-mono font-medium flex-1">{step.label}</span>
                {isCurrent && <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />}
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-zinc-500 font-mono">
          Gemini AI is crafting production code. This takes ~5–12 seconds...
        </div>
      </div>
    </div>
  );
};
