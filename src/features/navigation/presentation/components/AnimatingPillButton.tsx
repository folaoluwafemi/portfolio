"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

interface AnimatingPillButtonProps {
  children?: ReactNode;
  text?: string;
  href?: string;
  onSelect?: (event?: React.MouseEvent) => void;
  variant?: "menu" | "nav";
  fontSize?: number;
  className?: string;
  disabled?: boolean;
  ariaCurrent?: "page" | undefined;
}

/**
 * Pill-shaped button with a slider that follows the cursor horizontally on
 * hover/focus, faithful to the Flutter AnimatingPillButton.
 */
export function AnimatingPillButton({
  children,
  text,
  href,
  onSelect,
  variant = "nav",
  fontSize = variant === "menu" ? 16 : 18,
  className = "",
  disabled = false,
  ariaCurrent,
}: AnimatingPillButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef(0);
  const [sliderVisible, setSliderVisible] = useState(false);

  const handlePointerMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty(
        "--slider-x",
        `${Math.max(0, Math.min(rect.width, event.clientX - rect.left))}px`,
      );
    });
  };

  const commonClasses = `relative font-body font-medium text-content-strong transition-opacity duration-150 hover:opacity-80 focus-visible:opacity-80 active:opacity-70 disabled:pointer-events-none disabled:opacity-40 ${className}`;

  const content = (
    <span className="flex items-center" style={{ fontSize }}>
      {children ?? text}
    </span>
  );

  const slider = sliderVisible ? (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-1.5 h-1 w-[30px] bg-current"
      style={{ left: "var(--slider-x, 0px)" }}
    />
  ) : null;

  if (href && !disabled) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onSelect}
        aria-current={ariaCurrent}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setSliderVisible(true)}
        onPointerLeave={() => setSliderVisible(false)}
        onFocus={() => setSliderVisible(true)}
        onBlur={() => setSliderVisible(false)}
        className={`inline-flex ${commonClasses} px-6 py-2.25`}
      >
        {content}
        {slider}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-current={ariaCurrent}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setSliderVisible(true)}
      onPointerLeave={() => setSliderVisible(false)}
      onFocus={() => setSliderVisible(true)}
      onBlur={() => setSliderVisible(false)}
      className={`inline-flex ${commonClasses} px-6 py-2.25`}
    >
      {content}
      {slider}
    </button>
  );
}
