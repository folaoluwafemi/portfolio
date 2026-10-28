/**
 * Centralised typography tokens, ported from the Harpenin design system
 * (src/core/design_system/theme/Typography.ts) and adapted to Tailwind
 * class tokens for the web.
 *
 * Two families only:
 *  - Spline Sans  → headings/display (`font-heading` + semibold/bold)
 *  - Manrope      → body, labels, buttons (`font-body` + 400/500/600/700)
 *
 * Hard rules (see .agents/skills/text-styling):
 *  1. Never hardcode a font family — spread a token's className.
 *  2. If you override the size, set the line height with it.
 *  3. Don't stack a font-weight utility onto a token — the token encodes it.
 *  4. Spline Sans is for headings only — body text is always Manrope.
 *
 * Custom sizes: pick the closest token and override size + leading
 * together, e.g. `${Typography.bodyLargeSemibold.className} text-[17px] leading-[24px]`.
 */
export const Typography = {
  /** Hero/display moments. Spline Sans 700 with negative tracking. */
  displayLarge: token("font-heading font-bold text-[40px] leading-[44px] tracking-[-1.5px]"),
  /** Monumental portfolio display (hero names, oversized numerals). */
  displayHero: token(
    "font-heading font-bold text-[clamp(3rem,15vw,220px)] leading-[0.95] tracking-[-0.02em]",
  ),
  /** Work listing names and other large navigational display text. */
  displayWork: token("font-heading font-bold text-[60px] leading-[64px] tracking-[-1.5px]"),

  heading1: token("font-heading font-bold text-[24px] leading-[30px] tracking-[-0.5px]"),
  heading2: token("font-heading font-semibold text-[21px] leading-[28px] tracking-[-0.3px]"),
  heading3: token("font-heading font-semibold text-[18px] leading-[24px]"),

  bodyLarge: token("font-body text-[15px] leading-[20px]"),
  bodyMedium: token("font-body text-[13px] leading-[18px]"),
  bodySmall: token("font-body text-[11px] leading-[16px]"),
  bodyLargeSemibold: token("font-body font-semibold text-[15px] leading-[20px]"),
  bodyMediumSemibold: token("font-body font-semibold text-[13px] leading-[18px]"),

  labelLarge: token("font-body font-medium text-[15px] leading-[20px]"),
  labelMedium: token("font-body font-medium text-[13px] leading-[18px]"),
  labelSmall: token("font-body font-medium text-[11px] leading-[16px]"),
  labelBold: token("font-body font-bold text-[13px] leading-[18px]"),

  /** Buttons and pill actions. */
  button: token("font-body font-bold text-[15px] leading-[20px]"),
  caption: token("font-body text-[11px] leading-[16px]"),
} as const;

export type TypographyToken = keyof typeof Typography;

function token(className: string): { className: string } {
  return { className };
}
