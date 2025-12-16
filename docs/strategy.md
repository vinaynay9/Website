# Vinay — Site Blueprint

## 1. Site map & page goals
- `/` Home — cinematic scroll-snap story: scenes introduce Vinay, interactive hover gallery, project teaser, chase statement, and navigation to themed worlds.
- `/projects` Projects index — focused cards with statuses, tags, and discovery CTA; able to deep-link individual stories later.
- `/timeline` Timeline — life milestones (Tampa origins → Georgia Tech → builder/internship arc → present) told via stacked cards.
- `/activity` Activity — chapters for sports, hiking, scuba, gym lifts; accent color and sticky index highlight each chapter.
- `/travel` Travel — interactive SVG map + modals per country with photo carousel and notes.
- `/music` Music — instruments, playlists, musical theatre notes, placeholders for Spotify embeds.
- `/board` Board of Directors — private, not in nav; respectful list with optional passphrase gate and future private links.
- Global nav/footer — minimal header (Vinay + nav), footer repeats nav + email/LinkedIn/GitHub placeholders.

## 2. Component architecture
- `LayoutShell` — wraps routes with header, footer, and shared padding; wires global cursor & Lenis.
- `Cursor` — custom dot+ring overlay driven via `CursorProvider` context; handles hover states (default/link/reveal/modal).
- `ScrollScenes` + `Scene` — home-specific scroll-snap wrapper that staggers Framer Motion reveals per scene.
- `HoverRevealCard` — image front layer with hidden text back; supports hover reveal, focus states, and modal trigger.
- `ProjectCard` — project preview with title, tagline, status badge, and CTA link.
- `SectionHeader` — consistent heading + subtitle block with motion states.
- `Modal` — reusable overlay for travel country details/home panel extras.
- `MapSVG` — simplified interactive SVG world map wired to `travel.ts` data.
- `TimelineItem` — milestone card with heading, dates, bullets, optional tags and gallery.
- `LenisProvider` — initializes Lenis smooth scroll and exposes scroll position for motion triggers.

## 3. Design system (tokens)
- **Colors**: `black` (#000), `surface` (#0c0c0c), `muted` (#1f1f1f), `text` (#f7f7f2), `accent` (~#7ee787 for global, with per-page variants: travel deep blue #0f3d6b, activity rust #b86c32, music purple #8d6ddc).
- **Typography**:
  - Display (Clash Display 96/80); Heading (Clash Display 48/40); Body (Inter 18/28); Caption (Inter 14/20).
- **Spacing**: scale (px) `[0, 8, 16, 24, 32, 48, 64, 96]`.
- **Radii**: `sm` 6px, `md` 12px, `lg` 24px.
- **Shadows**: `light` (0 10px 40px rgba(0,0,0,0.35)), `focus` (0 0 0 18px rgba(255,255,255,0.1)).
- **Motion**: durations `[0.25s, 0.45s, 0.8s]`, easings (`cubic-bezier(0.19, 1, 0.22, 1)`), springs (`mass:1`, `damping:20`, `stiffness:120`). Respect prefers-reduced-motion by halving durations and skipping parallax.

## 4. Interaction notes
- Smooth Lenis scroll, scroll-snap scenes, and Framer Motion for fades/tilts.
- Hover reveals (panels/pictures), custom cursor states, subtle noise overlay on home.
- Modal transitions use Framer Motion `layoutId` for shared elements when triggered.
- Accessible focus rings, semantic markup, reduced-motion detection to simplify transforms.


