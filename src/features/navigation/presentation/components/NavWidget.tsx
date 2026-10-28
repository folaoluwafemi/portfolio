"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@features/navigation/domain/Navigation";
import { ArrowUpRightIcon } from "@tools/components/common/Icons";
import { AnimatingPillButton } from "@features/navigation/presentation/components/AnimatingPillButton";

interface NavWidgetProps {
  className?: string;
}

function scrollToWorks(event?: React.MouseEvent) {
  event?.preventDefault();
  document
    .getElementById("works")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Title-case navigation row (Work, Crafts, About me, Contact) with arrow marks
 * on unselected items and comma separators, faithful to the original
 * NavWidget interaction, restyled with semantic tokens.
 */
export function NavWidget({ className = "" }: NavWidgetProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-[15px]">
        {navItems.map((item, index) => {
          const isSelected =
            item.href === "/"
              ? pathname === "/" || pathname.startsWith("/works")
              : pathname.startsWith(item.href);
          const isLast = index === navItems.length - 1;
          const color = isSelected
            ? "text-content-strong"
            : "text-content-tertiary";

          return (
            <li key={item.id} className="flex items-center gap-[3px]">
              <AnimatingPillButton
                text={item.label}
                href={item.href}
                variant="nav"
                onSelect={
                  item.href === "/" && pathname === "/"
                    ? scrollToWorks
                    : undefined
                }
                ariaCurrent={isSelected ? "page" : undefined}
                className={color}
              />
              {!isSelected && (
                <span aria-hidden="true" className={color}>
                  <ArrowUpRightIcon />
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className={`${color} text-lg leading-[1.111]`}>
                  ,
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
