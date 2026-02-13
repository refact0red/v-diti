"use client";

import { useEffect, useCallback } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

const COLORS = ["#ff69b4", "#e91e63", "#ff1744", "#f48fb1", "#880e4f", "#ff6b9e"];

export default function Celebration() {
  const fireConfetti = useCallback(() => {
    const heartShape = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
    });
    const heartEmoji = confetti.shapeFromText({ text: "❤️", scalar: 2 });
    const pinkHeart = confetti.shapeFromText({ text: "💗", scalar: 2 });

    // Initial center burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: COLORS,
      shapes: [heartShape, heartEmoji, pinkHeart],
      scalar: 1.5,
      gravity: 0.6,
      startVelocity: 45,
      ticks: 300,
    });

    // Continuous side cannons
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: COLORS,
        shapes: [heartShape, heartEmoji, pinkHeart, "circle"],
        scalar: 1.2,
        gravity: 0.8,
        ticks: 200,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: COLORS,
        shapes: [heartShape, heartEmoji, pinkHeart, "circle"],
        scalar: 1.2,
        gravity: 0.8,
        ticks: 200,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    fireConfetti();
  }, [fireConfetti]);

  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-center px-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.1,
      }}
    >
      <motion.div
        className="text-8xl sm:text-9xl select-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        🥳
      </motion.div>

      <motion.h1
        className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-valentine-deep"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Yayyy!! 🎉💕
      </motion.h1>

      <motion.p
        className="text-2xl sm:text-3xl font-bold text-valentine-rose max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Go Pea! Go Pea! Go Pea! 🫛💖
      </motion.p>

      <motion.p
        className="text-lg sm:text-xl text-valentine-deep/80 font-medium max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        I knew you&apos;d say yes! 💝
      </motion.p>
    </motion.div>
  );
}
