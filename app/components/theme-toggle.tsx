"use client";

import { useTheme } from "../theme-provider";
import { useState, useRef, useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme, backgroundColor, setBackgroundColor } = useTheme();
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPanel) return;

    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setShowPanel(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showPanel]);

  const presetColors = [
    { name: "Default", value: "" },
    { name: "Midnight", value: "#0f172a" },
    { name: "Forest", value: "#052e16" },
    { name: "Wine", value: "#1c0a00" },
    { name: "Ocean", value: "#0c1929" },
    { name: "Warm", value: "#fef3c7" },
    { name: "Blush", value: "#fdf2f8" },
  ];

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors"
        aria-label="Theme settings"
      >
        {theme === "dark" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 top-full mt-2 w-56 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Mode</label>
              <button
                onClick={toggleTheme}
                className="w-full mt-2 px-3 py-2 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors text-left"
              >
                Switch to {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Background</label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setBackgroundColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      backgroundColor === color.value
                        ? "border-[var(--accent)] scale-110"
                        : "border-[var(--border)]"
                    }`}
                    style={{ backgroundColor: color.value || (theme === "dark" ? "#0a0a0a" : "#ffffff") }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Custom</label>
              <input
                type="color"
                value={backgroundColor || (theme === "dark" ? "#0a0a0a" : "#ffffff")}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="mt-2 w-full h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
