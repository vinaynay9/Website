# Performance Checklist

This document outlines performance optimizations implemented and how to measure/reproduce performance improvements.

## What Was Optimized

### 1. Parallax System Refactoring
**Problem**: Each `ParallaxLayer` component was creating its own `useScroll` hook, causing multiple scroll listeners and performance degradation.

**Solution**: 
- Created `SharedScrollProvider` and `useSharedScroll` hook
- Single scroll progress source shared across all parallax layers
- `ParallaxLayer` now accepts optional `scrollProgress` prop for flexibility

**Files Changed**:
- `lib/motion/useSharedScroll.ts` (new)
- `components/motion/ParallaxLayer.tsx`
- `components/LayoutShell.tsx`
- `app/home-client.tsx`

### 2. Heavy Component Dynamic Imports
**Problem**: `ElectricField` component is heavy and was being loaded on initial page load.

**Solution**: Dynamically import `ElectricField` with `ssr: false` to reduce initial bundle size.

**Files Changed**:
- `app/home-client.tsx`

### 3. React.memo for Repeated Components
**Problem**: `ProjectCard` and `HoverRevealCard` were re-rendering unnecessarily.

**Solution**: Wrapped components with `React.memo` to prevent unnecessary re-renders.

**Files Changed**:
- `components/ProjectCard.tsx`
- `components/HoverRevealCard.tsx`

### 4. Route Transition Feedback
**Problem**: No visual feedback during route transitions.

**Solution**: Added `RouteProgress` component that shows a subtle top progress bar during route changes.

**Files Changed**:
- `components/RouteProgress.tsx` (new)
- `components/LayoutShell.tsx`

### 5. Performance Utilities
**Problem**: No way to measure performance in development.

**Solution**: Created performance marker utilities for dev-only timing measurements.

**Files Changed**:
- `lib/perf/markers.ts` (new)
- `lib/perf/index.ts` (new)

## How to Measure Performance

### Development Mode

1. **Use Performance Markers**:
```typescript
import { markStart, markEnd, summary } from "@/lib/perf";

// In your component
markStart("Component Render");
// ... component logic ...
markEnd("Component Render");
summary(); // See full timeline
```

2. **Browser DevTools**:
   - Open DevTools → Performance tab
   - Record a session while navigating/scrolling
   - Look for:
     - Long tasks (>50ms)
     - Layout shifts
     - Paint times
     - JavaScript execution time

3. **React DevTools Profiler**:
   - Enable Profiler in React DevTools
   - Record a session
   - Check for unnecessary re-renders

### Production Mode

1. **Lighthouse**:
```bash
# Build and start production server
npm run build
npm start

# Run Lighthouse (Chrome DevTools or CLI)
lighthouse http://localhost:3000 --view
```

2. **Web Vitals**:
   - Use Chrome DevTools → Lighthouse → Web Vitals
   - Key metrics:
     - **FCP** (First Contentful Paint): < 1.8s
     - **LCP** (Largest Contentful Paint): < 2.5s
     - **TTI** (Time to Interactive): < 3.8s
     - **TBT** (Total Blocking Time): < 200ms
     - **CLS** (Cumulative Layout Shift): < 0.1

3. **Network Tab**:
   - Check bundle sizes
   - Verify code splitting is working
   - Check for unnecessary requests

## Performance Targets

### Route Transitions
- **Click feedback**: < 200ms (hover/active states + loader)
- **Route change**: < 300ms visual feedback
- **No hanging loaders**: Loader disappears after navigation completes

### Scroll Performance
- **60 FPS**: Smooth scrolling with no jank
- **No layout thrash**: Animations use `transform` and `opacity` only
- **Single scroll listener**: Shared scroll hook prevents multiple listeners

### Component Rendering
- **No unnecessary re-renders**: `React.memo` prevents re-renders when props haven't changed
- **Heavy components lazy-loaded**: `ElectricField` and `GlobeClient` loaded on demand

## What to Test

### 1. Dev vs Production
```bash
# Development
npm run dev
# Navigate and scroll, check console for performance markers

# Production
npm run build
npm start
# Compare smoothness - production should be noticeably better
```

### 2. Route Transitions
- Click navigation links
- Verify top progress bar appears
- Verify loader doesn't hang
- Check that hover states respond immediately

### 3. Scroll Performance
- Scroll through home page
- Check for jank/stuttering
- Verify parallax layers move smoothly
- Test on slower devices if possible

### 4. Component Re-renders
- Open React DevTools Profiler
- Record a session while scrolling/navigating
- Check that `ProjectCard` and `HoverRevealCard` don't re-render unnecessarily

### 5. Bundle Size
```bash
npm run build
# Check .next/analyze or use @next/bundle-analyzer
# Verify code splitting is working
```

## Known Issues / Remaining Optimizations

### Potential Future Improvements

1. **Image Optimization**:
   - Ensure all images use Next.js `Image` component
   - Add `priority` only to hero images
   - Consider using WebP format

2. **Font Loading**:
   - Verify fonts are loaded efficiently
   - Consider `font-display: swap` for better FCP

3. **Backdrop Filter**:
   - Currently used in header (`backdrop-blur-sm`)
   - Monitor performance impact on lower-end devices
   - Consider reducing blur radius if needed

4. **ElectricField Animation**:
   - Currently runs `requestAnimationFrame` loop
   - Consider pausing when not visible (Intersection Observer)
   - Already disabled on mobile and reduced motion

5. **Webpack Cache (Windows)**:
   - Next.js 14 manages cache internally
   - If cache issues occur, use `npm run clean:next`
   - Monitor `.next/cache` directory size

## Verification Checklist

Before considering performance work complete:

- [ ] `next build` succeeds without errors
- [ ] `next start` is noticeably smoother than `next dev`
- [ ] Route transitions show progress bar and respond < 200ms
- [ ] No UI jank during scroll (60 FPS)
- [ ] No red console warnings
- [ ] Lighthouse scores:
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90
- [ ] Web Vitals pass:
  - FCP < 1.8s
  - LCP < 2.5s
  - TTI < 3.8s
  - TBT < 200ms
  - CLS < 0.1
- [ ] No unnecessary re-renders (React DevTools Profiler)
- [ ] Heavy components load on demand (check Network tab)

## Reproducing Performance Issues

If performance degrades:

1. **Check for new scroll listeners**:
   - Search codebase for `useScroll` calls
   - Ensure they use `useSharedScroll` when possible

2. **Check for new heavy components**:
   - Look for components that should be dynamically imported
   - Consider `React.memo` for repeated components

3. **Check animations**:
   - Ensure animations use `transform`/`opacity` only
   - Avoid animating `width`, `height`, `top`, `left`

4. **Check bundle size**:
   - Run `npm run build` and check bundle sizes
   - Look for unexpectedly large chunks

5. **Check console**:
   - Look for performance warnings
   - Check for memory leaks
   - Verify no unnecessary re-renders

## Performance Monitoring

### Development
- Use `lib/perf/markers.ts` utilities
- Check React DevTools Profiler
- Monitor browser Performance tab

### Production
- Use Lighthouse for audits
- Monitor Web Vitals
- Check bundle analyzer for size regressions

## Notes

- Performance optimizations are most noticeable in production builds
- Dev mode will always be slower due to hot reloading and source maps
- Windows filesystem cache can be slower than Unix systems - this is expected
- Some optimizations (like `React.memo`) have minimal impact but prevent future regressions

