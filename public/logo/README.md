# Logo Directory

This directory contains logo assets for the site.

## Current Logo

**File:** `vinay-logo.svg`

A playful, handwritten-style logo featuring:
- Dynamic "V" with a swoosh
- Clean "inay" text
- Small accent dot (signature mark)
- Subtle underline

## Replacing the Logo

The logo system is designed for easy replacement:

### Option 1: Replace the SVG
Simply replace `vinay-logo.svg` with your custom logo SVG.

### Option 2: Update the Logo Component
Edit `components/Logo.tsx` to:
- Use a different file format (PNG, WebP, etc.)
- Change dimensions
- Add custom animations
- Swap the inline SVG entirely

### Option 3: Different Logo Per Theme
The logo inherits `currentColor`, so it automatically adapts to:
- Light/dark themes
- Different accent colors per route

## Design Notes

- **No hardcoded dimensions**: Logo sizing is flexible via className
- **Theme-aware**: Uses `currentColor` for automatic theme integration
- **Accessibility**: Includes `aria-label` for screen readers
- **Performance**: Inline SVG for faster loading and better control

