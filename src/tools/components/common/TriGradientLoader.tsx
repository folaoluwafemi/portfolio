import { useId } from "react";

/**
 * The Harpenin loading identity: an SVG arc stroked with the brand
 * tri-gradient (orange → magenta → blue) spinning over a faint track.
 * Pure CSS animation; honors reduced motion via the global switch.
 */
export function TriGradientLoader({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="status"
      aria-label="Loading"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-brand)" />
          <stop
            offset="55%"
            stopColor="var(--color-brand-magenta)"
            stopOpacity="0.8"
          />
          <stop
            offset="100%"
            stopColor="var(--color-brand-blue)"
            stopOpacity="0.1"
          />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke="var(--border-default)"
        strokeOpacity="0.3"
        strokeWidth="4"
      />
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="70 30"
        className="animate-[spin_1200ms_linear_infinite]"
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}
