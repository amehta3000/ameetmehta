"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return getInitialTheme();
  });
  const [backgroundColor, setBackgroundColorState] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return getInitialBg();
  });

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

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setBackgroundColor = useCallback((color: string) => {
    setBackgroundColorState(color);
  }, []);

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
