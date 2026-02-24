import type React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

function getInitialTheme(): "light" | "dark" {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  const initial = saved || "light";
  document.documentElement.setAttribute("data-theme", initial);
  return initial;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar
          onMenuToggle={() => setSidebarOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
