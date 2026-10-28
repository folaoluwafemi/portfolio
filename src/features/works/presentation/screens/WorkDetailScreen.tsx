"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type CSSProperties } from "react";
import type { WorkListing } from "@features/works/domain/Works";
import { NavWidget } from "@features/navigation/presentation/components/NavWidget";
import { MobileMenu } from "@features/navigation/presentation/components/MobileMenu";
import { MobileMenuButton } from "@features/navigation/presentation/components/MobileMenuButton";
import { AppPreview } from "@features/works/presentation/components/AppPreview";
import { PressableScale } from "@tools/components/common/PressableScale";
import { ArrowUpRightIcon } from "@tools/components/common/Icons";
import { Typography } from "@core/design_system/theme/Typography";
import { getContrastColor, withAlpha } from "@tools/utils/Contrast";
import { isExternalUrl } from "@tools/utils/Urls";
import { DESKTOP_QUERY, useMediaQuery } from "@tools/hooks/useMediaQuery";

/**
 * Work detail screen in the Harpenin visual language: sticky action bar
 * (Go back + nav; hamburger on mobile), per-work accent panel whose text
 * color is derived at runtime via the YIQ contrast algorithm (never
 * hardcoded), inverted pill buttons, rounded borderless surfaces, and the
 * phone preview on the accent panel.
 */
export function WorkDetailScreen({ work }: { work: WorkListing }) {
  const router = useRouter();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const onAccent = getContrastColor(work.styles.primary);
  const accentStyle = {
    "--work-primary": work.styles.primary,
    "--work-variant": work.styles.primaryVariant,
    "--work-secondary": work.styles.secondary,
    "--work-on-primary": onAccent,
  } as CSSProperties;

  const goBack = () => {
    if (
      typeof window !== "undefined" &&
      window.history.length > 1 &&
      document.referrer.startsWith(window.location.origin)
    ) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const hasOverview = Boolean(work.overview?.trim());
  const hasChallenges = Boolean(work.challenges?.trim());

  return (
    <div style={accentStyle}>
      <div className="sticky top-0 z-40 bg-surface-primary/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 pb-3 pt-3">
          <PressableScale>
            <button
              type="button"
              onClick={goBack}
              className={`inline-flex items-center gap-2 rounded-full bg-content-strong px-5 py-2.5 text-surface-primary ${Typography.button.className}`}
            >
              <span className="inline-block rotate-[225deg]" aria-hidden="true">
                <ArrowUpRightIcon />
              </span>
              Go back
            </button>
          </PressableScale>
          <div className="hidden desktop:block">
            <NavWidget />
          </div>
          <div className="desktop:hidden">
            <MobileMenuButton
              open={menuOpen}
              onToggle={() => setMenuOpen(!menuOpen)}
              triggerRef={menuTriggerRef}
            />
          </div>
        </div>
        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          triggerRef={menuTriggerRef}
        />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 pb-16 desktop:flex-row">
        <div className="flex-[3] rounded-3xl bg-[var(--work-primary)] px-6 pt-8 text-[var(--work-on-primary)] desktop:px-10 desktop:pt-10 desktop:pr-[140px]">
          <div className="flex flex-wrap items-end gap-4 pb-10">
            <h1
              className={`${Typography.displayWork.className} desktop:text-[72px] desktop:leading-[76px]`}
            >
              {work.name}
            </h1>
            <DownloadLinks work={work} onAccent={onAccent} />
          </div>

          {hasOverview && (
            <>
              <h2 className={Typography.heading2.className}>
                Overview
              </h2>
              <div className="h-3" />
              <p
                className={`max-w-[70ch] ${Typography.bodyLarge.className}`}
                style={{ color: withAlpha(onAccent, 0.9) }}
              >
                {work.overview}
              </p>
              <div className="h-[38px]" />
            </>
          )}
          {hasChallenges ? (
            <>
              <h2 className={Typography.heading2.className}>
                Challenges
              </h2>
              <div className="h-3" />
              <p
                className={`max-w-[70ch] ${Typography.bodyLarge.className}`}
                style={{ color: withAlpha(onAccent, 0.9) }}
              >
                {work.challenges}
              </p>
              <div className="h-[100px]" />
            </>
          ) : (
            <p
              className={`max-w-[60ch] ${Typography.bodyMedium.className}`}
              style={{ color: withAlpha(onAccent, 0.75) }}
            >
              This case study is still being written. Come back soon.
            </p>
          )}
        </div>

        <div className="flex flex-[2] items-center justify-center rounded-3xl bg-[var(--work-variant)] px-6 py-10 desktop:px-16">
          <AppPreview work={work} scale={isDesktop ? 1 : 0.716} />
        </div>
      </div>
    </div>
  );
}

function DownloadLinks({
  work,
  onAccent,
}: {
  work: WorkListing;
  onAccent: string;
}) {
  const entries = Object.entries(work.platformLinks).filter(([, url]) =>
    isExternalUrl(url),
  );
  if (entries.length === 0) return null;

  const labels: Record<string, string> = {
    android: "Android",
    ios: "iOS",
    web: "Web",
  };

  return (
    <div
      className="mb-2 inline-flex items-center rounded-full px-4 py-2"
      style={{
        border: `1px solid ${withAlpha(onAccent, 0.28)}`,
        background: "rgba(255, 255, 255, 0.06)",
      }}
    >
      <span
        className={Typography.labelMedium.className}
        style={{ color: withAlpha(onAccent, 0.75) }}
      >
        Download on:{" "}
      </span>
      {entries.map(([platform, url], index) => (
        <span key={platform}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${Typography.labelBold.className} underline-offset-2 transition-opacity hover:opacity-80`}
          >
            {labels[platform] ?? platform}
          </a>
          {index < entries.length - 1 && (
            <span
              className={Typography.labelMedium.className}
              style={{ color: withAlpha(onAccent, 0.75) }}
            >
              {" "}
              or{" "}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
