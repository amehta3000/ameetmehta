"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, useState, useCallback, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

function getInitialBg(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("backgroundColor") || "";
}

// Subscribe/getSnapshot for theme using useSyncExternalStore
let themeListeners: Array<() => void> = [];
let currentTheme: Theme | null = null;

function subscribeTheme(listener: () => void) {
  themeListeners.push(listener);
  return () => {
    themeListeners = themeListeners.filter((l) => l !== listener);
  };
}

function getThemeSnapshot(): Theme {
  if (currentTheme === null) {
    currentTheme = getInitialTheme();
  }
  return currentTheme;
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [backgroundColor, setBackgroundColorState] = useState<string>(() => getInitialBg());

  const toggleTheme = useCallback(() => {
    const next = currentTheme === "dark" ? "light" : "dark";
    currentTheme = next;
    themeListeners.forEach((l) => l());
  }, []);

  const setBackgroundColor = useCallback((color: string) => {
    setBackgroundColorState(color);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor;
      localStorage.setItem("backgroundColor", backgroundColor);
    } else {
      document.body.style.backgroundColor = "";
      localStorage.removeItem("backgroundColor");
    }
  }, [backgroundColor]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, backgroundColor, setBackgroundColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
