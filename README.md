# Ameet Mehta — Personal Website

A minimal, modern personal website built with Next.js, React, and Tailwind CSS.

## Features

- **Dark/Light mode** with system preference detection
- **Configurable background color** via theme panel (presets + custom color picker)
- **Professional Work** — portfolio pages showcasing product design and UX projects
- **Personal Work** — music, art, and vibe coded programs

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

- `app/page.tsx` — Home page
- `app/professional/` — Professional portfolio grid + detail pages
- `app/personal/` — Personal work (music, art, vibe coded programs)
- `app/components/` — Navigation, theme toggle
- `app/theme-provider.tsx` — Dark/light mode + custom background color context
