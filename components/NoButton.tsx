"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { NO_BUTTON_MESSAGES } from "@/lib/constants";

interface NoButtonProps {
  onEscape: () => void;
  noCount: number;
}

// Check if a position overlaps with the center card area (where Yes button is)
function overlapsCenter(
  px: number,
  py: number,
  bw: number,
  bh: number
): boolean {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  // Exclusion zone: 200px wide, 300px tall centered on viewport
  const zoneW = 220;
  const zoneH = 320;
  return (
    px + bw > cx - zoneW / 2 &&
    px < cx + zoneW / 2 &&
    py + bh > cy - zoneH / 2 &&
    py < cy + zoneH / 2
  );
}

export default function NoButton({ onEscape, noCount }: NoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hasEscaped, setHasEscaped] = useState(false);
  const isAnimating = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const message =
    NO_BUTTON_MESSAGES[Math.min(noCount, NO_BUTTON_MESSAGES.length - 1)];

  const escapeToRandomPosition = useCallback(() => {
    if (!buttonRef.current || isAnimating.current) return;
    isAnimating.current = true;

    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const padding = 20;
    const bw = buttonRect.width;
    const bh = buttonRect.height;

    const maxX = window.innerWidth - bw - padding;
    const maxY = window.innerHeight - bh - padding;

    const fromX = hasEscaped ? x.get() : buttonRect.left;
    const fromY = hasEscaped ? y.get() : buttonRect.top;

    // Find a position that's far enough away AND doesn't overlap the center card
    let newX: number, newY: number;
    let attempts = 0;
    do {
      newX = padding + Math.random() * (maxX - padding);
      newY = padding + Math.random() * (maxY - padding);
      attempts++;
    } while (
      attempts < 20 &&
      (Math.hypot(newX - fromX, newY - fromY) < 120 ||
        overlapsCenter(newX, newY, bw, bh))
    );

    if (!hasEscaped) {
      x.set(buttonRect.left);
      y.set(buttonRect.top);
      setHasEscaped(true);
      requestAnimationFrame(() => {
        x.set(newX);
        y.set(newY);
      });
    } else {
      x.set(newX);
      y.set(newY);
    }

    onEscape();
    setTimeout(() => {
      isAnimating.current = false;
    }, 300);
  }, [hasEscaped, onEscape, x, y]);

  const handleMouseEnter = useCallback(() => {
    escapeToRandomPosition();
  }, [escapeToRandomPosition]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      escapeToRandomPosition();
    },
    [escapeToRandomPosition]
  );

  useEffect(() => {
    if (!hasEscaped) return;
    const handleResize = () => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width - 20;
      const maxY = window.innerHeight - rect.height - 20;
      x.set(Math.max(20, Math.min(x.get(), maxX)));
      y.set(Math.max(20, Math.min(y.get(), maxY)));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasEscaped, x, y]);

  const scale = Math.max(0.5, 1 - noCount * 0.05);
  const opacity = Math.max(0.4, 1 - noCount * 0.05);

  if (!hasEscaped) {
    return (
      <motion.button
        ref={buttonRef}
        className="rounded-full bg-gray-300 text-gray-700 font-semibold shadow-md select-none cursor-pointer"
        style={{
          padding: `${Math.max(8, 12 - noCount)}px ${Math.max(16, 24 - noCount)}px`,
          fontSize: `${Math.max(12, 16 - noCount * 0.5)}px`,
        }}
        animate={{ scale, opacity }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={handleMouseEnter}
        onTouchEnd={handleTouchEnd}
        whileTap={{ scale: scale * 0.9 }}
      >
        {message}
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      className="rounded-full bg-gray-300 text-gray-700 font-semibold shadow-md select-none cursor-pointer"
      style={{
        position: "fixed",
        left: springX,
        top: springY,
        zIndex: 50,
        padding: `${Math.max(8, 12 - noCount)}px ${Math.max(16, 24 - noCount)}px`,
        fontSize: `${Math.max(12, 16 - noCount * 0.5)}px`,
        touchAction: "none",
      }}
      animate={{ scale, opacity }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={handleMouseEnter}
      onTouchEnd={handleTouchEnd}
      whileTap={{ scale: scale * 0.9 }}
    >
      {message}
    </motion.button>
  );
}
