/**
 * Skeleton placeholder, the web port of Harpenin's MakeShimmer/GreyBox:
 * a masked gradient sweep (see `.shimmer-box` in globals.css) that runs
 * on the compositor and stops entirely under reduced motion. Size the
 * box to mirror the real content it stands in for.
 */
export function Shimmer({
  className = "",
  circle = false,
}: {
  className?: string;
  circle?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`shimmer-box ${circle ? "rounded-full" : "rounded-xl"} ${className}`}
    />
  );
}
