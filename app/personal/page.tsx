export default function PersonalPage() {
  const sections = [
    {
      title: "Music",
      emoji: "🎵",
      description:
        "Compositions, productions, and sonic experiments exploring rhythm, melody, and atmosphere.",
      items: [
        { title: "Coming Soon", description: "Music projects and recordings will be showcased here." },
      ],
    },
    {
      title: "Art",
      emoji: "🎨",
      description:
        "Visual explorations across digital and physical media.",
      items: [
        { title: "Coming Soon", description: "Art projects and pieces will be showcased here." },
      ],
    },
    {
      title: "Vibe Coded Programs",
      emoji: "✨",
      description:
        "Creative coding experiments and programs built with vibes — where intuition meets technology.",
      items: [
        { title: "Coming Soon", description: "Vibe coded projects and experiments will be showcased here." },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Personal Work</h1>
      <p className="text-lg text-[var(--muted)] mb-12 max-w-2xl">
        Creative explorations beyond the day job — music, art, and programs built with vibes.
      </p>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{section.emoji}</span>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            </div>
            <p className="text-[var(--muted)] mb-6 max-w-xl">{section.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]"
                >
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
