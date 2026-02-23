import { useState, useEffect, useRef, useCallback } from "react";

export type TimerMode = "work" | "shortBreak" | "longBreak";

export interface TimerSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
}

export interface PomodoroState {
  settings: TimerSettings;
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  sessionCount: number;
  showToast: boolean;
}

export interface PomodoroActions {
  handleStart: () => void;
  handlePause: () => void;
  handleReset: () => void;
  handleApplySettings: () => void;
  setSettings: React.Dispatch<React.SetStateAction<TimerSettings>>;
}

export const MODE_LABELS: Record<TimerMode, string> = {
  work: "Çalışma Zamanı",
  shortBreak: "Kısa Mola",
  longBreak: "Uzun Mola",
};

export const MODE_COLORS: Record<TimerMode, string> = {
  work: "text-primary-600",
  shortBreak: "text-emerald-600",
  longBreak: "text-cyan-600",
};

const DEFAULT_SETTINGS: TimerSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
};

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export function usePomodoro(): PomodoroState & PomodoroActions {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const [sessionCount, setSessionCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const handleStart = useCallback(() => {
    if (!isRunning) setIsRunning(true);
  }, [isRunning]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setMode("work");
    setSessionCount(0);
    setTimeLeft(getTimeForMode("work"));
  }, [getTimeForMode]);

  const handleApplySettings = useCallback(() => {
    setIsRunning(false);
    setMode("work");
    setSessionCount(0);
    setTimeLeft(settings.workMinutes * 60);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [settings.workMinutes]);

  return {
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
  };
}
