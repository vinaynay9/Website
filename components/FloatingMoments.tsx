"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

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
};

function FloatingMoment({
  src,
  alt,
  x,
  y,
  parallaxSpeed,
  scrollProgress,
  momentText,
  delay = 0,
  isMobile = false
}: FloatingMomentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const yOffset = useTransform(scrollProgress, [0, 1], [0, parallaxSpeed]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.05, 1]);

  const containerStyle = isMobile
    ? {
        y: yOffset,
        scale
      }
    : {
        left: x,
        top: y,
        y: yOffset,
        scale
      };

  return (
    <motion.div
      className={isMobile ? "relative cursor-pointer" : "absolute cursor-pointer"}
      style={containerStyle}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
    >
      <div className="relative group">
        {/* Text behind the image with improved backdrop */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="px-4 py-3 sm:px-6 sm:py-4 max-w-[200px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[340px] text-center bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border border-white/20">
            <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-mono text-[#2d5a3d] leading-relaxed">
              {momentText}
            </p>
          </div>
        </motion.div>
        
        {/* Image that fades on hover - 30% larger */}
        <motion.div
          className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 z-10 mx-auto"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <div 
            className="relative w-full h-full rounded-lg overflow-hidden border-2 transition-colors duration-300"
            style={{ 
              borderColor: isHovered ? '#2d5a3d' : 'transparent',
              boxShadow: isHovered ? '0 0 0 2px #2d5a3d' : 'none'
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
        </motion.div>
      </div>
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

  // Responsive positions - using CSS classes for mobile/desktop differences
  // Desktop: spaced collage style with reduced overlaps
  const desktopPositions = [
    { x: "5%", y: "8%" },
    { x: "65%", y: "12%" },
    { x: "12%", y: "45%" },
    { x: "70%", y: "40%" },
    { x: "40%", y: "20%" },
    { x: "20%", y: "70%" },
    { x: "75%", y: "65%" }
  ];
  
  // Mobile: neat stacked grid with proper spacing
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
      {/* Desktop: absolute positioned collage */}
      <div className="hidden md:block relative w-full max-w-7xl mx-auto h-[85vh] px-4">
        {moments.map((moment, idx) => {
          const desktopPos = desktopPositions[idx % desktopPositions.length];
          // Alternate parallax directions for visual interest
          const parallaxSpeed = idx % 2 === 0 ? 40 : -40;
          
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
            />
          );
        })}
      </div>
      
      {/* Mobile: neat stacked grid */}
      <div className="block md:hidden relative w-full max-w-2xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10">
          {moments.map((moment, idx) => {
            const parallaxSpeed = idx % 2 === 0 ? 20 : -20;
            
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
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

