import React from "react";
import { Download, Eye, Terminal, Clock, FileCode, HardDrive } from "lucide-react";
import { Project } from "../../types";

interface RecentProjectsTableProps {
  projects: Project[];
  onPreview: (project: Project) => void;
  onDownload: (downloadUrl: string, name: string) => void;
}

export const RecentProjectsTable: React.FC<RecentProjectsTableProps> = ({
  projects,
  onPreview,
  onDownload,
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-[#121215] border border-[#1f1f23]">
        <Terminal className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-zinc-300 mb-1">No Projects Generated Yet</h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Type a prompt in the Project Generator to create your first AI-generated starter repository.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#121215] border border-[#1f1f23] overflow-hidden shadow-xl">
      <div className="p-5 border-b border-[#1f1f23] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Recent Projects</h3>
          <p className="text-xs text-zinc-400">All Gemini AI generated project repositories</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300">
          {projects.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#17171c] text-zinc-400 font-mono uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-5">Project Name & Prompt</th>
              <th className="py-3 px-4">Stack / Type</th>
              <th className="py-3 px-4">Files & Size</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f1f23] text-zinc-300">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-[#18181d] transition">
                <td className="py-4 px-5">
                  <div className="font-semibold text-white text-sm mb-0.5">
                    {project.project_name}
                  </div>
                  <div className="text-zinc-500 line-clamp-1 max-w-md font-mono text-[11px]">
                    "{project.prompt}"
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                      {project.backend || "FastAPI"}
                    </span>
                    {project.database && (
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                        {project.database}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-4 px-4 font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                      {project.file_count || 12} files
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <HardDrive className="w-3.5 h-3.5" />
                      {project.storage_size_kb ? `${project.storage_size_kb} KB` : "32 KB"}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4 text-zinc-500 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </td>

                <td className="py-4 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onPreview(project)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() =>
                        onDownload(
                          project.download_url || `/download/${project.project_name}.zip`,
                          `${project.project_name}.zip`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg gradient-accent hover:opacity-90 text-white font-medium shadow-md transition flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ZIP</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
