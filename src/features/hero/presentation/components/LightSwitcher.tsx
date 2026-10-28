"use client";

import { useRef, useState } from "react";
import { useTheme } from "@core/design_system/theme/Theme";
import { useFloatingSparkles } from "@tools/components/common/FloatingSparkles";

interface LightSwitcherProps {
  className?: string;
  frozen?: boolean;
  onDragStateChange?: (dragging: boolean) => void;
}

const MAX_CORD_EXTENSION = 200;

/**
 * Hanging light-bulb theme toggle. Dragging the bulb down extends the cord;
 * releasing resets the cord, toggles the theme, and emits a sparkle burst
 * (the floating-particle pattern from .agents/skills/premium-ui-effects).
 */
export function LightSwitcher({
  className = "",
  frozen = false,
  onDragStateChange,
}: LightSwitcherProps) {
  const { theme, toggle } = useTheme();
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const { burst, layer } = useFloatingSparkles(["✨", "💡", "✨"]);

  const setDrag = (value: boolean) => {
    setDragging(value);
    onDragStateChange?.(value);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (frozen) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    startY.current = event.clientY;
    setDrag(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging || frozen) return;
    const delta = event.clientY - startY.current;
    setDragOffset(Math.min(MAX_CORD_EXTENSION, Math.max(0, delta)));
  };

  const handlePointerEnd = () => {
    if (!dragging) return;
    setDragOffset(0);
    setDrag(false);
    if (!frozen) {
      burst();
      toggle();
    }
  };

  const cordHeight = 140 + (dragging ? dragOffset : 0);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {layer}
      <div
        aria-hidden="true"
        style={{ height: cordHeight }}
        className={`w-[1.5px] bg-content-strong ${
          dragging ? "" : "transition-[height] duration-300 ease-out"
        }`}
      />
      <button
        type="button"
        aria-label="Toggle color theme"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClick={() => {
          if (!dragging && frozen === false) toggle();
        }}
        className="pointer-events-auto rounded-full p-[55px] text-content-strong transition-opacity duration-150 hover:opacity-80 active:opacity-70"
      >
        <span className="block -scale-y-100" aria-hidden="true">
          {theme === "dark" ? <HalfSunIcon /> : <CrescentMoonIcon />}
        </span>
      </button>
    </div>
  );
}

function HalfSunIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4.5a6.75 6.75 0 0 1 6.75 6.75V12h-13.5v-.75A6.75 6.75 0 0 1 12 4.5Z"
        fill="currentColor"
      />
      <path d="M5 16h14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CrescentMoonIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-5.4-5.4c0-1.81.9-3.42 2.26-4.4A9.06 9.06 0 0 0 12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
