"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { FontSwitcher } from "./FontSwitcher";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] hover:text-amber transition-colors"
        >
          Ameet Mehta
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <FontSwitcher />
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className={`font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] transition-colors hover:text-ink ${
              pathname?.startsWith("/about") ? "text-ink" : "text-muted"
            }`}
          >
            About
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
