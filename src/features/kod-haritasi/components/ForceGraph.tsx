import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { FileNode, FileNodeType, EdgeType } from "../types";
import { codeMapData } from "../data/code-map-data";

// -- Renk haritasi --
const NODE_COLORS: Record<FileNodeType, string> = {
  root: "#3b82f6",
  layout: "#0ea5e9",
  page: "#8b5cf6",
  hook: "#f59e0b",
  ui: "#10b981",
  lib: "#06b6d4",
  style: "#ec4899",
  config: "#64748b",
};

const EDGE_COLORS: Record<EdgeType, string> = {
  import: "#94a3b8",
  route: "#8b5cf6",
  hook: "#f59e0b",
  data: "#06b6d4",
};

const NODE_LABELS: Record<FileNodeType, string> = {
  root: "Kok",
  layout: "Layout",
  page: "Sayfa",
  hook: "Hook",
  ui: "UI",
  lib: "Kutuphane",
  style: "Stil",
  config: "Yapilandirma",
};

// -- Section baslik ikonlari (Bootstrap Icons) --
const SECTION_ICONS: Record<string, string> = {
  Exports: "bi-box-arrow-up",
  Props: "bi-box-seam",
  State: "bi-database",
  Hooks: "bi-lightning-charge-fill",
  Fonksiyonlar: "bi-braces",
  Tipler: "bi-diagram-3",
  Sabitler: "bi-bookmark-fill",
  Hesaplanan: "bi-calculator",
  Refs: "bi-link-45deg",
};

// -- D3 simulasyonu icin genisletilmis tip --
interface SimNode extends FileNode {
  x: number;
  y: number;
  fx: number | null;
  fy: number | null;
}

interface SimEdge {
  source: SimNode;
  target: SimNode;
  type: EdgeType;
  label?: string;
}

// -- Detay Paneli --
function DetailPanel({
  node,
  onClose,
}: {
  node: FileNode;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute top-4 right-4 w-96 max-h-[calc(100%-2rem)] overflow-y-auto card shadow-xl z-10 border-l-4"
      style={{ borderLeftColor: NODE_COLORS[node.type] }}
    >
      <div className="card-header flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-text-primary truncate">
            {node.name}
          </h3>
          <span
            className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-semibold text-white"
            style={{ backgroundColor: NODE_COLORS[node.type] }}
          >
            {NODE_LABELS[node.type]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="btn-ghost btn-icon shrink-0"
          aria-label="Kapat"
        >
          <i className="bi bi-x-lg" />
        </button>
      </div>

      <div className="card-body space-y-4 text-sm">
        <p className="text-text-secondary">{node.desc}</p>

        {node.exports.length > 0 && (
          <Section title="Exports">
            {node.exports.map((e) => (
              <Badge key={e} text={e} color="#3b82f6" />
            ))}
          </Section>
        )}

        {node.props && node.props.length > 0 && (
          <Section title="Props">
            {node.props.map((p) => (
              <code
                key={p}
                className="block text-xs font-mono text-text-secondary bg-surface-alt rounded px-2 py-1"
              >
                {p}
              </code>
            ))}
          </Section>
        )}

        {node.state && node.state.length > 0 && (
          <Section title="State">
            {node.state.map((s) => (
              <div key={s.name} className="bg-surface-alt rounded px-2 py-1.5">
                <code className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                  {s.name}
                </code>
                <span className="text-xs text-text-muted ml-1">
                  : {s.type}
                </span>
                <p className="text-xs text-text-secondary mt-0.5">{s.desc}</p>
              </div>
            ))}
          </Section>
        )}

        {node.hooks && node.hooks.length > 0 && (
          <Section title="Hooks">
            {node.hooks.map((h) => (
              <Badge key={h} text={h} color="#f59e0b" />
            ))}
          </Section>
        )}

        {node.functions && node.functions.length > 0 && (
          <Section title="Fonksiyonlar">
            {node.functions.map((f) => (
              <div key={f.name} className="bg-surface-alt rounded px-2 py-1.5">
                <code className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  {f.name}
                  {f.params ? `(${f.params})` : "()"}
                </code>
                <p className="text-xs text-text-secondary mt-0.5">{f.desc}</p>
              </div>
            ))}
          </Section>
        )}

        {node.types && node.types.length > 0 && (
          <Section title="Tipler">
            {node.types.map((t) => (
              <div key={t.name} className="bg-surface-alt rounded px-2 py-1.5">
                <code className="text-xs font-mono font-semibold text-violet-600 dark:text-violet-400">
                  {t.name}
                </code>
                <div className="mt-1 space-y-0.5">
                  {t.fields.map((field) => (
                    <code
                      key={field}
                      className="block text-[11px] font-mono text-text-muted pl-2"
                    >
                      {field}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </Section>
        )}

        {node.constants && node.constants.length > 0 && (
          <Section title="Sabitler">
            {node.constants.map((c) => (
              <div key={c.name} className="bg-surface-alt rounded px-2 py-1.5">
                <code className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400">
                  {c.name}
                </code>
                <p className="text-xs text-text-secondary mt-0.5">{c.desc}</p>
              </div>
            ))}
          </Section>
        )}

        {node.computed && node.computed.length > 0 && (
          <Section title="Hesaplanan">
            {node.computed.map((c) => (
              <div key={c.name} className="bg-surface-alt rounded px-2 py-1.5">
                <code className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                  {c.name}
                </code>
                <p className="text-xs text-text-secondary mt-0.5">{c.desc}</p>
              </div>
            ))}
          </Section>
        )}

        {node.refs && node.refs.length > 0 && (
          <Section title="Refs">
            {node.refs.map((r) => (
              <div key={r.name} className="bg-surface-alt rounded px-2 py-1.5">
                <code className="text-xs font-mono font-semibold text-rose-600 dark:text-rose-400">
                  {r.name}
                </code>
                <p className="text-xs text-text-secondary mt-0.5">{r.desc}</p>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const icon = SECTION_ICONS[title] || "bi-chevron-right";
  return (
    <div>
      <h4 className="text-xs font-semibold text-text-muted mb-1.5">
        <i className={`bi ${icon} mr-1`} />
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold text-white mr-1 mb-1"
      style={{ backgroundColor: color }}
    >
      {text}
    </span>
  );
}

// -- Ana Bilesen --
export default function ForceGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimEdge> | null>(null);
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  const handleNodeClick = useCallback((node: FileNode) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", [0, 0, width, height].join(" "));

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#e2e8f0" : "#1e293b";

    const nodes: SimNode[] = codeMapData.nodes.map((n) => ({
      ...n,
      x: 0,
      y: 0,
      fx: null,
      fy: null,
    }));
    const edges: SimEdge[] = codeMapData.edges.map((e) => ({
      source: nodes.find((n) => n.id === e.source)!,
      target: nodes.find((n) => n.id === e.target)!,
      type: e.type,
      label: e.label,
    }));

    // Ok ucu tanimlari
    const defs = svg.append("defs");
    (["import", "route", "hook", "data"] as EdgeType[]).forEach((type) => {
      defs
        .append("marker")
        .attr("id", `arrow-${type}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 20)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", EDGE_COLORS[type]);
    });

    // Simulasyon
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimEdge>(edges)
          .id((d) => d.id)
          .distance(120)
          .strength(0.8)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) => ((d as SimNode).type === "root" ? 40 : 25))
      )
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    simulationRef.current = simulation;

    // Baglanti cizgileri
    const link = svg
      .append("g")
      .selectAll("line")
      .data(edges)
      .join("line")
      .attr("stroke", (d) => EDGE_COLORS[d.type])
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.5)
      .attr("marker-end", (d) => `url(#arrow-${d.type})`);

    // Dugum gruplari
    const node = svg
      .append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Dugum daireleri
    node
      .append("circle")
      .attr("r", (d) => {
        if (d.type === "root") return 14;
        if (d.type === "hook") return 11;
        if (d.type === "layout") return 10;
        return 9;
      })
      .attr("fill", (d) => NODE_COLORS[d.type])
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);

    // Dugum etiketleri
    node
      .append("text")
      .attr("dy", (d) =>
        d.type === "root" || d.type === "hook" ? -18 : -14
      )
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .attr("font-size", (d) => (d.type === "root" ? "13px" : "11px"))
      .attr("font-weight", (d) =>
        d.type === "root" || d.type === "layout" ? "600" : "400"
      )
      .attr("pointer-events", "none")
      .text((d) => d.name);

    // Tiklama
    node.on("click", (_event, d) => {
      handleNodeClick(d);
    });

    // Hover efekti
    node
      .on("mouseenter", function (_, d) {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(150)
          .attr("r", () => {
            if (d.type === "root") return 18;
            if (d.type === "hook") return 14;
            if (d.type === "layout") return 13;
            return 12;
          });
        link
          .attr("stroke-opacity", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 1 : 0.15
          )
          .attr("stroke-width", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 2.5 : 1
          );
      })
      .on("mouseleave", function (_, d) {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(150)
          .attr("r", () => {
            if (d.type === "root") return 14;
            if (d.type === "hook") return 11;
            if (d.type === "layout") return 10;
            return 9;
          });
        link.attr("stroke-opacity", 0.5).attr("stroke-width", 1.5);
      });

    // Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [handleNodeClick]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-surface rounded-lg border border-border"
      style={{ height: "70vh" }}
    >
      <svg ref={svgRef} className="w-full h-full" />

      {/* Lejant */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 bg-surface/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border-light">
        {Object.entries(NODE_LABELS).map(([type, label]) => (
          <div
            key={type}
            className="flex items-center gap-1.5 text-xs text-text-secondary"
          >
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: NODE_COLORS[type as FileNodeType] }}
            />
            {label}
          </div>
        ))}
      </div>

      {/* Edge tipi lejanti */}
      <div className="absolute bottom-4 right-4 flex flex-wrap gap-3 bg-surface/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border-light">
        {(
          [
            ["import", "Import"],
            ["route", "Route"],
            ["hook", "Hook"],
            ["data", "Veri"],
          ] as [EdgeType, string][]
        ).map(([type, label]) => (
          <div
            key={type}
            className="flex items-center gap-1.5 text-xs text-text-secondary"
          >
            <span
              className="w-4 h-0.5 inline-block"
              style={{ backgroundColor: EDGE_COLORS[type] }}
            />
            {label}
          </div>
        ))}
      </div>

      {/* Detay Paneli */}
      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
