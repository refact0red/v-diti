"use client";

import FloatingHearts from "@/components/FloatingHearts";
import ValentineCard from "@/components/ValentineCard";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-gradient-to-br from-valentine-cream via-valentine-blush to-valentine-pink overflow-hidden">
      <FloatingHearts />
      <ValentineCard />
    </main>
  );
}
