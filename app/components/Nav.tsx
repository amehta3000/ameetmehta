"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-widest">
          Ameet Mehta
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-wider transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm uppercase tracking-wider ${
                  pathname === link.href ? "text-accent" : "text-muted"
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
