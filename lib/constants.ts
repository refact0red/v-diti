export const NO_BUTTON_MESSAGES = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Pookie please 🥺",
  "I'm gonna cry...",
  "You're breaking my heart 💔",
  "I'll be so sad...",
  "Pretty please? 🥹",
  "Last chance?",
  "Okay fine... jk try again!",
] as const;

export const EMOJI_STATES = {
  asking: { emoji: "🐻", secondary: "💝", label: "Bear with heart" },
  pleading: { emoji: "🥺", secondary: "🙏", label: "Pleading face" },
  sad: { emoji: "😭", secondary: "💔", label: "Crying face" },
  happy: { emoji: "🥳", secondary: "💕", label: "Celebrating" },
} as const;

export type ImageState = keyof typeof EMOJI_STATES;
export type ValentineState = "asking" | "celebrating";
