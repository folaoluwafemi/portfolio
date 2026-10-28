import localFont from "next/font/local";

/**
 * Self-hosted font pairing, ported from the Harpenin design system:
 * Spline Sans for headings/display only, Manrope for body, labels and
 * buttons. Never hardcode a font-family in components — use the
 * `font-heading` / `font-body` utilities (see Typography.ts).
 */
export const manrope = localFont({
  src: [
    {
      path: "../../../../public/fonts/manrope/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/manrope/Manrope-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/manrope/Manrope-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/manrope/Manrope-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-manrope-var",
  display: "swap",
});

export const splineSans = localFont({
  src: [
    {
      path: "../../../../public/fonts/spline-sans/SplineSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/spline-sans/SplineSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-spline-sans-var",
  display: "swap",
});
