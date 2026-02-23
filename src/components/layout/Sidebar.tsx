import { Link, useLocation } from "react-router-dom";
import { X, Code2 } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { clsx } from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Overlay - mobil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-border",
          "flex flex-col transition-transform duration-300 ease-in-out",
          "xl:translate-x-0 xl:static xl:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <Link to="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-600 text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-text-primary">
              Ayla Şentürk
            </span>
          </Link>
          <button
            onClick={onClose}
            className="btn-ghost rounded-lg p-1.5 xl:hidden"
            aria-label="Menüyü kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigasyon */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Ana navigasyon">
          {navigation.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className={clsx(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                          isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon
                          className={clsx(
                            "w-5 h-5 flex-shrink-0",
                            isActive ? "text-primary-600" : "text-text-muted"
                          )}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
