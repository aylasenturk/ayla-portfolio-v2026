import type { FileNode, EdgeType } from "../types";
import { codeMapData } from "../data/code-map-data";

export interface TreeNodeData {
  node: FileNode;
  children: TreeNodeData[];
  edgeType?: EdgeType;
}

export function buildTree(): TreeNodeData[] {
  const { nodes, edges } = codeMapData;
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // source → [{target, type}]
  const childrenMap = new Map<
    string,
    { id: string; type: EdgeType }[]
  >();
  const hasParent = new Set<string>();

  for (const e of edges) {
    const list = childrenMap.get(e.source) ?? [];
    list.push({ id: e.target, type: e.type });
    childrenMap.set(e.source, list);
    hasParent.add(e.target);
  }

  const roots = nodes.filter((n) => !hasParent.has(n.id));
  const visited = new Set<string>();

  function build(
    id: string,
    edgeType?: EdgeType,
  ): TreeNodeData | null {
    if (visited.has(id)) return null;
    visited.add(id);

    const node = nodeMap.get(id);
    if (!node) return null;

    const kids = (childrenMap.get(id) ?? [])
      .map((c) => build(c.id, c.type))
      .filter(Boolean) as TreeNodeData[];

    return { node, children: kids, edgeType };
  }

  return roots
    .map((r) => build(r.id))
    .filter(Boolean) as TreeNodeData[];
}
