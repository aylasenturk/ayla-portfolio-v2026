import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ForceGraph from "./components/ForceGraph";
import IndentedTree from "./components/IndentedTree";

type ViewMode = "graph" | "tree";

const TABS: { key: ViewMode; label: string }[] = [
  { key: "graph", label: "Graf" },
  { key: "tree", label: "Agac" },
];

export default function KodHaritasiPage() {
  const [view, setView] = useState<ViewMode>("graph");

  return (
    <div>
      <PageHeader section="Araçlar" title="Kod Haritası" />

      <div className="flex items-center gap-4 mb-4">
        <p className="text-sm text-text-secondary">
          Düğümlere tıklayarak dosya detaylarını
          görüntüleyin.
        </p>

        {/* Sekme gecisi */}
        <div
          className="ml-auto flex rounded-lg border
            border-border overflow-hidden"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`px-3 py-1.5 text-xs font-medium
                transition-colors ${
                  view === tab.key
                    ? "bg-primary-600 text-white"
                    : "bg-surface text-text-secondary \
                       hover:bg-surface-hover"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {view === "graph" ? <ForceGraph /> : <IndentedTree />}
    </div>
  );
}
