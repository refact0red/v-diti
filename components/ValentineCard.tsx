"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ValentineState, ImageState } from "@/lib/constants";
import CuteCharacter from "./CuteCharacter";
import YesButton from "./YesButton";
import NoButton from "./NoButton";
import Celebration from "./Celebration";

export default function ValentineCard() {
  const [state, setState] = useState<ValentineState>("asking");
  const [noCount, setNoCount] = useState(0);
  const yesCooldown = useRef(false);

  const handleNoHover = useCallback(() => {
    setNoCount((prev) => prev + 1);
    // Prevent the same touch from triggering Yes after No escapes
    yesCooldown.current = true;
    setTimeout(() => {
      yesCooldown.current = false;
    }, 500);
  }, []);

  const handleYes = useCallback(() => {
    if (yesCooldown.current) return;
    setState("celebrating");
  }, []);

  const imageState: ImageState =
    state === "celebrating"
      ? "happy"
      : noCount === 0
        ? "asking"
        : noCount < 4
          ? "pleading"
          : "sad";

  return (
    <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 px-4 w-full max-w-md">
      <AnimatePresence mode="wait">
        {state === "celebrating" ? (
          <Celebration key="celebration" />
        ) : (
          <motion.div
            key="card"
            className="flex flex-col items-center gap-4 sm:gap-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <CuteCharacter state={imageState} />

            <h1 className="font-dancing text-3xl sm:text-4xl md:text-5xl font-bold text-valentine-deep text-center leading-tight heartbeat">
              Aditi, will you be my Valentine?
            </h1>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <YesButton onClick={handleYes} noCount={noCount} />
              <NoButton onEscape={handleNoHover} noCount={noCount} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
