"use client";

import Globe from "react-globe.gl";

/**
 * GlobeClient - Isolated 3D Globe Component
 * 
 * TODO: Consider splitting utility functions:
 * - lib/globe/globe-utils.ts (checkWebGLSupport, prefersReducedMotion, makeCountries)
 * - components/globe/GlobeClient.tsx (main component)
 * 
 * A stable, client-only implementation of an interactive 3D globe using globe.gl.
 * This component handles all WebGL/Three.js logic and should remain isolated from
 * other parts of the application.
 * 
 * Features:
 * - Click + drag rotation with smooth inertial movement
 * - Scroll zoom (optional)
 * - Country highlighting (visited = forest green, non-visited = muted gray)
 * - Click events with country name logging
 * - Resize handling
 * - Reduced motion support
 * - WebGL fallback
 * - Proper cleanup on unmount
 * 
 * Data:
 * - All country data comes from props (visited list from data/travel.ts)
 * - No hardcoded countries in this component
 * 
 * Hook Order Fix:
 * - Previously, useState for currentTextureUrl was declared after conditional returns,
 *   causing "Rendered more hooks than during the previous render" error.
 * - Fixed by moving all hooks to the top of the component before any conditional returns.
 * - EARTH_TEXTURE_URLS moved outside component to ensure stable reference.
 * 
 * Hardening (2025):
 * - Single initialization guard (prevents double init in React strict mode)
 * - Container size validation before init
 * - Robust texture loading with local fallback
 * - Performance optimizations (throttled events, capped devicePixelRatio)
 * - Comprehensive cleanup on unmount
 * - Debug instrumentation (dev-only)
 * 
 * Future Extensions:
 * - Add states/cities layers by extending polygonsData
 * - Add markers/arcs using pointsData and arcsData props
 * - Add country drill-down by handling polygon click with state management
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";
import type { FeatureCollection, GeometryObject, GeoJsonProperties } from "geojson";
import worldTopo from "world-atlas/countries-110m.json";

type GlobeDisplayProps = {
  visited: string[];
  onCountrySelect: (name: string, isVisited: boolean) => void;
  countryNameMap?: Record<string, string>;
};

type CountryFeature = {
  geometry: GeometryObject;
  properties: GeoJsonProperties & { name: string };
};

// Debug logging utility (dev-only)
const debugLog = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[GlobeClient] ${message}`, ...args);
  }
};

// WebGL detection utility
const checkWebGLSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch (e) {
    return false;
  }
};

// Check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Parse countries from topojson
const makeCountries = (): CountryFeature[] => {
  try {
    const geo = feature(
      worldTopo as any,
      (worldTopo as any).objects.countries
    ) as FeatureCollection;

    return geo.features.map((feature) => ({
      ...feature,
      properties: feature.properties ?? { name: "Unknown" }
    })) as CountryFeature[];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[GlobeClient] Failed to parse globe topojson", error);
    }
    return [];
  }
};

// Earth texture URLs - Priority: local first, then remote fallbacks
// Local texture should be in /public/globe/earth-blue-marble.jpg
const LOCAL_TEXTURE_URL = "/globe/earth-blue-marble.jpg";
const REMOTE_TEXTURE_URLS = [
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg",
  "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
];

// All texture URLs in priority order (local first)
const EARTH_TEXTURE_URLS = [LOCAL_TEXTURE_URL, ...REMOTE_TEXTURE_URLS];

export function GlobeClient({ visited, onCountrySelect, countryNameMap = {} }: GlobeDisplayProps) {
  // All hooks must be declared at the top, before any conditional returns
  // This ensures hooks are always called in the same order on every render
  
  // State
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [globeError, setGlobeError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [textureLoadError, setTextureLoadError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Fixed: moved useState for currentTextureUrl to top with other hooks
  // Using lazy initializer with safe fallback to ensure stable initial state
  const [currentTextureUrl, setCurrentTextureUrl] = useState(() => 
    EARTH_TEXTURE_URLS[0] || ""
  );
  const [textureUrlIndex, setTextureUrlIndex] = useState(0);
  
  // Refs for stable references and preventing re-initialization
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const initializedRef = useRef(false); // Guard against double init
  const animationFrameRef = useRef<number | null>(null);
  const hoverThrottleRef = useRef<number | null>(null);
  const textureLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check WebGL support and reduced motion on mount
  useEffect(() => {
    debugLog("Mount");
    setMounted(true);
    setWebglSupported(checkWebGLSupport());
    setReducedMotion(prefersReducedMotion());
    
    return () => {
      debugLog("Unmount - cleanup");
      // Clear any pending timeouts
      if (textureLoadTimeoutRef.current) {
        clearTimeout(textureLoadTimeoutRef.current);
      }
      if (hoverThrottleRef.current) {
        cancelAnimationFrame(hoverThrottleRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Reset initialization guard
      initializedRef.current = false;
    };
  }, []);

  // Parse countries data (memoized - stable reference)
  const countries = useMemo(() => {
    try {
      const result = makeCountries();
      debugLog("Countries parsed", result.length);
      return result;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[GlobeClient] Failed to parse globe topojson", error);
      }
      return [];
    }
  }, []);

  // Create visited set with normalized names (memoized - stable reference)
  const visitedSet = useMemo(() => {
    const normalized = new Set<string>();
    visited.forEach((name) => {
      normalized.add(name.toLowerCase());
      // Also add mapped names
      const mapped = countryNameMap[name];
      if (mapped) {
        normalized.add(mapped.toLowerCase());
      }
    });
    return normalized;
  }, [visited, countryNameMap]);

  // Memoized color functions to avoid creating new functions on every render
  const visitedColor = "#238636"; // GitHub-style forest green
  const nonVisitedColor = "rgba(255, 255, 255, 0.1)"; // Muted gray/white

  const getPolygonCapColor = useCallback(({ properties }: { properties?: GeoJsonProperties }) => {
    const name = properties?.name as string | undefined;
    if (!name) return nonVisitedColor;
    const normalized = name.toLowerCase();
    return visitedSet.has(normalized) ? visitedColor : nonVisitedColor;
  }, [visitedSet, visitedColor, nonVisitedColor]);

  const getPolygonStrokeColor = useCallback(({ properties }: { properties?: GeoJsonProperties }) => {
    const name = properties?.name as string | undefined;
    if (!name) return "rgba(255,255,255,0.05)";
    const normalized = name.toLowerCase();
    return visitedSet.has(normalized) ? "rgba(35, 134, 54, 0.3)" : "rgba(255,255,255,0.05)";
  }, [visitedSet]);

  const getPolygonAltitude = useCallback(({ properties }: { properties?: GeoJsonProperties }) => {
    const name = properties?.name as string | undefined;
    if (!name) return 0.005;
    const normalized = name.toLowerCase();
    return visitedSet.has(normalized) ? 0.03 : 0.005;
  }, [visitedSet]);

  // Helper to check if country is visited
  const isVisited = useCallback((countryName: string | undefined): boolean => {
    if (!countryName) return false;
    const normalized = countryName.toLowerCase();
    return visitedSet.has(normalized);
  }, [visitedSet]);

  // Helper to get display name for country
  const getDisplayName = useCallback((countryName: string | undefined): string => {
    if (!countryName) return "Unknown";
    return countryNameMap[countryName] || countryName;
  }, [countryNameMap]);

  // Throttled hover handler to prevent performance issues
  const handlePolygonHover = useCallback((feature: any) => {
    if (hoverThrottleRef.current) {
      cancelAnimationFrame(hoverThrottleRef.current);
    }
    
    hoverThrottleRef.current = requestAnimationFrame(() => {
      if (feature?.properties?.name) {
        setHovered(getDisplayName(feature.properties.name as string));
      } else {
        setHovered(null);
      }
      hoverThrottleRef.current = null;
    });
  }, [getDisplayName]);

  // Handle resize with ResizeObserver - ensure container has size before init
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;

    const updateSize = () => {
      const width = container.clientWidth || 0;
      const height = container.clientHeight || 0;
      
      // Only update if size changed and is valid
      if (width > 0 && height > 0) {
        setContainerSize({ width, height });
        debugLog("Container size updated", width, height);
      }
    };

    // Initial size check
    updateSize();

    // Use ResizeObserver for responsive updates
    resizeObserverRef.current = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserverRef.current.observe(container);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [mounted]);

  // Texture loading with fallback chain
  useEffect(() => {
    if (!mounted || !currentTextureUrl) return;

    debugLog("Texture load start", currentTextureUrl);
    setTextureLoaded(false);
    setTextureLoadError(false);

    // Create image to test load
    const img = new Image();
    
    const handleLoad = () => {
      debugLog("Texture load success", currentTextureUrl);
      setTextureLoaded(true);
      setTextureLoadError(false);
      if (textureLoadTimeoutRef.current) {
        clearTimeout(textureLoadTimeoutRef.current);
      }
    };

    const handleError = () => {
      debugLog("Texture load fail", currentTextureUrl);
      setTextureLoadError(true);
      
      // Try next fallback URL
      if (textureUrlIndex < EARTH_TEXTURE_URLS.length - 1) {
        const nextIndex = textureUrlIndex + 1;
        debugLog("Trying next texture", EARTH_TEXTURE_URLS[nextIndex]);
        setTextureUrlIndex(nextIndex);
        setCurrentTextureUrl(EARTH_TEXTURE_URLS[nextIndex]);
      } else {
        // All textures failed, but keep trying with local as fallback
        debugLog("All textures failed, using local fallback");
        setTextureLoaded(false);
      }
    };

    // Set timeout for texture load (10 seconds)
    textureLoadTimeoutRef.current = setTimeout(() => {
      if (!textureLoaded) {
        debugLog("Texture load timeout");
        handleError();
      }
    }, 10000);

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = currentTextureUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
      if (textureLoadTimeoutRef.current) {
        clearTimeout(textureLoadTimeoutRef.current);
      }
    };
  }, [currentTextureUrl, textureUrlIndex, mounted, textureLoaded]);

  // Cleanup on unmount - dispose Three.js resources
  useEffect(() => {
    return () => {
      debugLog("Cleanup - disposing resources");
      
      // Disconnect ResizeObserver
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      
      // Clear timeouts
      if (textureLoadTimeoutRef.current) {
        clearTimeout(textureLoadTimeoutRef.current);
      }
      if (hoverThrottleRef.current) {
        cancelAnimationFrame(hoverThrottleRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Dispose globe instance if available
      if (globeRef.current) {
        try {
          const scene = globeRef.current.scene();
          if (scene) {
            scene.traverse((obj: any) => {
              if (obj.geometry) obj.geometry.dispose();
              if (obj.material) {
                if (Array.isArray(obj.material)) {
                  obj.material.forEach((mat: any) => {
                    if (mat.map) mat.map.dispose();
                    mat.dispose();
                  });
                } else {
                  if (obj.material.map) obj.material.map.dispose();
                  obj.material.dispose();
                }
              }
            });
          }
          const renderer = globeRef.current.renderer();
          if (renderer) {
            renderer.dispose();
          }
        } catch (error) {
          debugLog("Error during cleanup", error);
        }
        globeRef.current = null;
      }
      
      initializedRef.current = false;
    };
  }, []);

  // Not mounted yet
  if (!mounted) {
    return (
      <div className="globe-loading-panel flex min-h-[600px] items-center justify-center">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Loading globe…</p>
      </div>
    );
  }

  // WebGL not supported
  if (webglSupported === false) {
    return (
      <div className="globe-error-panel flex min-h-[600px] flex-col items-center justify-center space-y-4 rounded-lg border border-border/60 bg-surface/40 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Interactive globe</p>
        <h3 className="text-2xl font-semibold">WebGL not available</h3>
        <p className="text-xs text-muted text-center max-w-md">
          Your browser or device doesn't support WebGL, which is required for the interactive globe.
        </p>
        <div className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">Visited countries:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {visited.map((country) => (
              <span 
                key={country} 
                className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                {countryNameMap[country] || country}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Countries data failed to load
  if (!countries.length) {
    return (
      <div className="globe-error-panel flex min-h-[600px] flex-col items-center justify-center space-y-4 rounded-lg border border-border/60 bg-surface/40 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Interactive globe</p>
        <h3 className="text-2xl font-semibold">Currently unavailable</h3>
        <p className="text-xs text-muted text-center max-w-md">
          Failed to load country data. Displaying a list of visited countries instead.
        </p>
        <div className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">Visited countries:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {visited.map((country) => (
              <span 
                key={country} 
                className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                {countryNameMap[country] || country}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Globe error occurred
  if (globeError) {
    return (
      <div className="globe-error-panel flex min-h-[600px] flex-col items-center justify-center space-y-4 rounded-lg border border-border/60 bg-surface/40 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Interactive globe</p>
        <h3 className="text-2xl font-semibold">Error loading globe</h3>
        <p className="text-xs text-muted text-center max-w-md">
          {globeError}
        </p>
        <div className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">Visited countries:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {visited.map((country) => (
              <span 
                key={country} 
                className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                {countryNameMap[country] || country}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Wait for container size before rendering globe
  const hasValidSize = containerSize.width > 0 && containerSize.height > 0;
  
  if (!hasValidSize) {
    return (
      <div className="globe-loading-panel flex min-h-[600px] items-center justify-center">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Loading globe…</p>
      </div>
    );
  }

  // Cap devicePixelRatio for performance (max 2, or 1.5 on slower devices)
  const devicePixelRatio = typeof window !== "undefined" 
    ? Math.min(window.devicePixelRatio || 1, 2) 
    : 1;

  return (
    <div 
      ref={containerRef}
      className="globe-wrapper relative w-full h-[80vh] min-h-[600px]" 
      style={{ 
        position: "relative",
        zIndex: 1,
        pointerEvents: "auto",
        isolation: "isolate" // Create new stacking context
      }}
    >
      {/* Loading overlay while texture loads */}
      {!textureLoaded && !textureLoadError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-accent mb-2">Loading globe…</p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs text-muted">Texture: {currentTextureUrl}</p>
            )}
          </div>
        </div>
      )}

      {/* Texture load error warning */}
      {textureLoadError && textureUrlIndex >= EARTH_TEXTURE_URLS.length - 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 rounded-lg border border-yellow-500/50 bg-yellow-500/10 px-4 py-2">
          <p className="text-xs text-yellow-400">Texture loading failed, using fallback</p>
        </div>
      )}

      {/* Debug overlay (dev only) */}
      {process.env.NODE_ENV === "development" && (
        <div 
          className="absolute top-2 right-2 z-20 rounded bg-black/80 px-2 py-1 text-xs text-white font-mono"
          style={{ pointerEvents: "none" }}
        >
          <div>Size: {containerSize.width}×{containerSize.height}</div>
          <div>Texture: {textureLoaded ? "✓" : "✗"}</div>
          <div>WebGL: {webglSupported ? "✓" : "✗"}</div>
          <div>Init: {initializedRef.current ? "✓" : "✗"}</div>
          <div>DPR: {devicePixelRatio.toFixed(1)}</div>
        </div>
      )}
      
      <Globe
        ref={globeRef}
        width={containerSize.width}
        height={containerSize.height}
        globeImageUrl={currentTextureUrl}
        backgroundColor="rgba(0, 0, 0, 0)" // Transparent background (matches page)
        globeGlowColor="rgba(200,220,255,0.3)" // Increased glow to make globe visible
        globeCloudsOpacity={0}
        // Reduced atmosphere for performance
        showAtmosphere={true}
        atmosphereColor="rgba(150,180,220,0.25)" // Slightly reduced opacity
        atmosphereAltitude={0.15} // Slightly reduced altitude
        // Country polygons
        polygonsData={countries}
        polygonCapColor={getPolygonCapColor}
        polygonSideColor="rgba(0,0,0,0.1)"
        polygonStrokeColor={getPolygonStrokeColor}
        polygonLabel={({ properties }) => {
          const name = properties?.name as string | undefined;
          return getDisplayName(name);
        }}
        polygonAltitude={getPolygonAltitude}
        polygonsTransitionDuration={reducedMotion ? 0 : 300}
        // Interaction handlers
        onPolygonHover={handlePolygonHover}
        onPolygonClick={(feature) => {
          if (feature?.properties?.name) {
            const name = feature.properties.name as string;
            const displayName = getDisplayName(name);
            const visited = isVisited(name);
            
            debugLog("Country clicked", displayName, visited);
            
            // Call parent handler
            onCountrySelect(displayName, visited);
          }
        }}
        // Camera/controls
        pointOfView={{ lat: 30, lng: 0, altitude: 2 }}
        enableZoom={true}
        enablePointerInteraction={true}
        // Smooth controls configuration
        onGlobeReady={(globe) => {
          // Prevent double initialization (React strict mode in dev)
          if (initializedRef.current) {
            debugLog("Globe already initialized, skipping");
            return;
          }

          try {
            debugLog("Globe init start");
            setIsInitializing(true);
            initializedRef.current = true;
            globeRef.current = globe;
            
            // Configure controls for smooth interaction
            const controls = globe.controls();
            if (controls) {
              // Disable auto-rotate (user controls via drag)
              controls.autoRotate = false;
              
              // Enable smooth damping for inertial movement
              controls.enableDamping = true;
              controls.dampingFactor = 0.05;
              
              // Zoom limits
              controls.minDistance = 200;
              controls.maxDistance = 1000;
            }

            // Cap devicePixelRatio on renderer for performance
            const renderer = globe.renderer();
            if (renderer) {
              renderer.setPixelRatio(devicePixelRatio);
            }

            // Check if texture loaded
            const scene = globe.scene();
            if (scene) {
              scene.traverse((obj: any) => {
                if (obj.material && obj.material.map) {
                  if (obj.material.map.image && obj.material.map.image.complete) {
                    setTextureLoaded(true);
                    debugLog("Globe init success - texture already loaded");
                  } else {
                    // Texture will load via useEffect handler
                    debugLog("Globe init success - texture loading");
                  }
                }
              });
            }

            setIsInitializing(false);
            debugLog("Globe init success");
          } catch (error) {
            setIsInitializing(false);
            initializedRef.current = false;
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            setGlobeError(errorMessage);
            debugLog("Globe init fail", error);
          }
        }}
      />
      {hovered && (
        <div className="globe-tooltip pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full border border-border/60 bg-surface/90 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted shadow-soft">
          {hovered}
        </div>
      )}
    </div>
  );
}
