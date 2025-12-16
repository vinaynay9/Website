"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type CursorType = "default" | "link" | "reveal" | "modal";

type CursorProps = {
  type: CursorType;
  hidden: boolean;
};

const getPrefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const hasPointerHover = () => {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(hover: none)").matches;
};

export default function Cursor({ type, hidden }: CursorProps) {
  const [enabled, setEnabled] = useState(true);
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [ringPosition, setRingPosition] = useState(position);
  const targetRef = useRef(position);
  const requestRef = useRef<number>();
  const prefersReduced = useRef(getPrefersReducedMotion());

  useEffect(() => {
    if (!hasPointerHover() || prefersReduced.current) {
      setEnabled(false);
      return;
    }

    const move = (event: MouseEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      setPosition(targetRef.current);
    };

    const loop = () => {
      setRingPosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.15,
        y: prev.y + (targetRef.current.y - prev.y) * 0.15
      }));
      requestRef.current = requestAnimationFrame(loop);
    };

    document.addEventListener("pointermove", move);
    requestRef.current = requestAnimationFrame(loop);

    const handleLeave = () => setPosition({ x: -200, y: -200 });

    document.addEventListener("pointerleave", handleLeave);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", handleLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (!enabled) return null;

  const ringScale = type === "link" ? 1.5 : type === "modal" ? 1.35 : type === "reveal" ? 1.25 : 1;
  const ringOpacity = type === "modal" ? 0.45 : 1;
  const dotScale = type === "modal" ? 1.3 : 1;

  return (
    <>
      <div
        className={`custom-cursor ${hidden ? "cursor-hidden" : ""}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${dotScale})`
        }}
      />
      <div
        className="cursor-ring"
        style={{
          transform: `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) scale(${ringScale})`,
          opacity: ringOpacity
        }}
      />
    </>
  );
}

