"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@features/navigation/domain/Navigation";
import { ArrowUpRightIcon } from "@tools/components/common/Icons";
import { useMediaQuery, TABLET_PORTRAIT_QUERY } from "@tools/hooks/useMediaQuery";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Expanding full-width mobile menu panel (500ms height transition), faithful
 * to the Flutter MobileMenu. Closes on Escape, outside click and item select;
 * focus returns to the trigger when fully closed.
 */
export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const tabletPortrait = useMediaQuery(TABLET_PORTRAIT_QUERY);
  const [fullyClosed, setFullyClosed] = useState(true);
  const pathname = usePathname();

  const height = tabletPortrait ? 274 : 226;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }, [open]);

  const handleTransitionEnd = () => {
    if (!open) {
      setFullyClosed(true);
      triggerRef.current?.focus();
    }
  };

  const visible = open || !fullyClosed;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      onTransitionEnd={handleTransitionEnd}
      style={{ height: open ? height : 0 }}
      className={`w-full overflow-hidden bg-surface-primary transition-[height] duration-500 ease-in-out ${
        visible ? "visible" : "invisible"
      }`}
    >
      <div className="flex flex-col gap-[15px] px-7 py-2" style={{ height }}>
        {navItems.map((item) => {
          const isSelected =
            item.href === "/"
              ? pathname === "/" || pathname.startsWith("/works")
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              aria-current={isSelected ? "page" : undefined}
              className={`flex items-center gap-1 font-body text-lg font-medium leading-[1.111] transition-opacity hover:opacity-80 ${
                isSelected ? "text-content-strong" : "text-content-tertiary"
              }`}
            >
              <span>{item.label}</span>
              {!isSelected && (
                <span aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
