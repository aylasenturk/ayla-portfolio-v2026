import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import type { FileNode, FileNodeType, EdgeType } from "../types";
import { codeMapData } from "../data/code-map-data";
import DetailPanel from "./DetailPanel";
import {
  NODE_COLORS,
  NODE_LABELS,
  EDGE_COLORS,
  EDGE_LABELS,
  SIMULATION_CONFIG,
  getNodeRadius,
} from "./constants";

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
    const svg = d3.select(svgRef.current);

    function render() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (simulationRef.current) {
        simulationRef.current.stop();
      }

      svg.selectAll("*").remove();
      svg.attr("viewBox", [0, 0, width, height].join(" "));

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const textColor = isDark ? "#e2e8f0" : "#1e293b";

      // Node map — O(1) lookup ile guvenli edge eslestirme
      const nodes: SimNode[] = codeMapData.nodes.map((n) => ({
        ...n,
        x: 0,
        y: 0,
        fx: null,
        fy: null,
      }));
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));

      const edges: SimEdge[] = codeMapData.edges.reduce<SimEdge[]>((acc, e) => {
        const source = nodeMap.get(e.source);
        const target = nodeMap.get(e.target);
        if (source && target) {
          acc.push({ source, target, type: e.type, label: e.label });
        }
        return acc;
      }, []);

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
            .distance(SIMULATION_CONFIG.linkDistance)
            .strength(SIMULATION_CONFIG.linkStrength)
        )
        .force(
          "charge",
          d3.forceManyBody().strength(SIMULATION_CONFIG.chargeStrength)
        )
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collision",
          d3
            .forceCollide()
            .radius((d) => getNodeRadius((d as SimNode).type) + 5)
        )
        .force(
          "x",
          d3.forceX(width / 2).strength(SIMULATION_CONFIG.centerStrength)
        )
        .force(
          "y",
          d3.forceY(height / 2).strength(SIMULATION_CONFIG.centerStrength)
        );

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
        .attr("tabindex", 0)
        .attr("role", "button")
        .attr("aria-label", (d) => `${d.name} — ${NODE_LABELS[d.type]}`)
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
        .attr("r", (d) => getNodeRadius(d.type))
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

      // Tiklama + klavye erisilebilirligi
      node.on("click", (_event, d) => {
        handleNodeClick(d);
      });
      node.on("keydown", (event: KeyboardEvent, d) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNodeClick(d);
        }
      });

      // Hover efekti
      node
        .on("mouseenter", function (_, d) {
          d3.select(this)
            .select("circle")
            .transition()
            .duration(150)
            .attr("r", getNodeRadius(d.type, true));
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
            .attr("r", getNodeRadius(d.type));
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
    }

    // Ilk render
    render();

    // Pencere boyutu degisince yeniden ciz
    const resizeObserver = new ResizeObserver(() => {
      render();
    });
    resizeObserver.observe(container);

    // Dark mode degisince yeniden ciz
    const themeObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (
          m.type === "attributes" &&
          m.attributeName === "data-theme"
        ) {
          render();
          break;
        }
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      simulationRef.current?.stop();
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [handleNodeClick]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-surface rounded-lg border border-border"
      style={{ height: "70vh" }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        role="img"
        aria-label="Kod haritasi graf gorsellestirmesi"
      />

      {/* Dugum tipi lejanti */}
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
        {EDGE_LABELS.map(([type, label]) => (
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
