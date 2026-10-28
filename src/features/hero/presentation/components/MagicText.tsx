"use client";

import { cloneElement, useRef } from "react";
import { COARSE_POINTER_QUERY, useMediaQuery } from "@tools/hooks/useMediaQuery";

interface MagicTextProps {
  children: React.ReactElement<{ className?: string; "aria-hidden"?: boolean }>;
  className?: string;
}

/**
 * Cursor-tracked text glow, faithful to the Flutter MagicWidget: a radial
 * gradient centered on the cursor is revealed over the text while hovering.
 * The gradient tint derives from the element's own text color (--ink).
 */
export function MagicText({ children, className = "" }: MagicTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const coarsePointer = useMediaQuery(COARSE_POINTER_QUERY);

  const handlePointerMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || coarsePointer || frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      el.style.setProperty("--magic-x", x.toFixed(3));
      el.style.setProperty("--magic-y", y.toFixed(3));
    });
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--magic-x", "0");
    el.style.setProperty("--magic-y", "0");
  };

  const overlay = cloneElement(children, {
    className: `${children.props.className ?? ""} magic-text__overlay`,
    "aria-hidden": true,
  });

  return (
    <span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`magic-text ${className}`}
    >
      {children}
      {overlay}
    </span>
  );
}
