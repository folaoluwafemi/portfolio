"use client";

import { useEffect, useState } from "react";
import { DESKTOP_QUERY, useMediaQuery } from "@tools/hooks/useMediaQuery";

const TRACK_HEIGHT = 204;

/**
 * Right-edge scroll progress tracker with a draggable tip, faithful to the
 * Flutter ScrollProgressTracker / BulbTip. Progress fills after scrolling 2/3
 * of a viewport; dragging the tip scrolls the document at 1.5x pointer speed.
 * Desktop/monitor only (hidden with CSS elsewhere).
 */
export function ScrollProgressTracker() {
  const enabled = useMediaQuery(DESKTOP_QUERY);
  const [value, setValue] = useState(0);
  const [focused, setFocused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const compute = () => {
      const progress = window.scrollY / (window.innerHeight * (2 / 3));
      setValue(Math.min(1, Math.max(0, progress)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        compute();
      });
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    window.scrollBy(0, event.movementY * 1.5);
  };

  const handlePointerEnd = () => {
    setDragging(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const deltas: Record<string, number> = {
      ArrowDown: 80,
      ArrowUp: -80,
      PageDown: window.innerHeight,
      PageUp: -window.innerHeight,
      Home: -window.scrollY,
      End:
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight,
    };
    const delta = deltas[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    window.scrollBy(0, delta);
  };

  return (
    <div className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center desktop:flex">
      <TrackerShell
        value={value}
        hovered={hovering || focused}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerEnd={handlePointerEnd}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

function TrackerShell({
  value,
  hovered,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  onKeyDown,
}: {
  value: number;
  hovered: boolean;
  onPointerDown?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerMove?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerEnd?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const top = -19 + value * TRACK_HEIGHT;

  return (
    <>
      <div className="relative h-[204px] w-20">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border-default"
        />
        <button
          type="button"
          aria-label="Scroll progress. Use arrow keys to scroll."
          style={{ top }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 -translate-x-1/2 rounded-full p-4"
        >
          <span
            aria-hidden="true"
            className={`block rounded-full bg-content-strong transition-all duration-150 ${
              hovered
                ? "h-[15px] w-[15px] ring-[1.5px] ring-content-strong"
                : "h-[11px] w-[11px]"
            }`}
          />
        </button>
      </div>
      <p
        aria-hidden="true"
        className="mt-6 whitespace-nowrap font-heading text-[clamp(1.25rem,2.5vw,2rem)] font-semibold leading-[1.1875] tracking-[-0.5px] text-content-strong"
      >
        Scroll to explore
      </p>
    </>
  );
}
