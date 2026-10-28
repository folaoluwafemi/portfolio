"use client";

import { useEffect, useState } from "react";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@tools/hooks/useMediaQuery";

const WORDS = ["FLUTTER", "TABLET", "WEB", "MOBILE"];
const TYPE_SPEED = 250;
const DELETE_SPEED = 125;
const HOLD_MS = 1200;

/**
 * Typewriter between "-" and "ENGINEER" in the hero, faithful to the
 * (commented-out) AnimatedTextKit in the Flutter body_part.dart:
 * FLUTTER, TABLET, WEB, MOBILE at 250ms per character, no cursor.
 * Rendered inline with natural width so the text after it follows the
 * current word dynamically. Reduced motion renders a static word.
 */
export function TypewriterWord() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reducedMotion) return;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = WORDS[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setTyped(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          deleting = true;
          timer = setTimeout(tick, HOLD_MS);
          return;
        }
        timer = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex -= 1;
        setTyped(current.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
          timer = setTimeout(tick, TYPE_SPEED);
          return;
        }
        timer = setTimeout(tick, DELETE_SPEED);
      }
    };

    timer = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <>
      <span
        aria-hidden="true"
        className="whitespace-nowrap font-heading font-bold leading-none tracking-[-0.02em] text-[clamp(3rem,12vw,220px)]"
      >
        {reducedMotion ? "MOBILE" : typed}
      </span>
      <span className="sr-only">MOBILE</span>
    </>
  );
}
