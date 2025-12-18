"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";

type FloatingMomentProps = {
  src: string;
  alt: string;
  x?: string;
  y?: string;
  parallaxSpeed: number;
  scrollProgress: any;
  momentText: string;
  delay?: number;
  isMobile?: boolean;
  floatOffset?: number; // Unique offset for staggered floating animation
  rotationRange?: number; // Subtle rotation variance per image
};

// Memoized animation variants
const initialVariant = { opacity: 0, scale: 0.85, y: 20 } as const;
const animateVariant = { opacity: 1, scale: 1, y: 0 } as const;

/**
 * FloatingMoment Component
 * 
 * Features:
 * - Idle animation: Gentle floating (y-axis) and subtle rotation
 * - Hover interaction: 3D flip effect reveals text on the back
 * - Performance optimized: Uses Framer Motion's useAnimationFrame for smooth idle animations
 * - No continuous re-renders: Animation values derived from time, not state
 */
function FloatingMoment({
  src,
  alt,
  x,
  y,
  parallaxSpeed,
  scrollProgress,
  momentText,
  delay = 0,
  isMobile = false,
  floatOffset = 0,
  rotationRange = 3
}: FloatingMomentProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Motion values for smooth idle animation (no re-renders)
  const floatY = useMotionValue(0);
  const floatRotation = useMotionValue(0);
  
  // Parallax based on scroll
  const yOffset = useTransform(scrollProgress, [0, 1], [0, parallaxSpeed]);

  // Idle animation: Gentle floating + rotation
  // Uses useAnimationFrame for smooth, continuous motion without re-renders
  // Motion values update the DOM directly without triggering React re-renders
  useAnimationFrame((time) => {
    // Convert time to seconds and add unique offset for staggered animation
    const t = (time / 1000) + floatOffset;
    
    // Gentle sine wave for floating (±8px over 4 seconds)
    floatY.set(Math.sin(t * 0.5) * 8);
    
    // Subtle rotation (±3 degrees over 6 seconds)
    floatRotation.set(Math.sin(t * 0.3) * rotationRange);
  });

  const containerStyle = useMemo(
    () =>
      isMobile
        ? {
            y: yOffset
          }
        : {
            left: x,
            top: y,
            y: yOffset
          },
    [isMobile, x, y, yOffset]
  );

  const transitionConfig = useMemo(
    () => ({ duration: 1, delay, ease: [0.19, 1, 0.22, 1] as const }),
    [delay]
  );

  const handleMouseEnter = useCallback(() => setIsFlipped(true), []);
  const handleMouseLeave = useCallback(() => setIsFlipped(false), []);
  const handleTouchStart = useCallback(() => setIsFlipped(prev => !prev), []);

  return (
    <motion.div
      className={isMobile ? "relative cursor-pointer" : "absolute cursor-pointer"}
      style={containerStyle}
      initial={initialVariant}
      animate={animateVariant}
      transition={transitionConfig}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* 3D flip container with idle animation */}
      <motion.div
        className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 mx-auto"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          // Apply idle animation via style (motion values) for performance
          y: isFlipped ? 0 : floatY,
          rotateZ: isFlipped ? 0 : floatRotation
        }}
        animate={{
          // Lift and scale slightly on hover
          scale: isFlipped ? 1.05 : 1
        }}
        transition={{
          scale: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
        }}
      >
        {/* Card inner - flips on hover */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d"
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0
          }}
          transition={{
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          {/* Front face - Image */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, (max-width: 1024px) 208px, 256px"
            />
          </div>

          {/* Back face - Text content */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/98 backdrop-blur-md shadow-2xl border-2 border-[#2d5a3d]/30 p-4"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-mono text-[#2d5a3d] leading-relaxed text-center">
              {momentText}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

type FloatingMomentsProps = {
  containerRef?: React.RefObject<HTMLDivElement>;
};

export function FloatingMoments({ containerRef }: FloatingMomentsProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const moments = [
    {
      src: "/placeholders/people/moment_01.svg",
      alt: "Moment 01",
      momentText: "HOME_MOMENT_01: A quiet morning in Tampa, the humidity already settling in. Coffee and code before the world wakes."
    },
    {
      src: "/placeholders/people/moment_02.svg",
      alt: "Moment 02",
      momentText: "HOME_MOMENT_02: Georgia Tech library, late night. The hum of servers and the weight of systems thinking."
    },
    {
      src: "/placeholders/people/moment_03.svg",
      alt: "Moment 03",
      momentText: "HOME_MOMENT_03: Soccer field at dusk. The discipline of practice, the clarity of a well-executed play."
    },
    {
      src: "/placeholders/people/moment_04.svg",
      alt: "Moment 04",
      momentText: "HOME_MOMENT_04: First startup office. Whiteboards covered in product gists, the energy of building something new."
    },
    {
      src: "/placeholders/people/moment_05.svg",
      alt: "Moment 05",
      momentText: "HOME_MOMENT_05: A hike in the mountains. The perspective shift that comes from stepping away from screens."
    },
    {
      src: "/placeholders/people/moment_06.svg",
      alt: "Moment 06",
      momentText: "HOME_MOMENT_06: Deep dive into documentation. The satisfaction of clarity, of making complex systems understandable."
    },
    {
      src: "/placeholders/people/moment_07.svg",
      alt: "Moment 07",
      momentText: "HOME_MOMENT_07: Building in public. The vulnerability and reward of sharing the process, not just the outcome."
    }
  ];

  /**
   * Desktop Layout: Cinematic layering with breathing room
   * 
   * Positioning strategy:
   * - Expanded vertical space (130vh) prevents cramped feeling
   * - Images spread across depth layers (foreground, mid, background)
   * - Strategic positioning reduces overlap while maintaining depth
   * - Left/right balance creates visual rhythm
   * - Vertical spacing ensures no images hide completely behind others
   */
  const desktopPositions = [
    { x: "8%", y: "5%" },    // Top-left, foreground
    { x: "68%", y: "8%" },   // Top-right, slightly back
    { x: "38%", y: "18%" },  // Center-top, mid-layer
    { x: "15%", y: "38%" },  // Mid-left, breathing room from top
    { x: "62%", y: "42%" },  // Mid-right, staggered from left
    { x: "32%", y: "58%" },  // Lower-center, clear of mid images
    { x: "72%", y: "68%" }   // Bottom-right, final anchor
  ];
  
  /**
   * Mobile Layout: Clean grid with ample spacing
   * - Grid ensures consistent spacing
   * - No absolute positioning needed
   */
  const mobilePositions = [
    { x: "5%", y: "3%" },
    { x: "50%", y: "12%" },
    { x: "8%", y: "35%" },
    { x: "52%", y: "44%" },
    { x: "5%", y: "63%" },
    { x: "50%", y: "72%" },
    { x: "8%", y: "88%" }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
    >
      {/* Desktop: absolute positioned collage with expanded height for breathing room */}
      <div className="hidden md:block relative w-full max-w-7xl mx-auto h-[130vh] px-4">
        {moments.map((moment, idx) => {
          const desktopPos = desktopPositions[idx % desktopPositions.length];
          // Alternate parallax directions for visual depth
          const parallaxSpeed = idx % 2 === 0 ? 50 : -50;
          // Staggered float timing for organic feel
          const floatOffset = idx * 1.3;
          // Varied rotation ranges for character
          const rotationRange = 2 + (idx % 3);
          
          return (
            <FloatingMoment
              key={idx}
              src={moment.src}
              alt={moment.alt}
              x={desktopPos.x}
              y={desktopPos.y}
              parallaxSpeed={parallaxSpeed}
              scrollProgress={sectionProgress}
              momentText={moment.momentText}
              delay={idx * 0.1}
              floatOffset={floatOffset}
              rotationRange={rotationRange}
            />
          );
        })}
      </div>
      
      {/* Mobile: neat stacked grid with proper spacing */}
      <div className="block md:hidden relative w-full max-w-2xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10">
          {moments.map((moment, idx) => {
            const parallaxSpeed = idx % 2 === 0 ? 25 : -25;
            const floatOffset = idx * 1.3;
            const rotationRange = 2 + (idx % 3);
            
            return (
              <FloatingMoment
                key={idx}
                src={moment.src}
                alt={moment.alt}
                parallaxSpeed={parallaxSpeed}
                scrollProgress={sectionProgress}
                momentText={moment.momentText}
                delay={idx * 0.08}
                isMobile={true}
                floatOffset={floatOffset}
                rotationRange={rotationRange}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

