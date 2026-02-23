import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-2">
        <p className="text-sm text-text-muted">
          &copy; {currentYear} Ayla Şentürk. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/aylasenturk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ayla-%C5%9Fent%C3%BCrk-9828163a9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/SenturkAyl60453"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="X"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <span className="text-xs text-text-muted ml-2">
            Contributed by Enes Can Ak
          </span>
        </div>
      </div>
    </footer>
  );
}
