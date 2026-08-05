import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PromptEditor } from "../components/generator/PromptEditor";
import { TechStackSelector } from "../components/generator/TechStackSelector";
import { TemplatePills } from "../components/generator/TemplatePills";
import { ProgressScreen } from "../components/generator/ProgressScreen";
import { Toast } from "../components/ui/Toast";
import { projectService } from "../services/projectService";

export const GeneratorPage = ({ initialPrompt = "", onGenerationComplete }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleAppendTag = (tag) => {
    setPrompt((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `Build a project using ${tag}.`;
      if (trimmed.toLowerCase().includes(tag.toLowerCase())) return prev;
      return `${trimmed} including ${tag}.`;
    });
  };

  const handleSelectTemplate = (tplPrompt, tplName) => {
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
    } catch (err) {
      console.error("Generation error:", err);
      setError(err.response?.data?.detail || "Project generation failed. Please check your Groq API key and try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="df-container"
      style={{ position: "relative" }}
    >
      {/* Toast Notification */}
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

      {/* Loading Overlay */}
      {loading && <ProgressScreen prompt={prompt} />}

      {/* Preset Starters */}
      <TemplatePills onSelectTemplate={handleSelectTemplate} />

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "start" }}>
        <div style={{ gridColumn: "span 2" }}>
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
    </motion.div>
  );
};
