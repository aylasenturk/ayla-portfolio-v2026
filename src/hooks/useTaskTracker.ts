import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "done";
}

export type FilterType = "all" | "todo" | "done";

export interface TaskTrackerStats {
  totalCount: number;
  doneCount: number;
  pendingCount: number;
}

export interface TaskTrackerState {
  tasks: Task[];
  input: string;
  filter: FilterType;
  filteredTasks: Task[];
  stats: TaskTrackerStats;
}

export interface TaskTrackerActions {
  setInput: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  addTask: () => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

const STORAGE_KEY = "tasks";

function loadTasks(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTaskTracker(): TaskTrackerState & TaskTrackerActions {
  // localStorage'dan doğrudan lazy initializer ile oku — useEffect'e gerek yok
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(): void {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: trimmed, status: "todo" },
    ]);
    setInput("");
  }

  function toggleTask(id: string): void {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "todo" ? "done" : "todo" }
          : task
      )
    );
  }

  function removeTask(id: string): void {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter(
    (t) => filter === "all" || t.status === filter
  );

  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const pendingCount = totalCount - doneCount;

  return {
    tasks,
    input,
    filter,
    filteredTasks,
    stats: { totalCount, doneCount, pendingCount },
    setInput,
    setFilter,
    addTask,
    toggleTask,
    removeTask,
  };
}
