"use client";

import type { ReactNode } from "react";

interface FlatButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Minimal borderless button, faithful to the Flutter FlatButton.
 */
export function FlatButton({
  children,
  onClick,
  className = "",
  ariaLabel,
  ariaExpanded,
  ariaControls,
  buttonRef,
}: FlatButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={`inline-flex items-center justify-center text-content-strong transition-opacity duration-150 hover:opacity-80 focus-visible:opacity-80 active:opacity-70 ${className}`}
    >
      {children}
    </button>
  );
}
