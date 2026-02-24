import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Link2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const LEGACY_TOOL_ROUTE_MAP: Record<string, string> = {
  "/araclar/pomodoro": "/tools/pomodoro",
  "/araclar/gorev-takipcisi": "/tools/task-tracker",
  "/araclar/kod-haritasi": "/tools/code-map",
};

export default function LegacyToolRoutePage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const targetPath = useMemo(
    () => LEGACY_TOOL_ROUTE_MAP[pathname] ?? "/",
    [pathname]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate(targetPath, { replace: true });
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [navigate, targetPath]);

  return (
    <div>
      <PageHeader section="Bilgi" title="Rota Taşındı" />

      <div className="flex justify-center">
        <div className="card w-full max-w-xl">
          <div className="card-body space-y-4">
            <p className="text-text-secondary text-sm">
              Bu bağlantı yeni route standardına taşındı. Kısa süre içinde yeni
              adrese yönlendirileceksiniz.
            </p>

            <div className="rounded-lg border border-border bg-surface-alt px-3 py-2">
              <p className="text-xs text-text-muted mb-1">Eski URL</p>
              <p className="text-sm font-mono text-text-primary break-all">{pathname}</p>
            </div>

            <div className="rounded-lg border border-border bg-surface-alt px-3 py-2">
              <p className="text-xs text-text-muted mb-1">Yeni URL</p>
              <p className="text-sm font-mono text-text-primary break-all">{targetPath}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to={targetPath} className="btn btn-primary">
                <ArrowRight className="w-4 h-4" />
                Hemen Git
              </Link>
              <Link to="/" className="btn btn-outline">
                <Link2 className="w-4 h-4" />
                Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
