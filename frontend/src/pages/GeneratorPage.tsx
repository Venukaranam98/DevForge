import React, { useState, useEffect } from "react";
import { PromptEditor } from "../components/generator/PromptEditor";
import { TechStackSelector } from "../components/generator/TechStackSelector";
import { TemplatePills } from "../components/generator/TemplatePills";
import { ProgressScreen } from "../components/generator/ProgressScreen";
import { projectService } from "../services/projectService";
import { Project } from "../types";

interface GeneratorPageProps {
  initialPrompt?: string;
  onGenerationComplete: (project: Project) => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({
  initialPrompt = "",
  onGenerationComplete,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleAppendTag = (tag: string) => {
    setPrompt((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `Build a project using ${tag}.`;
      if (trimmed.toLowerCase().includes(tag.toLowerCase())) return prev;
      return `${trimmed} including ${tag}.`;
    });
  };

  const handleSelectTemplate = (tplPrompt: string, tplName: string) => {
    setPrompt(tplPrompt);
    setProjectName(tplName);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    try {
      setLoading(true);
      setError(null);

      const createdProject = await projectService.generateProject({
        prompt: prompt.trim(),
        project_name: projectName.trim() || undefined,
      });

      setLoading(false);
      onGenerationComplete(createdProject);
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.response?.data?.detail || "Project generation failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 relative">
      {/* Loading Step Overlay */}
      {loading && <ProgressScreen prompt={prompt} />}

      {/* Preset Starters Header */}
      <TemplatePills onSelectTemplate={handleSelectTemplate} />

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              <strong>Error:</strong> {error}
            </div>
          )}
          <PromptEditor
            prompt={prompt}
            setPrompt={setPrompt}
            projectName={projectName}
            setProjectName={setProjectName}
            onGenerate={handleGenerate}
            loading={loading}
          />
        </div>

        <div>
          <TechStackSelector onAppendTag={handleAppendTag} />
        </div>
      </div>
    </div>
  );
};
