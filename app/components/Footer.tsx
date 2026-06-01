import Link from "next/link";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ameetmehta/" },
  { label: "Instagram", href: "https://www.instagram.com/ameet3000/" },
  { label: "Art", href: "https://www.instagram.com/ameet3000.art/" },
  { label: "Music", href: "https://www.instagram.com/sadubas/reels/" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Ameet Mehta
        </p>
        <div className="flex gap-6">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground"
            >
              {s.label}
            </Link>
          ))}
        </div>
        <Link
          href="mailto:hello@ameetmehta.com?subject=Hey%20Ameet!%20Let%27s%20Connect"
          className="text-xs text-muted transition-colors hover:text-accent"
        >
          hello@ameetmehta.com
        </Link>
      </div>
    </footer>
  );
}
