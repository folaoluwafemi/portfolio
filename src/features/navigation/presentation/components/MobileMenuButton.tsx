"use client";

import { FlatButton } from "@features/navigation/presentation/components/FlatButton";

interface MobileMenuButtonProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Hamburger control for the expanding mobile menu.
 */
export function MobileMenuButton({
  open,
  onToggle,
  className = "",
  triggerRef,
}: MobileMenuButtonProps) {
  return (
    <FlatButton
      buttonRef={triggerRef}
      onClick={onToggle}
      ariaLabel={open ? "Close menu" : "Open menu"}
      ariaExpanded={open}
      ariaControls="mobile-menu"
      className={className}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </FlatButton>
  );
}
