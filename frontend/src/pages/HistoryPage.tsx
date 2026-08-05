import React, { useEffect, useState } from "react";
import { RecentProjectsTable } from "../components/dashboard/RecentProjectsTable";
import { projectService } from "../services/projectService";
import { Project } from "../types";
import { Search } from "lucide-react";

interface HistoryPageProps {
  onPreviewProject: (project: Project) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onPreviewProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService
      .getProjects(0, 100)
      .then((res) => {
        setProjects(res.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("History fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      p.project_name.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (downloadUrl: string, name: string) => {
    projectService.downloadZip(downloadUrl, name);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Project Generation History</h2>
          <p className="text-xs text-zinc-400">View, preview, and download all past project starter archives</p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history by name or prompt..."
            className="w-full bg-[#121215] border border-[#232328] rounded-xl text-xs text-zinc-300 pl-9 pr-3 py-2.5 outline-none focus:border-indigo-500 transition font-mono"
          />
        </div>
      </div>

      <RecentProjectsTable
        projects={filteredProjects}
        onPreview={onPreviewProject}
        onDownload={handleDownload}
      />
    </div>
  );
};
