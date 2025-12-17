# Travel Globe Testing Checklist

This document outlines testing procedures and acceptance criteria for the Travel globe feature.

## Development Testing

### Initial Load Test
1. Start dev server: `npm run dev`
2. Navigate to `/travel`
3. **Expected**: Globe should appear within 2 seconds
4. **Check**: Console should show debug logs (dev mode only):
   - `[GlobeClient] Mount`
   - `[GlobeClient] Countries parsed`
   - `[GlobeClient] Container size updated`
   - `[GlobeClient] Texture load start`
   - `[GlobeClient] Texture load success` (or fallback attempts)
   - `[GlobeClient] Globe init start`
   - `[GlobeClient] Globe init success`

### Navigation Test
1. Navigate to `/travel`
2. Wait for globe to load
3. Navigate away (e.g., to `/`)
4. Navigate back to `/travel`
5. **Expected**: 
   - Globe loads again without errors
   - No "Rendered more hooks" errors
   - Console shows cleanup logs on unmount

### Hot Reload Test
1. Navigate to `/travel`
2. Wait for globe to load
3. Make a code change (e.g., edit a comment)
4. **Expected**: 
   - Hot reload completes
   - Globe remains stable
   - No crashes or errors

### Resize Test
1. Navigate to `/travel`
2. Wait for globe to load
3. Resize browser window
4. **Expected**: 
   - Globe resizes smoothly
   - No layout shifts or crashes
   - Container size updates in debug overlay

### Interaction Test
1. Navigate to `/travel`
2. Wait for globe to load
3. Hover over countries
4. **Expected**: 
   - Tooltip appears showing country name
   - No lag or stuttering
   - Tooltip disappears when moving away
5. Click on visited countries
6. **Expected**: 
   - Modal opens with country details
   - Console logs country name (dev mode)
   - No crashes

### Texture Loading Test
1. Navigate to `/travel`
2. Open DevTools Network tab
3. Throttle network to "Slow 3G"
4. **Expected**: 
   - Loading overlay appears
   - Texture loads (may take longer)
   - Falls back to next URL if one fails
   - Globe still renders (even if texture fails)

### Offline Test
1. Navigate to `/travel`
2. Open DevTools → Application → Service Workers
3. Go offline (DevTools → Network → Offline)
4. Refresh page
5. **Expected**: 
   - Globe still renders (uses local texture if available)
   - Or shows fallback with country list
   - No crashes

## Production Build Testing

### Build Test
1. Run: `npm run build`
2. **Expected**: 
   - Build completes without errors
   - No TypeScript errors
   - No linting errors
   - Globe component bundles correctly

### Production Server Test
1. Run: `npm run build && npm run start`
2. Navigate to `/travel`
3. **Expected**: 
   - Globe loads and renders
   - No console errors (debug logs should be absent)
   - Performance is acceptable

### Production Bundle Size
1. Run: `npm run build`
2. Check `.next` bundle analysis
3. **Expected**: 
   - Globe code is code-split
   - Initial page load is fast
   - Globe loads progressively

## Performance Testing

### Frame Rate Test
1. Navigate to `/travel`
2. Open DevTools → Performance
3. Start recording
4. Interact with globe (drag, zoom, hover)
5. Stop recording
6. **Expected**: 
   - FPS stays above 30 (ideally 60)
   - No long tasks (>50ms)
   - Smooth animations

### Memory Test
1. Navigate to `/travel`
2. Open DevTools → Memory
3. Take heap snapshot
4. Navigate away and back 5 times
5. Take another heap snapshot
6. **Expected**: 
   - No memory leaks
   - Memory usage is stable
   - Cleanup happens on unmount

## Cross-Browser Testing

Test on:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Expected**: Globe renders and functions correctly on all browsers

## Acceptance Criteria

### ✅ Success Criteria

- [ ] No runtime errors after repeated navigation
- [ ] Globe visible within 2 seconds on decent network
- [ ] If offline: still shows local texture globe or fallback
- [ ] Hover tooltip stable, click stable
- [ ] No React hook order errors
- [ ] No console spam (except dev debug logs)
- [ ] Build passes: `npm run build`
- [ ] Dev server runs: `npm run dev`
- [ ] Visited countries highlight correctly
- [ ] Clicking visited countries opens modal
- [ ] Globe resizes correctly
- [ ] Performance is smooth (no stuttering)

### ❌ Failure Modes to Watch For

- Globe renders black/blank
- Hover shows country names while sphere is invisible
- Crashes after navigating away/back
- Huge latency or frame drops
- Memory leaks
- Build failures
- TypeScript errors
- Console errors in production

## Debugging

If issues occur:

1. **Check console logs** (dev mode):
   - Look for `[GlobeClient]` prefixed logs
   - Check for texture load failures
   - Check for init failures

2. **Check debug overlay** (dev mode):
   - Size should be > 0
   - Texture should show ✓
   - WebGL should show ✓
   - Init should show ✓

3. **Check Network tab**:
   - Texture requests should succeed
   - Check for CORS errors
   - Check for 404s

4. **Check Performance tab**:
   - Look for long tasks
   - Check frame rate
   - Check memory usage

## Notes

- Debug logs are only shown in development mode
- Local texture should be placed in `/public/globe/earth-blue-marble.jpg`
- If local texture is missing, remote URLs are used as fallback
- Globe component is client-only (no SSR)

