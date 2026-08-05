import React from "react";
import { User, ShieldCheck, HardDrive, Terminal } from "lucide-react";

export const ProfilePage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Developer Profile</h2>
        <p className="text-xs text-zinc-400">Account status and API quota details</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#121215] border border-[#1f1f23] flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center text-white text-xl font-bold shadow-xl shadow-indigo-500/20">
          DF
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">DevForge Developer</h3>
          <p className="text-xs text-zinc-400 font-mono">admin@devforge.ai</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Pro Tier Unlimited
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-[#121215] border border-[#1f1f23]">
          <div className="text-zinc-500 mb-1 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-purple-400" />
            <span>Allowed Quota</span>
          </div>
          <div className="text-xl font-bold text-white">Unlimited Generation</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121215] border border-[#1f1f23]">
          <div className="text-zinc-500 mb-1 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>AI Model Engine</span>
          </div>
          <div className="text-xl font-bold text-emerald-400">Gemini 2.5 Flash</div>
        </div>
      </div>
    </div>
  );
};
