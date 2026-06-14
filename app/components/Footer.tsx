import Link from "next/link";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ameetmehta/" },
  { label: "Instagram", href: "https://www.instagram.com/ameet3000/" },
  { label: "Art", href: "https://www.instagram.com/ameet3000.art/" },
  { label: "SADUBAS", href: "https://www.instagram.com/sadubas/reels/" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line mt-24 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
              design, code, sound.
            </p>
            <p className="mt-1 text-sm text-muted">
              Los Angeles
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <Link
              href="mailto:hello@ameetmehta.com?subject=Hey%20Ameet"
              className="font-[family-name:var(--font-mono)] text-xs text-muted hover:text-amber transition-colors tracking-wide"
            >
              hello@ameetmehta.com
            </Link>
            <div className="flex gap-5">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-muted hover:text-ink transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-muted">
            &copy; {new Date().getFullYear()} Ameet Mehta
          </p>
        </div>
      </div>
    </footer>
  );
}
