import React from "react";
import { FileCode, Folder, ChevronRight, FileText, Docker, Cpu } from "lucide-react";
import { GeneratedFileItem } from "../../types";

interface FileTreeExplorerProps {
  files: GeneratedFileItem[];
  selectedPath: string;
  onSelectFile: (file: GeneratedFileItem) => void;
}

export const FileTreeExplorer: React.FC<FileTreeExplorerProps> = ({
  files,
  selectedPath,
  onSelectFile,
}) => {
  const getIcon = (path: str) => {
    if (path.includes("Dockerfile") || path.includes("docker-compose")) return FileCode;
    if (path.endsWith(".md")) return FileText;
    if (path.endsWith(".json") || path.endsWith(".yml")) return Cpu;
    return FileCode;
  };

  return (
    <div className="w-64 border-r border-[#1f1f23] bg-[#0c0c0f] flex flex-col h-full overflow-hidden">
      <div className="p-3 border-b border-[#1f1f23] text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
        <span>Project Files ({files.length})</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {files.map((file) => {
          const isSelected = selectedPath === file.path;
          const Icon = getIcon(file.path);

          return (
            <button
              key={file.path}
              onClick={() => onSelectFile(file)}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition text-left cursor-pointer ${
                isSelected
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#16161c]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-indigo-400" : "text-zinc-500"}`} />
              <span className="truncate">{file.path}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
