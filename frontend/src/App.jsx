import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { DashboardPage } from "./pages/DashboardPage";
import { GeneratorPage } from "./pages/GeneratorPage";
import { HistoryPage } from "./pages/HistoryPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProjectPreviewModal } from "./components/preview/ProjectPreviewModal";
import { projectService } from "./services/projectService";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [generatorPrompt, setGeneratorPrompt] = useState("");
  const [previewProject, setPreviewProject] = useState(null);

  const handleNavigateToGenerate = (prompt = "") => {
    if (prompt) {
      setGeneratorPrompt(prompt);
    }
    setActiveTab("generate");
  };

  const handleGenerationComplete = (createdProject) => {
    setPreviewProject(createdProject);
  };

  const handleDownloadZip = (downloadUrl, filename) => {
    projectService.downloadZip(downloadUrl, filename);
  };

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard Overview";
      case "generate":
        return "AI Project Generator";
      case "history":
        return "Generation History";
      case "templates":
        return "Starter Templates";
      case "settings":
        return "Platform Settings";
      case "profile":
        return "Developer Profile";
      default:
        return "DevForge";
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)" }}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header
          title={getTitle()}
          onNewProjectClick={() => handleNavigateToGenerate("")}
        />

        <main style={{ flex: 1, overflowY: "auto" }}>
          {activeTab === "dashboard" && (
            <DashboardPage
              onNavigateToGenerate={handleNavigateToGenerate}
              onPreviewProject={(p) => setPreviewProject(p)}
            />
          )}

          {activeTab === "generate" && (
            <GeneratorPage
              initialPrompt={generatorPrompt}
              onGenerationComplete={handleGenerationComplete}
            />
          )}

          {activeTab === "history" && (
            <HistoryPage onPreviewProject={(p) => setPreviewProject(p)} />
          )}

          {activeTab === "templates" && (
            <TemplatesPage
              onSelectTemplate={(prompt) => handleNavigateToGenerate(prompt)}
            />
          )}

          {activeTab === "settings" && <SettingsPage />}

          {activeTab === "profile" && <ProfilePage />}
        </main>
      </div>

      {/* Project Preview Modal */}
      {previewProject && (
        <ProjectPreviewModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
          onDownload={handleDownloadZip}
        />
      )}
    </div>
  );
}

export default App;