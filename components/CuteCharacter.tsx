"use client";

import { EMOJI_STATES, type ImageState } from "@/lib/constants";

interface CuteCharacterProps {
  state: ImageState;
}

const ANIMATION_CLASSES: Record<ImageState, string> = {
  asking: "gentle-bounce",
  pleading: "wiggle",
  sad: "cry-shake",
  happy: "happy-dance",
};

export default function CuteCharacter({ state }: CuteCharacterProps) {
  const { emoji, secondary } = EMOJI_STATES[state];
  const animClass = ANIMATION_CLASSES[state];

  return (
    <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
      {/* Main emoji */}
      <span
        className={`text-7xl sm:text-8xl ${animClass} select-none`}
        role="img"
        aria-label={EMOJI_STATES[state].label}
      >
        {emoji}
      </span>

      {/* Orbiting secondary emoji */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl orbit select-none"
      >
        {secondary}
      </span>
    </div>
  );
}
