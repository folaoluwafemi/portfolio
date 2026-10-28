/**
 * Dynamic brand-color contrast, ported from Harpenin's BrandContrastUtils
 * (the relative-luminance algorithm from .agents/skills/premium-ui-effects).
 * Used wherever per-work accent colors meet text: pick the readable text
 * variant at runtime instead of hardcoding pairs.
 */

export type ContrastColor = "#FFFFFF" | "#000000";

export function getContrastColor(hexColor: string): ContrastColor {
  const cleanHex = hexColor.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}

/** Translucent tint of a hex color — Harpenin's rgba-accent borders/fills. */
export function withAlpha(hexColor: string, alpha: number): string {
  const cleanHex = hexColor.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
