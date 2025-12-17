"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useMotionValueEvent, MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * ElectricField Component
 * 
 * Creates an animated "electric wire / energy field" background effect with:
 * - Thin SVG lines scattered randomly across the page
 * - Forest green color (#2E7D32) with subtle glow
 * - Small glowing pulses that move along the lines
 * - Scroll-locked behavior: pulses lock to scroll position when scrolling,
 *   then resume drifting when scrolling stops
 * 
 * Configuration (tweak these values):
 * - LINE_DENSITY: Number of lines to generate (default: 25)
 * - PULSE_COUNT: Number of pulses per line (default: 1-2)
 * - PULSE_SPEED: Base speed of pulse movement (default: 0.3)
 * - LINE_OPACITY: Base opacity of lines (default: 0.15)
 * - PULSE_OPACITY: Maximum opacity of pulses (default: 0.6)
 * - GLOW_RADIUS: Blur radius for glow effect (default: 4)
 */

// Configuration constants
const LINE_DENSITY = 25;
const MIN_PULSES_PER_LINE = 1;
const MAX_PULSES_PER_LINE = 2;
const PULSE_SPEED = 0.3; // pixels per frame
const LINE_OPACITY_DARK = 0.15;
const LINE_OPACITY_LIGHT = 0.08; // Lower opacity on light backgrounds
const PULSE_OPACITY_DARK = 0.6;
const PULSE_OPACITY_LIGHT = 0.4; // Lower opacity on light backgrounds
const GLOW_RADIUS = 4;
const FOREST_GREEN = "#2E7D32";
const SCROLL_LOCK_THRESHOLD = 0.5; // pixels of scroll change to trigger lock
const SCROLL_STOP_DELAY = 150; // ms to wait before resuming drift

type Line = {
  id: number;
  path: string;
  length: number;
  pulses: Pulse[];
};

type Pulse = {
  id: number;
  progress: number; // 0 to 1 along the path
  speed: number; // pixels per frame
  direction: 1 | -1; // 1 = forward, -1 = backward
};

// Seeded random number generator for consistent line generation
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  int(min: number, max: number): number {
    return Math.floor(this.range(min, max));
  }
}

// Generate a random path using seeded random
function generatePath(
  seed: number,
  width: number,
  height: number
): { path: string; length: number } {
  const rng = new SeededRandom(seed);
  
  // Start point
  const startX = rng.range(0, width);
  const startY = rng.range(0, height);
  
  // Create a path with 2-4 segments
  const segments = rng.int(2, 5);
  const points: [number, number][] = [[startX, startY]];
  
  for (let i = 1; i < segments; i++) {
    const prevX = points[i - 1][0];
    const prevY = points[i - 1][1];
    
    // Next point should be reasonably spaced
    const angle = rng.range(0, Math.PI * 2);
    const distance = rng.range(width * 0.2, width * 0.4);
    const nextX = Math.max(0, Math.min(width, prevX + Math.cos(angle) * distance));
    const nextY = Math.max(0, Math.min(height, prevY + Math.sin(angle) * distance));
    
    points.push([nextX, nextY]);
  }
  
  // Build SVG path string
  let pathString = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    // Use quadratic curves for smoother, more organic paths
    const [x, y] = points[i];
    const [prevX, prevY] = points[i - 1];
    const cpX = (prevX + x) / 2 + rng.range(-30, 30);
    const cpY = (prevY + y) / 2 + rng.range(-30, 30);
    pathString += ` Q ${cpX} ${cpY} ${x} ${y}`;
  }
  
  // Approximate path length (sum of segment distances)
  let length = 0;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    length += Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  
  return { path: pathString, length };
}

// Generate all lines with seeded random
function generateLines(
  width: number,
  height: number,
  density: number
): Line[] {
  const lines: Line[] = [];
  const baseSeed = 12345; // Fixed seed for consistency
  
  for (let i = 0; i < density; i++) {
    const seed = baseSeed + i;
    const rng = new SeededRandom(seed);
    const { path, length } = generatePath(seed, width, height);
    
    // Generate pulses for this line
    const pulseCount = rng.int(MIN_PULSES_PER_LINE, MAX_PULSES_PER_LINE + 1);
    const pulses: Pulse[] = [];
    
    for (let j = 0; j < pulseCount; j++) {
      pulses.push({
        id: j,
        progress: rng.range(0, 1), // Random starting position
        speed: rng.range(PULSE_SPEED * 0.5, PULSE_SPEED * 1.5), // Vary speed
        direction: rng.next() > 0.5 ? 1 : -1, // Random direction
      });
    }
    
    lines.push({
      id: i,
      path,
      length,
      pulses,
    });
  }
  
  return lines;
}

type ElectricFieldProps = {
  scrollYProgress: MotionValue<number>;
  isLightTheme: boolean;
};

type PulsePosition = {
  lineId: number;
  pulseId: number;
  x: number;
  y: number;
};

export function ElectricField({ scrollYProgress, isLightTheme }: ElectricFieldProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefsRef = useRef<Map<number, SVGPathElement>>(new Map());
  const animationFrameRef = useRef<number>();
  const scrollStopTimeoutRef = useRef<NodeJS.Timeout>();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Track scroll position for lock behavior
  const lastScrollYRef = useRef<number>(0);
  const scrollLockOffsetRef = useRef<number>(0);
  
  // Generate lines once when dimensions are available
  const lines = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    return generateLines(dimensions.width, dimensions.height, LINE_DENSITY);
  }, [dimensions.width, dimensions.height]);
  
  // Clone lines state for animation
  const [animatedLines, setAnimatedLines] = useState<Line[]>(lines);
  const [pulsePositions, setPulsePositions] = useState<PulsePosition[]>([]);
  
  // Update animated lines when lines change
  useEffect(() => {
    setAnimatedLines(lines);
  }, [lines]);
  
  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Desktop breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Track scroll state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window === "undefined") return;
    
    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
    
    // Clear existing timeout
    if (scrollStopTimeoutRef.current) {
      clearTimeout(scrollStopTimeoutRef.current);
    }
    
    // If scroll delta is significant, lock pulses
    if (scrollDelta > SCROLL_LOCK_THRESHOLD) {
      setIsScrolling(true);
      // Calculate scroll offset (normalized to 0-1)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollLockOffsetRef.current = maxScroll > 0 ? currentScrollY / maxScroll : 0;
    } else {
      // Set timeout to resume drifting after scroll stops
      scrollStopTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_STOP_DELAY);
    }
    
    lastScrollYRef.current = currentScrollY;
  });
  
  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.max(rect.height, document.documentElement.scrollHeight),
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", updateDimensions, { passive: true });
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", updateDimensions);
    };
  }, []);
  
  // Calculate initial pulse positions when lines change
  useEffect(() => {
    if (animatedLines.length === 0) return;
    
    // Use a temporary SVG element to calculate initial positions
    const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const initialPositions: PulsePosition[] = [];
    
    animatedLines.forEach((line) => {
      const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tempPath.setAttribute("d", line.path);
      tempSvg.appendChild(tempPath);
      
      try {
        const pathLength = tempPath.getTotalLength();
        line.pulses.forEach((pulse) => {
          const point = tempPath.getPointAtLength(pulse.progress * pathLength);
          initialPositions.push({
            lineId: line.id,
            pulseId: pulse.id,
            x: point.x,
            y: point.y,
          });
        });
      } catch (e) {
        // Ignore errors on initial calculation
      }
    });
    
    setPulsePositions(initialPositions);
  }, [animatedLines]);
  
  // Animation loop
  useEffect(() => {
    if (prefersReducedMotion || isMobile || animatedLines.length === 0) {
      return;
    }
    
    const animate = () => {
      setAnimatedLines((prevLines) => {
        const newPulsePositions: PulsePosition[] = [];
        
        const updatedLines = prevLines.map((line) => {
          const pathElement = pathRefsRef.current.get(line.id);
          if (!pathElement) {
            return line;
          }
          
          const pathLength = pathElement.getTotalLength();
          
          const updatedPulses = line.pulses.map((pulse) => {
            let newProgress = pulse.progress;
            
            if (isScrolling) {
              // Lock to scroll position
              // Map scroll progress to line progress with some offset
              const scrollProgress = scrollLockOffsetRef.current;
              // Add some variation so pulses don't all move identically
              const offset = (pulse.id % 3) * 0.1 - 0.1; // -0.1, 0, 0.1
              newProgress = (scrollProgress + offset) % 1;
            } else {
              // Normal drift animation
              const progressDelta = (pulse.speed / line.length) * pulse.direction;
              newProgress = pulse.progress + progressDelta;
              
              // Wrap around
              if (newProgress < 0) {
                newProgress = 1 + newProgress;
              } else if (newProgress > 1) {
                newProgress = newProgress - 1;
              }
            }
            
            // Calculate pulse position
            try {
              const point = pathElement.getPointAtLength(newProgress * pathLength);
              newPulsePositions.push({
                lineId: line.id,
                pulseId: pulse.id,
                x: point.x,
                y: point.y,
              });
            } catch (e) {
              // Skip this pulse if calculation fails
            }
            
            return {
              ...pulse,
              progress: newProgress,
            };
          });
          
          return {
            ...line,
            pulses: updatedPulses,
          };
        });
        
        setPulsePositions(newPulsePositions);
        return updatedLines;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, isMobile, animatedLines.length, isScrolling]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }
    };
  }, []);
  
  // Don't render on mobile or if reduced motion is preferred
  if (prefersReducedMotion || isMobile || animatedLines.length === 0) {
    return null;
  }
  
  const lineOpacity = isLightTheme ? LINE_OPACITY_LIGHT : LINE_OPACITY_DARK;
  const pulseOpacity = isLightTheme ? PULSE_OPACITY_LIGHT : PULSE_OPACITY_DARK;
  
  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <defs>
          {/* Glow filter for lines */}
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation={GLOW_RADIUS} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Glow filter for pulses */}
          <filter id="pulseGlow">
            <feGaussianBlur stdDeviation={GLOW_RADIUS * 1.5} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Render lines */}
        {animatedLines.map((line) => (
          <g key={line.id}>
            <path
              ref={(el) => {
                if (el) {
                  pathRefsRef.current.set(line.id, el);
                } else {
                  pathRefsRef.current.delete(line.id);
                }
              }}
              d={line.path}
              fill="none"
              stroke={FOREST_GREEN}
              strokeWidth="1"
              opacity={lineOpacity}
              filter="url(#lineGlow)"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
        
        {/* Render pulses */}
        {pulsePositions.map((pos) => (
          <circle
            key={`${pos.lineId}-${pos.pulseId}`}
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill={FOREST_GREEN}
            opacity={pulseOpacity}
            filter="url(#pulseGlow)"
          />
        ))}
      </svg>
    </div>
  );
}

