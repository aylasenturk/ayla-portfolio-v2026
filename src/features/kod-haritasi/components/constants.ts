import type { FileNodeType, EdgeType } from "../types";

// -- Renk haritasi --
export const NODE_COLORS: Record<FileNodeType, string> = {
  root: "#3b82f6",
  layout: "#0ea5e9",
  page: "#8b5cf6",
  hook: "#f59e0b",
  ui: "#10b981",
  lib: "#06b6d4",
  style: "#ec4899",
  config: "#64748b",
};

export const EDGE_COLORS: Record<EdgeType, string> = {
  import: "#94a3b8",
  route: "#8b5cf6",
  hook: "#f59e0b",
  data: "#06b6d4",
};

export const NODE_LABELS: Record<FileNodeType, string> = {
  root: "Kok",
  layout: "Layout",
  page: "Sayfa",
  hook: "Hook",
  ui: "UI",
  lib: "Kutuphane",
  style: "Stil",
  config: "Yapilandirma",
};

export const EDGE_LABELS: [EdgeType, string][] = [
  ["import", "Import"],
  ["route", "Route"],
  ["hook", "Hook"],
  ["data", "Veri"],
];

export const SECTION_ICONS: Record<string, string> = {
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

// -- Simulasyon ayarlari --
export const SIMULATION_CONFIG = {
  linkDistance: 120,
  linkStrength: 0.8,
  chargeStrength: -400,
  centerStrength: 0.05,
} as const;

// -- Dugum yaricap hesaplama --
const BASE_RADIUS: Partial<Record<FileNodeType, number>> = {
  root: 14,
  hook: 11,
  layout: 10,
};
const DEFAULT_RADIUS = 9;
const HOVER_EXTRA = 3;

export function getNodeRadius(type: FileNodeType, hovered = false): number {
  const base = BASE_RADIUS[type] ?? DEFAULT_RADIUS;
  return hovered ? base + HOVER_EXTRA : base;
}
