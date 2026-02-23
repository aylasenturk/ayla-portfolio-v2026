"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings, CheckCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

type TimerMode = "work" | "shortBreak" | "longBreak";

interface TimerSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
}

const MODE_LABELS: Record<TimerMode, string> = {
  work: "Çalışma Zamanı",
  shortBreak: "Kısa Mola",
  longBreak: "Uzun Mola",
};

const MODE_COLORS: Record<TimerMode, string> = {
  work: "text-primary-600",
  shortBreak: "text-emerald-600",
  longBreak: "text-cyan-600",
};

const DEFAULT_SETTINGS: TimerSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function PomodoroPage() {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const [sessionCount, setSessionCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ses dosyasını yükle
  useEffect(() => {
    audioRef.current = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );
  }, []);

  const getTimeForMode = useCallback(
    (targetMode: TimerMode): number => {
      switch (targetMode) {
        case "work":
          return settings.workMinutes * 60;
        case "shortBreak":
          return settings.shortBreakMinutes * 60;
        case "longBreak":
          return settings.longBreakMinutes * 60;
      }
    },
    [settings]
  );

  const switchToNextSession = useCallback(() => {
    if (mode === "work") {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);

      if (newCount % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(getTimeForMode("longBreak"));
      } else {
        setMode("shortBreak");
        setTimeLeft(getTimeForMode("shortBreak"));
      }
    } else {
      setMode("work");
      setTimeLeft(getTimeForMode("work"));
    }
  }, [mode, sessionCount, getTimeForMode]);

  // Zamanlayıcı mantığı
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          audioRef.current?.play();
          setIsRunning(false);
          switchToNextSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, switchToNextSession]);

  function handleStart() {
    if (!isRunning) setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setMode("work");
    setSessionCount(0);
    setTimeLeft(getTimeForMode("work"));
  }

  function handleApplySettings() {
    setIsRunning(false);
    setMode("work");
    setSessionCount(0);
    setTimeLeft(settings.workMinutes * 60);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  return (
    <div>
      <PageHeader section="Üretkenlik Araçları" title="Pomodoro Zamanlayıcı" />

      <div className="flex justify-center">
        <div className="w-full max-w-md space-y-4">
          {/* Zamanlayıcı */}
          <div className="card">
            <div className="card-body text-center">
              <h2 className="text-base font-semibold mb-4">Pomodoro</h2>

              {/* Mod bilgisi */}
              <p
                className={`text-sm font-medium mb-3 ${MODE_COLORS[mode]}`}
                aria-live="polite"
              >
                {MODE_LABELS[mode]}
              </p>

              {/* Geri sayım */}
              <div
                className="text-6xl font-bold mb-6 font-mono tabular-nums"
                aria-label={`Kalan süre: ${formatTime(timeLeft)}`}
              >
                {formatTime(timeLeft)}
              </div>

              {/* Kontrol butonları */}
              <div className="flex gap-2 justify-center mb-4">
                <button
                  onClick={handleStart}
                  className="btn btn-success"
                  aria-label="Başlat"
                  disabled={isRunning}
                >
                  <Play className="w-4 h-4" />
                  Başlat
                </button>
                <button
                  onClick={handlePause}
                  className="btn btn-warning"
                  aria-label="Duraklat"
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

              {/* Oturum sayısı */}
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
