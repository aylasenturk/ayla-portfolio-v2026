import { Play, Pause, RotateCcw, Settings, CheckCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import {
  usePomodoro,
  formatTime,
  MODE_COLORS,
  MODE_LABELS,
} from "@/hooks/usePomodoro";

export default function PomodoroPage() {
  const {
    settings,
    timeLeft,
    isRunning,
    mode,
    sessionCount,
    showToast,
    handleStart,
    handlePause,
    handleReset,
    handleApplySettings,
    setSettings,
  } = usePomodoro();

  return (
    <div>
      <PageHeader section="Üretkenlik Araçları" title="Pomodoro Zamanlayıcı" />

      <div className="flex justify-center">
        <div className="w-full max-w-md space-y-4">
          {/* Zamanlayıcı */}
          <div className="card">
            <div className="card-body text-center">
              <h2 className="text-base font-semibold mb-4">Pomodoro</h2>

              <p
                className={`text-sm font-medium mb-3 ${MODE_COLORS[mode]}`}
                aria-live="polite"
              >
                {MODE_LABELS[mode]}
              </p>

              <div
                className="text-6xl font-bold mb-6 font-mono tabular-nums"
                aria-label={`Kalan süre: ${formatTime(timeLeft)}`}
              >
                {formatTime(timeLeft)}
              </div>

              <div className="flex gap-2 justify-center mb-4">
                <button
                  onClick={handleStart}
                  className="btn btn-success"
                  aria-label="Başlat"
                  aria-pressed={isRunning ? "true" : "false"}
                  disabled={isRunning}
                >
                  <Play className="w-4 h-4" />
                  Başlat
                </button>
                <button
                  onClick={handlePause}
                  className="btn btn-warning"
                  aria-label="Duraklat"
                  aria-pressed={!isRunning ? "true" : "false"}
                  disabled={!isRunning}
                >
                  <Pause className="w-4 h-4" />
                  Duraklat
                </button>
                <button
                  onClick={handleReset}
                  className="btn btn-outline"
                  aria-label="Sıfırla"
                >
                  <RotateCcw className="w-4 h-4" />
                  Sıfırla
                </button>
              </div>

              <p className="text-sm text-text-muted">
                Tamamlanan Çalışma Oturumu:{" "}
                <span className="font-bold">{sessionCount}</span>
              </p>
            </div>
          </div>

          {/* Ayarlar */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" /> Ayarlar
              </h2>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label htmlFor="workTime" className="label">
                  Çalışma Süresi (dakika)
                </label>
                <input
                  type="number"
                  id="workTime"
                  className="input"
                  min={1}
                  max={60}
                  value={settings.workMinutes}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      workMinutes: parseInt(e.target.value) || 1,
                    }))
                  }
                />
              </div>
              <div>
                <label htmlFor="shortBreak" className="label">
                  Kısa Mola (dakika)
                </label>
                <input
                  type="number"
                  id="shortBreak"
                  className="input"
                  min={1}
                  max={30}
                  value={settings.shortBreakMinutes}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      shortBreakMinutes: parseInt(e.target.value) || 1,
                    }))
                  }
                />
              </div>
              <div>
                <label htmlFor="longBreak" className="label">
                  Uzun Mola (dakika)
                </label>
                <input
                  type="number"
                  id="longBreak"
                  className="input"
                  min={1}
                  max={60}
                  value={settings.longBreakMinutes}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      longBreakMinutes: parseInt(e.target.value) || 1,
                    }))
                  }
                />
              </div>
              <button
                onClick={handleApplySettings}
                className="btn btn-primary w-full"
              >
                <CheckCircle className="w-4 h-4" />
                Ayarları Uygula
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500 text-white shadow-lg animate-in slide-in-from-bottom-4">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Ayarlar uygulandı!</span>
        </div>
      )}
    </div>
  );
}
