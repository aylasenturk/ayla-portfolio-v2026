export interface StateItem {
  name: string;
  type: string;
  desc: string;
}

export interface FunctionItem {
  name: string;
  params?: string;
  desc: string;
}

export interface TypeItem {
  name: string;
  fields: string[];
}

export interface ConstantItem {
  name: string;
  desc: string;
}

export interface ComputedItem {
  name: string;
  desc: string;
}

export interface RefItem {
  name: string;
  desc: string;
}

export type FileNodeType =
  | "root"
  | "layout"
  | "page"
  | "hook"
  | "ui"
  | "lib"
  | "style"
  | "config";

export interface FileNode {
  id: string;
  name: string;
  type: FileNodeType;
  desc: string;
  exports: string[];
  state?: StateItem[];
  hooks?: string[];
  functions?: FunctionItem[];
  types?: TypeItem[];
  constants?: ConstantItem[];
  props?: string[];
  computed?: ComputedItem[];
  refs?: RefItem[];
}

export type EdgeType = "import" | "route" | "hook" | "data";

export interface FileEdge {
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
}

export interface CodeMapData {
  nodes: FileNode[];
  edges: FileEdge[];
}
