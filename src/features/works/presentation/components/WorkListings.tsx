"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { works, type WorkListing } from "@features/works/domain/Works";
import { ArrowIcon } from "@tools/components/common/Icons";
import { Typography } from "@core/design_system/theme/Typography";
import { AppPreview } from "@features/works/presentation/components/AppPreview";

/**
 * Registry-driven work listings in the Harpenin visual language. Mobile
 * shows compact rows; tablet and desktop reproduce the original hover
 * choreography (work_listing_item.dart, item_detail.dart,
 * show_device_preview_animation.dart) with unchanged mechanics:
 *
 *   t=0ms   overlays mount; the row card sits ABOVE them, so the card and
 *           phone emerge from behind the row
 *   t=50ms  detail card, phone and (desktop only) arrow slide in, 500ms ease
 *   t=500ms phone zooms to double size, 500ms ease
 *   t=550ms row card drops BELOW the overlays (the showButton flip)
 *   exit    everything unmounts instantly — the original has no exit tween
 *
 * Hover is tracked on the item container, which at rest is exactly the
 * original's 126-unit hit region (8 + 110 + 8 padding box); adjacent items
 * hand the pointer over without a gap. The overlays are pointer-transparent
 * so the flying phone can pass under the cursor without collapsing the row.
 * HoverChoreography mounts fresh on every hover enter, so its phases always
 * start from the beginning. All variants stay in the DOM and switch purely
 * with CSS so each viewport gets its layout from SSR.
 */

const VARIANT_CONFIG = {
  desktop: {
    phoneScale: 0.4,
    expandedHeight: 300,
    cardTop: 110,
    cardClass: "rounded-2xl px-10 py-[50px]",
    nameClass: "text-[60px] leading-[64px] tracking-[-1.5px]",
    indexClass: "text-[16px]",
    pillClass: "px-[19px] text-[15px]",
    arrow: true,
  },
  tablet: {
    phoneScale: 0.3,
    expandedHeight: 400,
    cardTop: 114,
    cardClass: "rounded-2xl px-[30px] py-5",
    nameClass: "text-[56px] leading-[60px] tracking-[-1px]",
    indexClass: "text-[14px] portrait:text-[13px]",
    pillClass: "px-4 text-[13px] portrait:text-[12px]",
    arrow: false,
  },
} as const;

type ListingVariant = keyof typeof VARIANT_CONFIG;

export function WorkListings() {
  const [hoveringOverList, setHoveringOverList] = useState(false);

  return (
    <section id="works" className="bg-surface-primary">
      <div className="tablet:hidden">
        <div className="px-2 py-4">
          {works.map((work, index) => (
            <CompactRow key={work.slug} work={work} index={index} />
          ))}
        </div>
      </div>
      <div className="hidden tablet:block desktop:hidden">
        <HoverableList
          variant="tablet"
          hoveringOverList={hoveringOverList}
          onHoveringOverListChange={setHoveringOverList}
        />
      </div>
      <div className="hidden desktop:block">
        <HoverableList
          variant="desktop"
          hoveringOverList={hoveringOverList}
          onHoveringOverListChange={setHoveringOverList}
        />
      </div>
    </section>
  );
}

function HoverableList({
  variant,
  hoveringOverList,
  onHoveringOverListChange,
}: {
  variant: ListingVariant;
  hoveringOverList: boolean;
  onHoveringOverListChange: (hovering: boolean) => void;
}) {
  return (
    <div
      className="mx-auto max-w-[1440px] px-4"
      onPointerEnter={() => onHoveringOverListChange(true)}
      onPointerLeave={() => onHoveringOverListChange(false)}
    >
      {works.map((work, index) => (
        <WorkListingItem
          key={work.slug}
          work={work}
          index={index}
          hoveringOverList={hoveringOverList}
          variant={variant}
        />
      ))}
    </div>
  );
}

function CompactRow({ work, index }: { work: WorkListing; index: number }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className={`flex h-[110px] items-center justify-between rounded-2xl bg-surface-card px-4 text-content-strong transition duration-150 ease-out active:scale-[0.98] active:opacity-90 ${
        index === 0 ? "mt-6" : "mt-2"
      }`}
    >
      <span className="flex min-w-0 items-baseline">
        <span className="self-start pt-3.5 font-body text-[11px] font-medium leading-[16px] text-content-tertiary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="ml-2 truncate font-heading text-[26px] font-semibold leading-[1.1] tracking-[-0.5px]">
          {work.name}
        </span>
      </span>
      <span className="ml-2.5 max-w-[40%] truncate rounded-full bg-surface-subtle px-3.5 py-1 font-body text-[12px] font-medium leading-[1.4] text-content-secondary">
        {work.industry}
      </span>
    </Link>
  );
}

function IndustryPill({
  work,
  selectionColorClass,
  variant,
}: {
  work: WorkListing;
  selectionColorClass: string;
  variant: ListingVariant;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full bg-surface-subtle py-[5px] font-body font-medium leading-none ${VARIANT_CONFIG[variant].pillClass} ${selectionColorClass}`}
    >
      {work.industry}
    </span>
  );
}

function WorkListingItem({
  work,
  index,
  hoveringOverList,
  variant,
}: {
  work: WorkListing;
  index: number;
  hoveringOverList: boolean;
  variant: ListingVariant;
}) {
  const config = VARIANT_CONFIG[variant];
  const [pointerHovering, setPointerHovering] = useState(false);
  const [focusHovering, setFocusHovering] = useState(false);
  const hovering = pointerHovering || focusHovering;
  const [buttonOnTop, setButtonOnTop] = useState(true);
  const liftButton = useCallback(() => setButtonOnTop(false), []);

  const beginHover = (activate: (hovering: boolean) => void) => {
    if (!hovering) {
      setButtonOnTop(true);
    }
    activate(true);
  };

  const dimmed = hoveringOverList && !hovering;
  const selectionColorClass = dimmed
    ? "text-content-tertiary"
    : "text-content-strong";
  const hasOverview = Boolean(work.overview?.trim());

  return (
    <div
      className={`relative pb-2 ${index === 0 ? "pt-6" : "pt-2"}`}
      style={hovering ? { height: config.expandedHeight } : undefined}
      onPointerEnter={() => beginHover(setPointerHovering)}
      onPointerLeave={() => setPointerHovering(false)}
    >
      <Link
        href={`/works/${work.slug}`}
        onFocus={() => beginHover(setFocusHovering)}
        onBlur={() => setFocusHovering(false)}
        className={`flex h-[110px] rounded-2xl bg-surface-card text-content-strong transition duration-150 ease-out active:scale-[0.99] active:opacity-95 ${
          variant === "desktop" ? "items-stretch" : "items-center px-[30px]"
        } ${hovering && buttonOnTop ? "relative z-30" : ""}`}
      >
        {variant === "desktop" ? (
          <>
            <span className="w-[33px] shrink-0" aria-hidden="true" />
            <span
              className={`flex items-start pt-4 font-body font-medium leading-[1.125] opacity-50 ${config.indexClass}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="w-2.5 shrink-0" aria-hidden="true" />
            <span
              className={`min-w-0 max-w-[655px] truncate self-center font-heading font-bold ${config.nameClass}`}
            >
              {work.name}
            </span>
            <span className="flex-1" aria-hidden="true" />
            <IndustryPill
              work={work}
              selectionColorClass={selectionColorClass}
              variant={variant}
            />
            <span className="w-[66px] shrink-0" aria-hidden="true" />
          </>
        ) : (
          <>
            <span className="flex min-w-0 items-start">
              <span
                className={`pt-4 font-body font-medium leading-[1.125] opacity-50 portrait:pt-3.5 ${config.indexClass}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`ml-2 min-w-0 truncate font-heading font-bold portrait:ml-[5px] ${config.nameClass}`}
              >
                {work.name}
              </span>
            </span>
            <IndustryPill
              work={work}
              selectionColorClass={selectionColorClass}
              variant={variant}
            />
          </>
        )}
      </Link>

      {hovering && (
        <HoverChoreography
          work={work}
          index={index}
          selectionColorClass={selectionColorClass}
          config={config}
          hasOverview={hasOverview}
          onButtonLift={liftButton}
        />
      )}
    </div>
  );
}

function HoverChoreography({
  work,
  index,
  selectionColorClass,
  config,
  hasOverview,
  onButtonLift,
}: {
  work: WorkListing;
  index: number;
  selectionColorClass: string;
  config: (typeof VARIANT_CONFIG)[ListingVariant];
  hasOverview: boolean;
  onButtonLift: () => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const slideTimer = setTimeout(() => setPhase(1), 50);
    const zoomTimer = setTimeout(() => setPhase(2), 500);
    const liftTimer = setTimeout(onButtonLift, 550);
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(zoomTimer);
      clearTimeout(liftTimer);
    };
  }, [onButtonLift]);

  return (
    <>
      {hasOverview && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[6%] top-0 z-10"
          style={{
            transform: `translateY(${phase >= 1 ? config.cardTop : -100}px)`,
            transition: "transform 500ms ease",
            willChange: "transform",
          }}
        >
          <div
            className={`w-1/2 bg-surface-card ${config.cardClass}`}
          >
            <p className={`${Typography.bodyLarge.className} text-content-secondary`}>
              {work.overview}
            </p>
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[69%] top-0 z-20"
        style={{
          transform: `translateY(${phase >= 1 ? 154 : -268}px)`,
          transition: "transform 500ms ease",
          willChange: "transform",
        }}
      >
        <div
          style={{
            transform: `scale(${phase >= 2 ? config.phoneScale * 2 : config.phoneScale})`,
            transition: "transform 500ms ease",
            willChange: "transform",
          }}
        >
          <AppPreview work={work} scale={config.phoneScale} />
        </div>
      </div>

      {config.arrow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[66px] z-40 flex h-[110px] items-center"
          style={{ top: index === 0 ? 24 : 8 }}
        >
          <span
            className={`block ${selectionColorClass}`}
            style={{
              transform: `rotate(${phase >= 1 ? 0 : 180}deg)`,
              transition: "transform 500ms ease",
              willChange: "transform",
            }}
          >
            <ArrowIcon />
          </span>
        </div>
      )}
    </>
  );
}
