# Site Plan & Design System

## Sitemap & Page Goals

- `/` — **Home**: A scroll-snap story with seven cinematic scenes, hover-reveal panels, project teaser cards, and pathways to themed pages. Introduces Vinay with quiet confidence and sets interaction tone (custom cursor, Lenis scroll, spry panels).
- `/projects` — **Projects Index**: Card grid of active builds, tagged context, and CTAs; consistent card/hover styling establishes easy expandability for deep links.
- `/timeline` — **Life Story**: Vertical milestone stack covering Tampa, Georgia Tech, startups, internships, and present focus. Accessible navigation and optional mini-galleries.
- `/activity` — **Activity Narrative**: Stacked chapters (sports, hiking, scuba, gym) with accent tones, scroll-reveal headers, and subtle card tilts.
- `/travel` — **Travel Map**: Interactive SVG map, modal snapshots, and travel log data for countries visited; ready for future map provider upgrade.
- `/music` — **Music Portfolio**: Instrument roster, playlists, and musical theater notes with card ripple/hover cues; placeholder for Spotify embeds.
- `/board` — **Board of Directors**: Passphrase-gated mentor list, robots noindex, private tone, scaffold for later secure sharing.

## Component Architecture

- `LayoutShell` — global header/footer, noise layer, cursor provider, Lenis provider, nav links, focus states.
- `Scene` / `ScrollScene` wrappers — full-viewport sections with Framer Motion fade/slide, scroll-snap anchors, accessible semantics.
- `HoverRevealCard` — front image frame + hidden text layer, hover transform, cursor state, click handler for modal routing.
- `ProjectCard` — status badge, tags, CTA, motion entry plus link behavior.
- `SectionHeader` — ensures consistent typography for section titles/subheads.
- `Cursor` / `CursorProvider` — dot+ring cursor, state machine (`default`, `link`, `reveal`, `modal`), reduced-motion guard.
- `Modal` — overlay, motion entrance/exit, focus trap fallback (keyboard friendly).
- `MapSVG` — simple clickable map/chunk data hookup for travel page, highlight modifier.
- `TimelineItem` — milestone card with accent strip, bullet list, optional chips, responsive layout.
- `Data modules` (`projects`, `timeline`, `activity`, `travel`, `music`, `homePanels`) — single source for content, easy to expand.

## Design System

- **Colors**  
  - `background`: `#000000` (pure black)  
  - `surface`: `#0c0c0c` (deep charcoal)  
  - `muted`: `#111111`  
  - `border`: `rgba(255,255,255,0.08)`  
  - `text`: `#f5f5f0`  
  - `accent`: `#7ee787` (lime)  
  - `accent-cards`: `#1b1b1b` / `#121212`  
  - Themed accents: travel `#0f3d6b`, activity `#a55f2d`, music `#8c63dc`

- **Typography**  
  - `Display` (Clash Display, 72px, 0.05em tracking) for scene statements  
  - `Heading` (Clash Display, 36px, 0.08em) for sections  
  - `Body` (Inter, 18px, 1.6 line) for paragraphs  
  - `Caption` (Inter, 12px, uppercase letter spacing 0.4em) for nav/footer/CTAs

- **Spacing** — modular scale (1.25) around `space-4` (`1rem`), `space-6` (`1.5rem`), `space-8` (`2rem`), `space-10` (`2.5rem`), `space-12` (`3rem`), `space-14` (`3.5rem`), `space-16` (`4rem`), `space-20` (`5rem`).

- **Radii & Depth**  
  - `sm`: `6px`, `md`: `12px`, `lg`: `24px` for cards.  
  - Shadows use `0 20px 45px rgba(0,0,0,0.45)` for depth, `focus` ring uses `0 0 0 18px rgba(126,231,135,0.25)`.

- **Motion**  
  - Durations: `short` 0.25s, `medium` 0.45s, `long` 0.8s.  
  - Easing: `cubic-bezier(0.19, 1, 0.22, 1)` (smooth out).  
  - Reduced motion: all transforms drop to fade-only, Lenis disabled, cursor hidden.

All tokens live in `tailwind.config.js` and are referenced via CSS variables in `styles/globals.css` for flexibility.

