# 3D Globe Implementation Guide

## Overview

The Travel page features an interactive 3D globe built with `globe.gl` and `react-globe.gl`, rendered using Three.js. This document explains the architecture, version compatibility, known issues, and how to extend the implementation.

## Why globe.gl?

- **Stable ecosystem**: Well-maintained library with active community
- **Three.js integration**: Built on proven WebGL foundation
- **Polygon support**: Native GeoJSON/TopoJSON support for country highlighting
- **React wrapper**: `react-globe.gl` provides clean React integration
- **Performance**: Optimized for smooth 60fps interactions
- **Extensibility**: Easy to add markers, arcs, and custom layers

## Version Compatibility Matrix

**CRITICAL**: These versions are pinned for stability. Do NOT upgrade without thorough testing.

```json
{
  "three": "0.152.2",
  "globe.gl": "2.32.1",
  "react-globe.gl": "2.24.0",
  "three-globe": "2.27.0"
}
```

### Why This Combination Works

1. **three@0.152.2**: 
   - Stable release before WebGPU became default
   - WebGL-focused, avoiding WebGPU import errors
   - Compatible with Next.js 14 App Router

2. **globe.gl@2.32.1**:
   - Compatible with three@0.152.2
   - Stable polygon rendering
   - No experimental features

3. **react-globe.gl@2.24.0**:
   - React 18 compatible
   - Clean component API
   - Proper TypeScript support

4. **three-globe@2.27.0**:
   - Core globe engine
   - Matches globe.gl version requirements

### What to Avoid Breaking It

**DO NOT:**
- Upgrade `three` beyond 0.152.x without testing WebGPU imports
- Use caret (`^`) or tilde (`~`) ranges for these packages
- Add other Three.js-related packages that might conflict
- Import `three/webgpu` anywhere in the codebase
- Mix different versions of Three.js ecosystem packages

**DO:**
- Pin exact versions in `package.json`
- Test thoroughly after any dependency changes
- Keep globe code isolated in `components/globe/`
- Use client-only rendering (`"use client"` + `dynamic` import with `ssr: false`)

## Architecture

### Component Structure

```
components/
  globe/
    GlobeClient.tsx    # Main globe component (isolated)
app/
  travel/
    travel-client.tsx  # Page component (imports GlobeClient)
data/
  travel.ts            # Country data (NO hardcoded data in globe)
```

### Data Flow

1. **Data Source**: `data/travel.ts` exports `visitedCountries` array
2. **Page Component**: `travel-client.tsx` imports data and passes to GlobeClient
3. **Globe Component**: `GlobeClient.tsx` receives props, no hardcoded countries
4. **User Interaction**: Click events bubble up to page component, which opens modal

### Client-Only Rendering

The globe MUST render only on the client because:
- WebGL requires browser APIs (`canvas`, `WebGLRenderingContext`)
- Three.js cannot run during SSR
- Next.js App Router SSR would crash without proper isolation

Implementation:
```tsx
// In travel-client.tsx
const GlobeClient = dynamic(
  () => import("@/components/globe/GlobeClient").then(mod => mod.GlobeClient),
  { ssr: false }
);
```

## Features

### Current Implementation

✅ **Click + Drag Rotation**
- Smooth inertial movement via `enableDamping: true`
- Damping factor: `0.05` for natural feel
- No auto-rotate (user controls)

✅ **Scroll Zoom**
- Enabled via `enableZoom: true`
- Limits: `minDistance: 200`, `maxDistance: 1000`

✅ **Country Highlighting**
- Visited countries: Forest green (`#238636`) with slight elevation
- Non-visited: Muted gray (`rgba(255,255,255,0.1)`)
- Uses polygon `capColor` and `altitude` props

✅ **Click Events**
- Logs country name to console (dev mode)
- Opens modal if country is visited
- Passes `isVisited` flag to handler

✅ **Performance**
- ResizeObserver for responsive sizing
- Reduced motion support (disables transitions)
- WebGL fallback with country list
- Proper cleanup on unmount

✅ **Error Handling**
- WebGL detection
- TopoJSON parsing errors
- Library load failures
- Graceful fallbacks

## Known Pitfalls

### 1. WebGPU Import Errors

**Symptom**: `Cannot find module 'three/webgpu'` or similar

**Cause**: Newer versions of `three` include WebGPU, which `globe.gl` may try to import

**Solution**: 
- Use `three@0.152.2` (WebGL-only)
- Never import `three/webgpu` directly
- Check `package.json` for pinned versions

### 2. Hot Reload Crashes

**Symptom**: Globe crashes during Next.js hot reload

**Cause**: Three.js context not properly cleaned up

**Solution**: 
- Proper cleanup in `useEffect` return
- ResizeObserver disconnect
- Globe ref nullification

### 3. Country Name Mismatches

**Symptom**: Countries not highlighting despite being in `visitedCountries`

**Cause**: `world-atlas` uses different names (e.g., "Czechia" vs "Czech Republic")

**Solution**: 
- Use `countryNameMap` in `data/travel.ts`
- Normalize names in `visitedSet` creation
- Check browser console for actual country names

### 4. Controls Not Working

**Symptom**: Globe doesn't rotate or zoom

**Cause**: Controls API may differ between versions

**Solution**:
- Check `globe.controls()` returns valid object
- Verify `enablePointerInteraction: true`
- Test in different browsers

### 5. Memory Leaks

**Symptom**: Performance degrades over time

**Cause**: Missing cleanup, animation loops not stopped

**Solution**:
- Always cleanup in `useEffect` return
- Stop `requestAnimationFrame` loops
- Disconnect ResizeObserver
- Null refs on unmount

## How to Extend

### Add State/City Layers

1. Load state GeoJSON data:
```tsx
import statesTopo from "world-atlas/states-110m.json";

const states = useMemo(() => {
  return feature(statesTopo, statesTopo.objects.states);
}, []);
```

2. Add to globe:
```tsx
<Globe
  polygonsData={[...countries, ...states]}
  polygonCapColor={({ properties }) => {
    // Check if state is visited
    return isStateVisited(properties.name) ? visitedColor : nonVisitedColor;
  }}
/>
```

3. Update data structure in `data/travel.ts`:
```ts
export const visitedStates: { country: string; states: string[] }[] = [
  { country: "United States", states: ["Florida", "California", ...] }
];
```

### Add Markers (Points)

```tsx
const markers = [
  { lat: 40.7128, lng: -74.0060, label: "New York" },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles" }
];

<Globe
  pointsData={markers}
  pointColor="color"
  pointRadius={0.5}
  pointLabel="label"
  onPointClick={(point) => {
    console.log("Marker clicked:", point.label);
  }}
/>
```

### Add Arcs (Connections)

```tsx
const arcs = [
  { startLat: 40.7128, startLng: -74.0060, endLat: 34.0522, endLng: -118.2437 }
];

<Globe
  arcsData={arcs}
  arcColor={() => "rgba(255,0,0,0.5)"}
  arcStroke={0.5}
  arcDashLength={0.4}
  arcDashGap={0.2}
/>
```

### Country Drill-Down

1. Add state to track selected country:
```tsx
const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
```

2. On country click, load state data:
```tsx
onPolygonClick={(feature) => {
  const country = feature.properties.name;
  setSelectedCountry(country);
  // Load states for this country
  loadStatesForCountry(country);
}}
```

3. Conditionally render states layer:
```tsx
<Globe
  polygonsData={selectedCountry ? statesForCountry : countries}
  // ... other props
/>
```

## Performance Tips

1. **Memoize Data**: Use `useMemo` for parsed GeoJSON
2. **Avoid Re-renders**: Keep globe props stable, use refs for instance
3. **Limit Polygons**: Use lower resolution TopoJSON (110m vs 50m)
4. **Disable Unused Features**: Set `globeCloudsOpacity={0}` if not needed
5. **Reduce Motion**: Respect `prefers-reduced-motion` media query

## Testing

### Manual Testing Checklist

- [ ] Globe loads without errors
- [ ] Drag rotation works smoothly
- [ ] Scroll zoom works
- [ ] Visited countries are highlighted (forest green)
- [ ] Non-visited countries are muted
- [ ] Click on visited country opens modal
- [ ] Click on non-visited country logs name
- [ ] Resize works (try window resize)
- [ ] Reduced motion disables transitions
- [ ] WebGL fallback shows country list
- [ ] No console errors
- [ ] No memory leaks (check over time)

### Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (may need WebGL enable)
- ⚠️ Mobile browsers (test on device)
- ❌ IE11 (not supported)

## Troubleshooting

### Globe Not Rendering

1. Check browser console for errors
2. Verify WebGL support: `checkWebGLSupport()`
3. Check `visitedCountries` array is not empty
4. Verify TopoJSON loads correctly
5. Check React DevTools for component mount

### Countries Not Highlighting

1. Check country names match `world-atlas` names
2. Verify `visitedSet` includes normalized names
3. Check `countryNameMap` mappings
4. Log country names in `onPolygonHover` to see actual names

### Controls Not Working

1. Verify `enablePointerInteraction: true`
2. Check `globe.controls()` returns object
3. Test in different browser
4. Check for CSS `pointer-events: none` on container

## Future Enhancements

- [ ] Add country drill-down (states/cities)
- [ ] Add travel route arcs between countries
- [ ] Add photo markers at specific locations
- [ ] Add timeline animation (show travel over time)
- [ ] Add search/filter countries
- [ ] Add country info tooltips
- [ ] Add keyboard controls (arrow keys for rotation)

## References

- [globe.gl Documentation](https://github.com/vasturiano/globe.gl)
- [react-globe.gl GitHub](https://github.com/vasturiano/react-globe.gl)
- [Three.js Documentation](https://threejs.org/docs/)
- [world-atlas Data](https://github.com/topojson/world-atlas)

