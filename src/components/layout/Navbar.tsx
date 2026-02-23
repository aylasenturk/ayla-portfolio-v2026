import { Menu, Github, Linkedin, Twitter, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export default function Navbar({ onMenuToggle, theme, onThemeToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Sol: Menü butonu */}
        <button
          onClick={onMenuToggle}
          className="btn-ghost rounded-lg p-2 xl:hidden"
          aria-label="Menüyü aç"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Sağ: Tema toggle + Sosyal medya linkleri */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={onThemeToggle}
            className="btn-ghost rounded-lg p-2"
            aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <div className="w-px h-5 bg-border mx-1" />

          <a
            href="https://github.com/aylasenturk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost rounded-lg p-2"
            aria-label="GitHub profili"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ayla-%C5%9Fent%C3%BCrk-9828163a9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost rounded-lg p-2"
            aria-label="LinkedIn profili"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://x.com/SenturkAyl60453"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost rounded-lg p-2"
            aria-label="X profili"
          >
            <Twitter className="w-4.5 h-4.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
