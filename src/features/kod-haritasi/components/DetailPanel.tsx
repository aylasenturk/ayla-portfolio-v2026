import type { ReactNode } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { FileNode } from "../types";
import { NODE_COLORS, NODE_LABELS, SECTION_ICONS } from "./constants";

// -- Badge --
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

// -- Section --
function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
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

// -- Detail Panel --
export default function DetailPanel({
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
              <Badge key={e} text={e} color={NODE_COLORS.root} />
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
              <Badge key={h} text={h} color={NODE_COLORS.hook} />
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
