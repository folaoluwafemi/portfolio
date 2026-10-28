"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { DesktopMenu } from "@features/navigation/presentation/components/DesktopMenu";
import { MobileMenu } from "@features/navigation/presentation/components/MobileMenu";
import { MobileMenuButton } from "@features/navigation/presentation/components/MobileMenuButton";
import { NavWidget } from "@features/navigation/presentation/components/NavWidget";
import { AngleTrackingThemeSwitcher } from "@features/hero/presentation/components/AngleTrackingThemeSwitcher";
import { MagicText } from "@features/hero/presentation/components/MagicText";
import { ScrollProgressTracker } from "@features/hero/presentation/components/ScrollProgressTracker";
import { TypewriterWord } from "@features/hero/presentation/components/TypewriterWord";
import { Shimmer } from "@tools/components/common/Shimmer";

const TABLET_PORTRAIT =
  "[@media(min-width:744px)_and_(max-width:1279.98px)_and_(orientation:portrait)]:";
const TABLET_LANDSCAPE =
  "[@media(min-width:744px)_and_(max-width:1279.98px)_and_(orientation:landscape)]:";

/**
 * Full-viewport hero in the Harpenin visual language. All three
 * compositions (mobile/tablet, tablet-landscape, desktop) are present in
 * the DOM and switched purely with CSS media queries, so the correct hero
 * is server-rendered at every viewport. Exactly one composition is visible
 * at a time (the others are display:none, which also removes them from
 * the accessibility tree). Photos sit under a surface scrim so type stays
 * readable without borders or overlays, with a shimmer skeleton beneath
 * while they load.
 */
export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className={`desktop:hidden ${TABLET_LANDSCAPE}hidden`}>
        <MobileComposition
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          menuTriggerRef={menuTriggerRef}
        />
      </div>
      <div className={`hidden ${TABLET_LANDSCAPE}block desktop:hidden`}>
        <TabletLandscapeComposition />
      </div>
      <div className="hidden desktop:block">
        <DesktopComposition />
      </div>
    </>
  );
}

function MobileComposition({
  menuOpen,
  setMenuOpen,
  menuTriggerRef,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  menuTriggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <section className="relative flex h-svh flex-col bg-surface-primary">
      <div className={`relative h-[44%] ${TABLET_PORTRAIT}h-[60%]`}>
        <Shimmer className="absolute inset-0 rounded-none" />
        <Image
          src="/images/fola_image_8.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_0%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--surface-primary),transparent_45%)]"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-6">
        <div className="h-9" />
        <h1
          className={`font-heading font-bold leading-none tracking-[-0.02em] text-content-strong ${TABLET_PORTRAIT}text-[95px] text-[52px]`}
        >
          Mobile Engineer
        </h1>
        <div className="h-[21px]" />
        <MeBodyText className={`${TABLET_PORTRAIT}text-[18px] text-[15px]`} />
        <div className="flex-1" />
        <NavWidget />
        <div className="h-2.5" />
      </div>
      <div className="absolute right-4 top-4">
        <MobileMenuButton
          open={menuOpen}
          onToggle={() => setMenuOpen(!menuOpen)}
          triggerRef={menuTriggerRef}
        />
      </div>
      <div className="absolute inset-x-0 top-0 z-30">
        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          triggerRef={menuTriggerRef}
        />
      </div>
    </section>
  );
}

function TabletLandscapeComposition() {
  return (
    <section className="flex h-svh bg-surface-primary">
      <div className="flex flex-1 flex-col">
        <div className="flex-[2]" aria-hidden="true" />
        <div className="px-9 py-13">
          <h1 className="font-heading text-[96px] font-bold leading-[1.05] tracking-[-0.02em] text-content-strong">
            Mobile Engineer
          </h1>
          <div className="h-[19px]" />
          <MeBodyText className="text-[15px]" />
        </div>
        <div className="flex-[3]" aria-hidden="true" />
        <NavWidget className="pl-9" />
        <div className="h-10" />
      </div>
      <div className="relative w-[40%]">
        <Shimmer className="absolute inset-0 rounded-none" />
        <Image
          src="/images/fola_image_3.jpg"
          alt=""
          fill
          sizes="40vw"
          className="object-cover object-[15%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--surface-primary),transparent_40%)]"
        />
      </div>
    </section>
  );
}

function DesktopComposition() {
  return (
    <section className="relative h-svh min-h-[640px] bg-surface-primary">
      <Shimmer className="absolute inset-0 rounded-none" />
      <Image
        src="/images/fola_image_8.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_30%] opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--surface-primary)_5%,color-mix(in_srgb,var(--surface-primary)_55%,transparent)_35%,transparent_75%)]"
      />
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between">
        <DesktopMenu />
        <BodyPart />
      </div>
      <ScrollProgressTracker />
      <AngleTrackingThemeSwitcher />
    </section>
  );
}

function MeBodyText({ className = "" }: { className?: string }) {
  const strong = (text: string) => (
    <span key={text} className="font-semibold text-content-strong">
      {text}
    </span>
  );

  return (
    <p
      className={`max-w-[60ch] font-body leading-[1.5555] text-content-secondary ${className}`}
    >
      Hello, my name is {strong("Fola")}, and I am a{" "}
      {strong("mobile software developer")} specializing in {strong("Flutter")}.
      With a strong background in Kotlin, I have honed my skills in creating
      innovative and user-friendly mobile applications.
    </p>
  );
}

function BodyPart() {
  return (
    <div className="pb-9">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-1.25 h-px bg-border-default/40"
        />
        <h1 className="flex items-center">
          <span className="w-9 shrink-0" aria-hidden="true" />
          <MagicText className="text-content-strong">
            <span className="font-heading text-[clamp(3.5rem,16vw,280px)] font-bold leading-[0.9] tracking-[-0.03em]">
              FOLA OLUWAFEMI
            </span>
          </MagicText>
        </h1>
      </div>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-5 h-px bg-border-default/40"
        />
        <div className="flex items-center gap-[60px] pb-5">
          <span className="flex items-baseline">
            <MagicText className="text-content-secondary">
              <span className="font-heading text-[clamp(3rem,12vw,220px)] font-bold leading-none tracking-[-0.02em]">
                -{" "}
              </span>
            </MagicText>
            <TypewriterWord />
            <MagicText className="text-content-secondary">
              <span className="font-heading text-[clamp(3rem,12vw,220px)] font-bold leading-none tracking-[-0.02em]">
                {" "}
                ENGINEER
              </span>
            </MagicText>
          </span>
          <MagicText className="max-w-[32ch] text-content-strong">
            <span className="font-body text-[15px] font-medium leading-[1.47]">
              A Flutter mobile developer dedicated to shaping experiences that
              deliver exceptional user experiences.
            </span>
          </MagicText>
          <span className="w-[79px] shrink-0" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
