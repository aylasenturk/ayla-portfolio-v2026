import { Plus, Trash2, ClipboardList } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { clsx } from "clsx";
import { useTaskTracker, type FilterType } from "./useTaskTracker";

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "todo", label: "Devam Eden" },
  { key: "done", label: "Tamamlanan" },
];

export default function TaskTrackerPage() {
  const {
    input,
    filter,
    filteredTasks,
    stats,
    setInput,
    setFilter,
    addTask,
    toggleTask,
    removeTask,
  } = useTaskTracker();

  const { totalCount, doneCount, pendingCount } = stats;

  return (
    <div>
      <PageHeader section="Üretkenlik Araçları" title="Görev Takipçisi" />

      <div className="flex justify-center">
        <div className="w-full max-w-lg space-y-4">
          {/* Ana kart */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-primary-600" />
                Görev Takipçisi
              </h2>
            </div>
            <div className="card-body">
              {/* Görev ekleme */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder="Yeni görev yaz..."
                  aria-label="Yeni görev"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
                <button
                  onClick={addTask}
                  className="btn btn-primary"
                  aria-label="Görev ekle"
                >
                  <Plus className="w-4 h-4" />
                  Ekle
                </button>
              </div>

              {/* Filtreler */}
              <div
                className="flex rounded-lg border border-border overflow-hidden mb-4"
                role="group"
                aria-label="Görev filtreleri"
              >
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={clsx(
                      "flex-1 py-2 text-sm font-medium transition-colors",
                      filter === f.key
                        ? "bg-primary-600 text-white"
                        : "bg-surface text-text-secondary hover:bg-surface-hover"
                    )}
                    aria-pressed={filter === f.key ? "true" : "false"}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Görev listesi */}
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-text-muted">
                  <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Henüz görev eklenmedi</p>
                </div>
              ) : (
                <ul className="space-y-2" role="list" aria-live="polite">
                  {filteredTasks.map((task) => (
                    <li
                      key={task.id}
                      className={clsx(
                        "flex items-center justify-between gap-3 px-4 py-3 rounded-lg border transition-colors",
                        task.status === "done"
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-surface border-border"
                      )}
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={clsx(
                          "text-sm text-left flex-1 cursor-pointer transition-all",
                          task.status === "done" &&
                            "line-through opacity-60 text-text-muted"
                        )}
                        aria-label={`Görevi ${task.status === "todo" ? "tamamla" : "geri al"}: ${task.title}`}
                        aria-pressed={task.status === "done" ? "true" : "false"}
                      >
                        {task.title}
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="btn btn-icon btn-ghost text-text-muted hover:text-danger p-1.5"
                        aria-label={`Görevi sil: ${task.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* İstatistikler */}
          <div className="card">
            <div className="card-body">
              <div className="grid grid-cols-3 text-center gap-4">
                <div>
                  <p className="text-2xl font-bold">{totalCount}</p>
                  <p className="text-xs text-text-muted">Toplam</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-500">{pendingCount}</p>
                  <p className="text-xs text-text-muted">Devam Eden</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-500">{doneCount}</p>
                  <p className="text-xs text-text-muted">Tamamlanan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
