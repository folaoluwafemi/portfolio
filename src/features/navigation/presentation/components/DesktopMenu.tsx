"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@features/navigation/domain/Navigation";
import { AnimatingPillButton } from "@features/navigation/presentation/components/AnimatingPillButton";

function scrollToWorks(event?: React.MouseEvent) {
  event?.preventDefault();
  document
    .getElementById("works")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Hero top menu (all-caps pills), faithful to the Flutter DesktopMenu.
 * Social buttons are intentionally omitted until verified URLs exist.
 */
export function DesktopMenu() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-9">
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <AnimatingPillButton
            key={item.id}
            text={item.menuLabel}
            variant="menu"
            href={item.href}
            onSelect={
              item.href === "/" && pathname === "/"
                ? scrollToWorks
                : undefined
            }
          />
        ))}
      </div>
    </header>
  );
}
