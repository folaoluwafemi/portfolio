"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}

function getSnapshot(query: string): boolean {
  return window.matchMedia(query).matches;
}

/**
 * SSR-safe media query hook. Returns false on the server and stays in sync
 * with the live query on the client.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => getSnapshot(query),
    () => false,
  );
}

export const DESKTOP_QUERY = "(min-width: 1280px)";
export const TABLET_LANDSCAPE_QUERY =
  "(min-width: 744px) and (max-width: 1279px) and (orientation: landscape)";
export const TABLET_PORTRAIT_QUERY =
  "(min-width: 744px) and (max-width: 1279px) and (orientation: portrait)";
export const COARSE_POINTER_QUERY = "(pointer: coarse)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
