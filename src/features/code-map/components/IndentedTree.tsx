import { useState, useMemo } from "react";
import type { FileNode } from "../types";
import { NODE_COLORS, NODE_LABELS, EDGE_COLORS } from "../lib/constants";
import { buildTree, type TreeNodeData } from "../lib/buildTree";
import DetailPanel from "./DetailPanel";
import Icon from "./Icon";

// -- TreeItem --
function TreeItem({
  data,
  depth,
  onSelect,
}: {
  data: TreeNodeData;
  depth: number;
  onSelect: (node: FileNode) => void;
}) {
  const [open, setOpen] = useState(depth < 2);
  const hasKids = data.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-1 px-2
          rounded hover:bg-surface-hover cursor-pointer
          text-sm text-text-primary group"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
        role="treeitem"
        aria-expanded={hasKids ? open : undefined}
        tabIndex={0}
        onClick={() => onSelect(data.node)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSelect(data.node);
          if (e.key === "ArrowRight" && hasKids) setOpen(true);
          if (e.key === "ArrowLeft") setOpen(false);
        }}
      >
        {/* Expand/collapse */}
        {hasKids ? (
          <button
            className="w-4 h-4 flex items-center justify-center
              text-text-muted transition-transform"
            style={{
              transform: open ? "rotate(90deg)" : undefined,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            aria-label={open ? "Daralt" : "Genislet"}
          >
            <Icon name="chevron-right" className="w-3 h-3" />
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* Renk noktasi */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{
            backgroundColor: NODE_COLORS[data.node.type],
          }}
        />

        {/* Dosya adi */}
        <span className="truncate font-mono text-xs">
          {data.node.name}
        </span>

        {/* Tip etiketi */}
        <span
          className="ml-auto text-[10px] px-1.5 py-0.5
            rounded font-semibold text-white shrink-0
            opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            backgroundColor: NODE_COLORS[data.node.type],
          }}
        >
          {NODE_LABELS[data.node.type]}
        </span>

        {/* Edge tipi */}
        {data.edgeType && (
          <span
            className="text-[10px] px-1 py-0.5 rounded
              font-mono opacity-60"
            style={{
              color: EDGE_COLORS[data.edgeType],
            }}
          >
            {data.edgeType}
          </span>
        )}
      </div>

      {/* Alt dugumler */}
      {open &&
        data.children.map((child) => (
          <TreeItem
            key={child.node.id}
            data={child}
            depth={depth + 1}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}

// -- IndentedTree --
export default function IndentedTree() {
  const tree = useMemo(() => buildTree(), []);
  const [selected, setSelected] = useState<FileNode | null>(null);

  return (
    <div
      className="relative w-full bg-surface rounded-lg
        border border-border overflow-hidden"
      style={{ height: "70vh" }}
    >
      <div
        className="h-full overflow-y-auto p-2"
        role="tree"
        aria-label="Kod haritasi agac gorunumu"
      >
        {tree.map((item) => (
          <TreeItem
            key={item.node.id}
            data={item}
            depth={0}
            onSelect={(n) =>
              setSelected((prev) =>
                prev?.id === n.id ? null : n,
              )
            }
          />
        ))}
      </div>

      {selected && (
        <DetailPanel
          node={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
