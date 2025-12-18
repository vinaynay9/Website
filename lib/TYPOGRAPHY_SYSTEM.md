# Typography System

This document describes the site's typography personality and branding strategy.

## Philosophy

The typography system balances:
- **Personal & Creative**: Expressive fonts that show personality
- **Readable & Tasteful**: Never sacrificing clarity for style
- **Flexible**: Easy to update and evolve

## Navigation Typography

### Bottom Navigation (Main Nav)
- **Font**: Righteous (playful, comic-book inspired)
- **Style**: Medium weight, relaxed letter spacing
- **Feel**: Casual, approachable, slightly expressive
- **CSS Class**: `.nav-link-playful`

### Top Navigation (Contact Links)
- **Font**: Fredoka (friendly, rounded)
- **Style**: Medium weight, minimal letter spacing
- **Feel**: Clean, modern, welcoming
- **CSS Class**: `.nav-link-contact`

### Design Rationale
Navigation links use more playful fonts to:
1. Make the site feel less corporate
2. Add personality without overwhelming content
3. Create visual interest in UI chrome
4. Maintain excellent readability

## Logo System

### Current Implementation
- **Component**: `components/Logo.tsx`
- **Asset**: `public/logo/vinay-logo.svg`
- **Style**: Handwritten "V" + clean "inay" text

### Logo Strategy
The logo is intentionally designed as a **placeholder** that:
- Doesn't lock into a "final" design
- Adapts to theme colors automatically
- Can be easily replaced with a custom graphic
- Maintains flexibility for future branding

### Replacing the Logo
See `public/logo/README.md` for replacement instructions.

## Content Typography

Content typography (body text, headings) remains clean and professional:
- **Primary**: Space Grotesk (modern, geometric)
- **Fallback**: Inter (reliable, readable)
- **Hierarchy**: Clear distinction between display and body text

## Typography Variables

CSS variables for easy customization:

```css
--text-display: Space Grotesk, Inter, system-ui
--text-body: Space Grotesk, Inter, system-ui
--text-nav-playful: Righteous, Fredoka, system-ui
--text-nav-contact: Fredoka, Inter, system-ui
```

## Font Loading

All fonts are self-hosted in `/public/fonts/` for:
- Performance (no external requests)
- Reliability (no CDN dependencies)
- Privacy (no tracking)

See `lib/fonts.ts` for font definitions.

## Accessibility

- All fonts maintain WCAG AA contrast ratios
- Reduced motion preferences respected
- Semantic HTML preserved
- Screen reader friendly

## Future Considerations

### When to Update Typography
- Logo: Replace when custom graphic is ready
- Navigation: Adjust if readability issues arise
- Content: Maintain current clean approach

### Adding New Fonts
1. Add font files to `/public/fonts/{FontName}/`
2. Define in `lib/fonts.ts`
3. Add CSS variable to `styles/globals.css`
4. Update this document

## Examples

### Playful Navigation
```tsx
<Link className="nav-link-playful">
  Projects
</Link>
```

### Contact Links
```tsx
<a className="nav-link-contact">
  LinkedIn
</a>
```

### Logo Usage
```tsx
import { Logo } from "@/components/Logo";

<Logo className="custom-sizing" />
```

