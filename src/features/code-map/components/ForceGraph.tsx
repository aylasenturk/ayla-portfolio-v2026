import { useRef, useEffect, useState, useCallback } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
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
} from "../lib/constants";

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

// Render icin pozisyon verisi
interface NodePos {
  id: string;
  x: number;
  y: number;
  name: string;
  type: FileNodeType;
  node: FileNode;
}

interface EdgePos {
  key: string;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  type: EdgeType;
  sourceId: string;
  targetId: string;
}

// -- Ana Bilesen --
export default function ForceGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimEdge> | null>(null);
  const simNodesRef = useRef<SimNode[]>([]);
  const dragRef = useRef<string | null>(null);

  const [nodePositions, setNodePositions] = useState<NodePos[]>([]);
  const [edgePositions, setEdgePositions] = useState<EdgePos[]>([]);
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  // Simulasyon kurulumu — D3 yalnizca fizik hesaplamasi icin
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    setDimensions({ width, height });

    const nodes: SimNode[] = codeMapData.nodes.map((n) => ({
      ...n,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
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

    simNodesRef.current = nodes;

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

    // Her tick'te pozisyonlari state'e kopyala
    simulation.on("tick", () => {
      setNodePositions(
        nodes.map((n) => ({
          id: n.id,
          x: n.x,
          y: n.y,
          name: n.name,
          type: n.type,
          node: n,
        }))
      );
      setEdgePositions(
        edges.map((e, i) => ({
          key: `${e.source.id}-${e.target.id}-${i}`,
          sx: e.source.x,
          sy: e.source.y,
          tx: e.target.x,
          ty: e.target.y,
          type: e.type,
          sourceId: e.source.id,
          targetId: e.target.id,
        }))
      );
    });

    // Pencere boyutu degisince simulasyonu guncelle
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      setDimensions({ width: w, height: h });
      simulation
        .force("center", d3.forceCenter(w / 2, h / 2))
        .force(
          "x",
          d3.forceX(w / 2).strength(SIMULATION_CONFIG.centerStrength)
        )
        .force(
          "y",
          d3.forceY(h / 2).strength(SIMULATION_CONFIG.centerStrength)
        )
        .alpha(0.3)
        .restart();
    });
    resizeObserver.observe(container);

    return () => {
      simulation.stop();
      resizeObserver.disconnect();
    };
  }, []);

  // Dark mode degisimini dinle
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          setIsDark(
            document.documentElement.getAttribute("data-theme") === "dark"
          );
          break;
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Drag — document seviyesinde mouse olaylari
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = dimensions.width / rect.width;
      const scaleY = dimensions.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const node = simNodesRef.current.find((n) => n.id === dragRef.current);
      if (node) {
        node.fx = x;
        node.fy = y;
      }
    };

    const handleMouseUp = () => {
      if (!dragRef.current) return;
      const node = simNodesRef.current.find((n) => n.id === dragRef.current);
      if (node) {
        node.fx = null;
        node.fy = null;
      }
      dragRef.current = null;
      simulationRef.current?.alphaTarget(0);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dimensions]);

  // Dugum suruklemesini baslat
  const handleDragStart = useCallback(
    (e: ReactMouseEvent, nodeId: string) => {
      e.preventDefault();
      const node = simNodesRef.current.find((n) => n.id === nodeId);
      if (!node) return;
      dragRef.current = nodeId;
      node.fx = node.x;
      node.fy = node.y;
      simulationRef.current?.alphaTarget(0.3).restart();
    },
    []
  );

  // Dugum tiklama
  const handleNodeClick = useCallback((node: FileNode) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  }, []);

  const textColor = isDark ? "#e2e8f0" : "#1e293b";

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-surface rounded-lg border border-border"
      style={{ height: "70vh" }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        role="img"
        aria-label="Kod haritasi graf gorsellestirmesi"
      >
        {/* Ok ucu tanimlari */}
        <defs>
          {(["import", "route", "hook", "data"] as EdgeType[]).map((type) => (
            <marker
              key={type}
              id={`arrow-${type}`}
              viewBox="0 -5 10 10"
              refX={20}
              refY={0}
              markerWidth={6}
              markerHeight={6}
              orient="auto"
            >
              <path d="M0,-5L10,0L0,5" fill={EDGE_COLORS[type]} />
            </marker>
          ))}
        </defs>

        {/* Baglanti cizgileri */}
        <g>
          {edgePositions.map((edge) => (
            <line
              key={edge.key}
              x1={edge.sx}
              y1={edge.sy}
              x2={edge.tx}
              y2={edge.ty}
              stroke={EDGE_COLORS[edge.type]}
              strokeWidth={
                hoveredNodeId &&
                (edge.sourceId === hoveredNodeId ||
                  edge.targetId === hoveredNodeId)
                  ? 2.5
                  : 1.5
              }
              strokeOpacity={
                hoveredNodeId
                  ? edge.sourceId === hoveredNodeId ||
                    edge.targetId === hoveredNodeId
                    ? 1
                    : 0.15
                  : 0.5
              }
              markerEnd={`url(#arrow-${edge.type})`}
            />
          ))}
        </g>

        {/* Dugum gruplari */}
        <g>
          {nodePositions.map((np) => {
            const isHovered = hoveredNodeId === np.id;
            const radius = getNodeRadius(np.type, isHovered);
            return (
              <g
                key={np.id}
                transform={`translate(${np.x},${np.y})`}
                cursor="pointer"
                tabIndex={0}
                role="button"
                aria-label={`${np.name} — ${NODE_LABELS[np.type]}`}
                style={{ outline: "none" }}
                onClick={() => handleNodeClick(np.node)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNodeClick(np.node);
                  }
                }}
                onMouseEnter={() => setHoveredNodeId(np.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onMouseDown={(e) => handleDragStart(e, np.id)}
              >
                <circle
                  r={radius}
                  fill={NODE_COLORS[np.type]}
                  opacity={0.9}
                  style={{ transition: "r 150ms" }}
                />
                <text
                  dy={
                    np.type === "root" || np.type === "hook" ? -18 : -14
                  }
                  textAnchor="middle"
                  fill={textColor}
                  fontSize={np.type === "root" ? "13px" : "11px"}
                  fontWeight={
                    np.type === "root" || np.type === "layout"
                      ? "600"
                      : "400"
                  }
                  pointerEvents="none"
                >
                  {np.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Dugum tipi lejanti */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 bg-surface/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border-light">
        {Object.entries(NODE_LABELS).map(([type, label]) => (
          <div
            key={type}
            className="flex items-center gap-1.5 text-xs text-text-secondary"
          >
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{
                backgroundColor: NODE_COLORS[type as FileNodeType],
              }}
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
