"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";

interface Particle {
  id: number;
  glyph: string;
  drift: number;
  rise: number;
  delay: number;
}

/**
 * Floating particle reactions, the web port of Harpenin's FloatingEmoji
 * (per .agents/skills/premium-ui-effects): call `burst()` on a user
 * action; each particle animates with CSS keyframes (`.particle`) and
 * prunes itself on animation end. Particles never touch React state
 * per frame — state only grows/shrinks on discrete events.
 */
export function useFloatingSparkles(glyphs: readonly string[] = ["✨"]) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const burst = useCallback(() => {
    setParticles((prev) => [
      ...prev,
      ...glyphs.map((glyph, index) => ({
        id: nextId.current++,
        glyph,
        drift: (Math.random() - 0.5) * 120,
        rise: -300 - Math.random() * 150,
        delay: index * 60,
      })),
    ]);
  }, [glyphs]);

  const prune = useCallback((id: number) => {
    setParticles((prev) => prev.filter((particle) => particle.id !== id));
  }, []);

  const layer = (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle absolute bottom-0 left-1/2 text-[32px]"
          style={
            {
              "--drift": `${particle.drift}px`,
              "--rise": `${particle.rise}px`,
              animationDelay: `${particle.delay}ms`,
            } as CSSProperties
          }
          onAnimationEnd={(event) => {
            if (event.animationName === "particle-rise") prune(particle.id);
          }}
        >
          {particle.glyph}
        </span>
      ))}
    </span>
  );

  return { burst, layer };
}
