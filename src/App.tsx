import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ArticlesPage from "@/pages/ArticlesPage";
import ContactPage from "@/pages/ContactPage";
import ResumePage from "@/pages/ResumePage";
import PomodoroPage from "@/pages/PomodoroPage";
import TaskTrackerPage from "@/pages/TaskTrackerPage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projeler" element={<ProjectsPage />} />
        <Route path="/makaleler" element={<ArticlesPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/ozgecmis" element={<ResumePage />} />
        <Route path="/araclar/pomodoro" element={<PomodoroPage />} />
        <Route path="/araclar/gorev-takipcisi" element={<TaskTrackerPage />} />
      </Routes>
    </MainLayout>
  );
}
