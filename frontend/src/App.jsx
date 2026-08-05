import { useState, useEffect } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { DashboardPage } from "./pages/DashboardPage";
import { GeneratorPage } from "./pages/GeneratorPage";
import { HistoryPage } from "./pages/HistoryPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthPage } from "./pages/AuthPage";
import { ProjectPreviewModal } from "./components/preview/ProjectPreviewModal";
import { projectService } from "./services/projectService";
import { authService } from "./services/authService";

function App() {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [generatorPrompt, setGeneratorPrompt] = useState("");
  const [previewProject, setPreviewProject] = useState(null);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      authService
        .getMe()
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

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

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-main)",
        color: "var(--text-muted)",
        fontFamily: "var(--font-sans)"
      }}>
        Initializing DevForge Workspace...
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)" }}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

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

          {activeTab === "profile" && <ProfilePage user={user} />}
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