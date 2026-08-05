import React, { useState, useEffect } from "react";
import { 
  X, 
  Download, 
  FileCode, 
  BookOpen, 
  Cpu, 
  Container, 
  HardDrive,
  Loader2 
} from "lucide-react";
import { Project, ProjectPreview, GeneratedFileItem } from "../../types";
import { projectService } from "../../services/projectService";
import { FileTreeExplorer } from "./FileTreeExplorer";
import { CodeViewer } from "./CodeViewer";

interface ProjectPreviewModalProps {
  project: Project;
  onClose: () => void;
  onDownload: (downloadUrl: string, name: string) => void;
}

type TabType = "code" | "readme" | "architecture" | "docker";

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  project,
  onClose,
  onDownload,
}) => {
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState<ProjectPreview | null>(null);
  const [selectedFile, setSelectedFile] = useState<GeneratedFileItem | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("code");

  useEffect(() => {
    let isMounted = true;
    projectService
      .getProjectPreview(project.id)
      .then((data) => {
        if (isMounted) {
          setPreviewData(data);
          if (data.files && data.files.length > 0) {
            setSelectedFile(data.files[0]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Preview load error:", err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [project.id]);

  const readmeFile = previewData?.files.find((f) => f.path.toLowerCase().includes("readme.md"));
  const dockerFile = previewData?.files.find(
    (f) => f.path.includes("Dockerfile") || f.path.includes("docker-compose")
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl h-[85vh] rounded-3xl bg-[#0c0c0f] border border-[#22222a] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="h-16 px-6 border-b border-[#1f1f23] flex items-center justify-between bg-[#121216]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>{project.project_name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {project.backend || "FastAPI"}
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono line-clamp-1 max-w-md">
                "{project.prompt}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                onDownload(
                  project.download_url || `/download/${project.project_name}.zip`,
                  `${project.project_name}.zip`
                )
              }
              className="px-4 py-2 rounded-xl gradient-accent text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download ZIP</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1c1c22] hover:bg-[#282832] text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-[#0f0f13] border-b border-[#1f1f23] flex gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab("code")}
            className={`py-3 flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === "code"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Code Tree Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab("readme")}
            className={`py-3 flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === "readme"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>README Documentation</span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`py-3 flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === "architecture"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Architecture Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab("docker")}
            className={`py-3 flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === "docker"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Container className="w-4 h-4" />
            <span>Docker & CI Setup</span>
          </button>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="h-full flex items-center justify-center text-zinc-400 gap-3 font-mono text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
              <span>Fetching project files from backend...</span>
            </div>
          ) : (
            <>
              {activeTab === "code" && (
                <div className="h-full flex">
                  <FileTreeExplorer
                    files={previewData?.files || []}
                    selectedPath={selectedFile?.path || ""}
                    onSelectFile={(f) => setSelectedFile(f)}
                  />
                  <CodeViewer file={selectedFile} />
                </div>
              )}

              {activeTab === "readme" && (
                <div className="h-full overflow-y-auto p-8 font-mono text-sm text-zinc-200 leading-relaxed bg-[#0a0a0d]">
                  {readmeFile ? (
                    <pre className="whitespace-pre-wrap font-mono text-zinc-300">
                      {readmeFile.content}
                    </pre>
                  ) : (
                    <div className="text-zinc-500">No README.md found in generated files.</div>
                  )}
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="h-full overflow-y-auto p-8 bg-[#0a0a0d] space-y-6">
                  <div className="p-6 rounded-2xl bg-[#121217] border border-[#202028]">
                    <h4 className="text-lg font-bold text-white mb-2">System Architecture Summary</h4>
                    <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                      {previewData?.architecture || "Production ready architecture crafted by Gemini AI."}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                      <div className="text-zinc-500 mb-1 uppercase tracking-wider text-[10px]">Total Files</div>
                      <div className="text-xl font-bold text-indigo-400">{previewData?.file_count || 12} files</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                      <div className="text-zinc-500 mb-1 uppercase tracking-wider text-[10px]">ZIP Size</div>
                      <div className="text-xl font-bold text-purple-400">{previewData?.storage_size_kb || 42} KB</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                      <div className="text-zinc-500 mb-1 uppercase tracking-wider text-[10px]">AI Engine</div>
                      <div className="text-xl font-bold text-emerald-400">Gemini 2.5</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "docker" && (
                <div className="h-full overflow-y-auto p-8 bg-[#0a0a0d]">
                  {dockerFile ? (
                    <div className="p-6 rounded-2xl bg-[#121217] border border-[#202028]">
                      <h4 className="text-sm font-bold text-white mb-3 font-mono">{dockerFile.path}</h4>
                      <pre className="whitespace-pre-wrap font-mono text-xs text-zinc-300 bg-[#09090b] p-4 rounded-xl">
                        {dockerFile.content}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-zinc-500 text-xs font-mono">
                      Docker setup included in repository files. Select "Dockerfile" or "docker-compose.yml" from Code Explorer tab.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
