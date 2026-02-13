"use client";

const HEART_EMOJIS = ["💕", "💖", "💗", "💓", "💝", "❤️", "🩷", "💘"];

// Deterministic pseudo-random based on index (pure, no Math.random)
function seeded(i: number, offset: number): number {
  const x = Math.sin(i * 9301 + offset * 49297) * 49297;
  return x - Math.floor(x);
}

interface Heart {
  id: number;
  emoji: string;
  left: string;
  duration: string;
  delay: string;
  drift: string;
  rotation: string;
  fontSize: string;
}

const hearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
  left: `${seeded(i, 1) * 100}%`,
  duration: `${6 + seeded(i, 2) * 8}s`,
  delay: `${-seeded(i, 3) * 10}s`,
  drift: `${-30 + seeded(i, 4) * 60}px`,
  rotation: `${-30 + seeded(i, 5) * 60}deg`,
  fontSize: `${14 + seeded(i, 6) * 18}px`,
}));

export default function FloatingHearts() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={
            {
              left: heart.left,
              fontSize: heart.fontSize,
              "--duration": heart.duration,
              "--delay": heart.delay,
              "--drift": heart.drift,
              "--rotation": heart.rotation,
            } as React.CSSProperties
          }
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
