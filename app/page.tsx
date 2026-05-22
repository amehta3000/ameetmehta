import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-20">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          Ameet Mehta
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
          20+ years designing &amp; building internet experiences using empathy,
          rapid prototyping and systems thinking to bring zero-to-one products to
          life.
        </p>
        <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
          Currently consulting small to medium-sized businesses, providing user
          research, design, mentorship, and product strategy to help achieve
          product-market fit.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/professional"
          className="group p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] transition-all hover:scale-[1.02]"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
            Professional Work
          </h2>
          <p className="text-[var(--muted)]">
            Product design, UX, branding, and strategy projects from 20+ years of practice.
          </p>
        </Link>

        <Link
          href="/personal"
          className="group p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] transition-all hover:scale-[1.02]"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
            Personal Work
          </h2>
          <p className="text-[var(--muted)]">
            Music, art, and vibe coded programs — creative explorations beyond the day job.
          </p>
        </Link>
      </section>
    </div>
  );
}
