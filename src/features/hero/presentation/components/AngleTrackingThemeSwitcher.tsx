"use client";

import { useEffect, useState } from "react";
import { LightSwitcher } from "@features/hero/presentation/components/LightSwitcher";
import { DESKTOP_QUERY, useMediaQuery } from "@tools/hooks/useMediaQuery";

/**
 * Desktop/monitor light bulb that swings toward the cursor's horizontal
 * position, faithful to the Flutter AngleTrackingThemeSwitcher. The bulb is
 * frozen straight (90deg) while being dragged.
 */
export function AngleTrackingThemeSwitcher() {
  const enabled = useMediaQuery(DESKTOP_QUERY);
  const [angle, setAngle] = useState(90);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const dx = event.clientX - window.innerWidth / 2;
        const dy = event.clientY - window.innerHeight / 2;
        const distance = Math.hypot(dx, dy);
        const nextAngle = distance === 0 ? 90 : (90 * dx) / distance + 90;
        setAngle(Math.min(180, Math.max(0, nextAngle)));
      });
    };
    const onLeave = () => setAngle(90);
    const onBlur = () => setAngle(90);
    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerout", onLeave);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerout", onLeave);
      window.removeEventListener("blur", onBlur);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 desktop:block"
      >
        <div className="origin-top">
          <div className="h-[75px]" />
          <LightSwitcher frozen />
        </div>
      </div>
    );
  }

  // Flutter: Transform.rotate(-angle) then Transform.rotate(+90deg) →
  // net rotation of (90 - angle) degrees around the top anchor.
  const displayAngle = dragging ? 90 : angle;
  const netRotation = 90 - displayAngle;

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
      <div
        className="origin-top transition-transform duration-200 ease-linear"
        style={{ transform: `rotate(${netRotation}deg)` }}
      >
        <div className="h-[75px]" />
        <LightSwitcher
          frozen={dragging}
          onDragStateChange={setDragging}
        />
      </div>
    </div>
  );
}
