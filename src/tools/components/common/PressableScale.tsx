import type { ReactNode } from "react";

/**
 * Press feedback for interactive elements, the web port of Harpenin's
 * PressableScale: springs to 0.96 with a slight dim while pressed.
 * CSS `:active` propagates from the wrapped control to this wrapper,
 * so Links and buttons keep their own semantics.
 */
export function PressableScale({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex transition duration-150 ease-out active:scale-[0.96] active:opacity-90 ${className}`}
    >
      {children}
    </span>
  );
}
