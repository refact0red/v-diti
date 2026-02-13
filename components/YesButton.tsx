"use client";

import { motion } from "motion/react";

interface YesButtonProps {
  onClick: () => void;
  noCount: number;
}

export default function YesButton({ onClick, noCount }: YesButtonProps) {
  const scale = 1 + noCount * 0.15;
  const fontSize = Math.min(32, 16 + noCount * 1.5);
  const paddingX = Math.min(48, 24 + noCount * 2);
  const paddingY = Math.min(24, 12 + noCount * 1);

  return (
    <motion.button
      className="rounded-full bg-gradient-to-r from-valentine-rose to-valentine-pink text-white font-bold shadow-lg cursor-pointer select-none"
      style={{
        fontSize: `${fontSize}px`,
        padding: `${paddingY}px ${paddingX}px`,
        boxShadow: "0 4px 20px rgba(233, 30, 99, 0.3)",
      }}
      animate={{ scale }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: scale * 1.08,
        boxShadow: "0 0 30px rgba(233, 30, 99, 0.5)",
      }}
      whileTap={{ scale: scale * 0.95 }}
      onClick={onClick}
    >
      Yes! 💕
    </motion.button>
  );
}
