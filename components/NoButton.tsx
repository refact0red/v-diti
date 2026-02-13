"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { NO_BUTTON_MESSAGES } from "@/lib/constants";

interface NoButtonProps {
  onEscape: () => void;
  noCount: number;
}

export default function NoButton({ onEscape, noCount }: NoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [hasEscaped, setHasEscaped] = useState(false);

  const message =
    NO_BUTTON_MESSAGES[Math.min(noCount, NO_BUTTON_MESSAGES.length - 1)];

  const escapeToRandomPosition = useCallback(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const padding = 20;

    const maxX = window.innerWidth - buttonRect.width - padding;
    const maxY = window.innerHeight - buttonRect.height - padding;

    let newX: number, newY: number;
    let attempts = 0;
    do {
      newX = padding + Math.random() * (maxX - padding);
      newY = padding + Math.random() * (maxY - padding);
      attempts++;
    } while (
      attempts < 10 &&
      position &&
      Math.hypot(newX - position.x, newY - position.y) < 150
    );

    setPosition({ x: newX, y: newY });
    setHasEscaped(true);
    onEscape();
  }, [position, onEscape]);

  const handleMouseEnter = useCallback(() => {
    escapeToRandomPosition();
  }, [escapeToRandomPosition]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      escapeToRandomPosition();
    },
    [escapeToRandomPosition]
  );

  // Clamp position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!position || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const clampedX = Math.min(
        position.x,
        window.innerWidth - rect.width - 20
      );
      const clampedY = Math.min(
        position.y,
        window.innerHeight - rect.height - 20
      );
      if (clampedX !== position.x || clampedY !== position.y) {
        setPosition({
          x: Math.max(20, clampedX),
          y: Math.max(20, clampedY),
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position]);

  const scale = Math.max(0.5, 1 - noCount * 0.05);
  const opacity = Math.max(0.4, 1 - noCount * 0.05);

  return (
    <motion.button
      ref={buttonRef}
      className="rounded-full bg-gray-300 text-gray-700 font-semibold shadow-md select-none touch-none cursor-pointer"
      style={{
        ...(hasEscaped && position
          ? {
              position: "fixed",
              left: position.x,
              top: position.y,
              zIndex: 50,
            }
          : {}),
        padding: `${Math.max(8, 12 - noCount)}px ${Math.max(16, 24 - noCount)}px`,
        fontSize: `${Math.max(12, 16 - noCount * 0.5)}px`,
      }}
      animate={{
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      whileTap={{ scale: scale * 0.9 }}
    >
      {message}
    </motion.button>
  );
}
