"use client";

import type { WorkListing } from "@features/works/domain/Works";
import { TriGradientLoader } from "@tools/components/common/TriGradientLoader";

interface AppPreviewProps {
  work: WorkListing;
  scale?: number;
  className?: string;
}

/**
 * Stylized phone mock-up in the Harpenin visual language: borderless
 * rounded frame (surface card vs. screen contrast instead of a bezel
 * border), app-bar with the work name over a hairline, and the brand
 * tri-gradient loader as an honest "the real app UI is not ready yet"
 * placeholder — never fake app UI.
 */
export function AppPreview({
  work,
  scale = 1,
  className = "",
}: AppPreviewProps) {
  const width = Math.round(300 * scale);
  const height = Math.round(670 * scale);

  return (
    <div
      className={`overflow-hidden bg-surface-card ${className}`}
      style={{ width, height, borderRadius: 40 * scale }}
    >
      <div
        className="flex h-full flex-col overflow-hidden bg-surface-primary"
        style={{ borderRadius: 30 * scale, margin: 6 * scale }}
      >
        <div
          className="flex shrink-0 items-center justify-center"
          style={{ height: 72 * scale }}
        >
          <span
            className="whitespace-nowrap font-body font-semibold leading-none text-content-strong"
            style={{ fontSize: 26 * scale }}
          >
            {work.name}
          </span>
        </div>
        <div className="h-px w-full shrink-0 bg-border-default/40" />
        <div className="flex min-h-0 flex-1 flex-col items-center">
          <span className="flex-[2]" aria-hidden="true" />
          <TriGradientLoader size={Math.round(50 * scale)} />
          <span className="flex-[3]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
