import { useCallback, useSyncExternalStore } from "react";

export type ThemeName = "paper" | "blueprint";

const STORAGE_KEY = "dovetail-theme";
const listeners = new Set<() => void>();

function readTheme(): ThemeName {
  return document.documentElement.classList.contains("dark")
    ? "blueprint"
    : "paper";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function writeTheme(theme: ThemeName) {
  document.documentElement.classList.toggle("dark", theme === "blueprint");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked: the theme still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

/** The theme lives on <html> (`.dark` = blueprint), set before paint by index.html. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme);
  const toggleTheme = useCallback(() => {
    writeTheme(readTheme() === "blueprint" ? "paper" : "blueprint");
  }, []);
  return { theme, toggleTheme };
}
