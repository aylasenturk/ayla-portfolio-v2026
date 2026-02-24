import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ArticlesPage from "@/pages/ArticlesPage";
import ContactPage from "@/pages/ContactPage";
import ResumePage from "@/pages/ResumePage";
import LegacyToolRoutePage from "@/pages/LegacyToolRoutePage";
import PomodoroPage from "@/features/pomodoro/PomodoroPage";
import TaskTrackerPage from "@/features/task-tracker/TaskTrackerPage";
import CodeMapPage from "@/features/code-map/CodeMapPage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projeler" element={<ProjectsPage />} />
        <Route path="/makaleler" element={<ArticlesPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/ozgecmis" element={<ResumePage />} />
        <Route path="/tools/pomodoro" element={<PomodoroPage />} />
        <Route path="/tools/task-tracker" element={<TaskTrackerPage />} />
        <Route path="/tools/code-map" element={<CodeMapPage />} />
        <Route path="/araclar/*" element={<LegacyToolRoutePage />} />
      </Routes>
    </MainLayout>
  );
}
