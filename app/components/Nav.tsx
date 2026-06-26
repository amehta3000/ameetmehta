"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/chiller", label: "Sound" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] hover:text-amber transition-colors"
        >
          Ameet Mehta
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] transition-colors hover:text-ink ${
                pathname?.startsWith(link.href) ? "text-ink" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] ${
                  pathname?.startsWith(link.href) ? "text-ink" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
