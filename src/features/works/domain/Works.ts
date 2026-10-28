export type Platform = "android" | "ios" | "web";

export type ContentStatus = "ready" | "needs-copy";

export interface WorkStyles {
  /** Per-work accent colors; readable text on them is derived at render
   * time via getContrastColor (YIQ), never hardcoded per work. */
  primary: string;
  primaryVariant: string;
  secondary: string;
}

export interface WorkListing {
  slug: string;
  name: string;
  industry: string;
  overview?: string;
  challenges?: string;
  contentStatus: ContentStatus;
  platformLinks: Partial<Record<Platform, string>>;
  styles: WorkStyles;
}

/**
 * Overview is the shared Flutter-era copy ported verbatim from
 * flutter/lib/src/features/works/tools/works.dart so the hover card and
 * detail overview render exactly what the original app rendered. It is not
 * verified work-specific copy — `contentStatus` stays "needs-copy" until the
 * owner supplies real case studies, and store URLs must never be invented.
 * Display order is top-to-bottom visual, DOM and keyboard order.
 */
const flutterOverview =
  "Hello, my name is Fola, and I am a mobile software developer " +
  "specializing in Flutter. With a strong background in Kotlin, I have " +
  "honed my skills in creating innovative and user-friendly mobile " +
  "applications. #Fintech-App";

export const works: WorkListing[] = [
  {
    slug: "gocreative",
    name: "GoCreative",
    industry: "Mentorship Focused Social for Creatives",
    overview: flutterOverview,
    contentStatus: "needs-copy",
    platformLinks: {},
    styles: {
      primary: "#FF5D00",
      primaryVariant: "#FF7D33",
      secondary: "#34A853",
    },
  },
  {
    slug: "pfund",
    name: "Pfund",
    industry: "Offline First Fintech App",
    overview: flutterOverview,
    contentStatus: "needs-copy",
    platformLinks: {},
    styles: {
      primary: "#007AFF",
      primaryVariant: "#006ECF",
      secondary: "#12C27B",
    },
  },
  {
    slug: "haven",
    name: "Haven",
    industry: "Complex Story-sharing App",
    overview: flutterOverview,
    contentStatus: "needs-copy",
    platformLinks: {},
    styles: {
      primary: "#0CADC9",
      primaryVariant: "#35BBD2",
      secondary: "#7FC048",
    },
  },
  {
    slug: "tasksphere",
    name: "TaskSphere",
    industry: "Productivity App for Gen-Z's",
    overview: flutterOverview,
    contentStatus: "needs-copy",
    platformLinks: {},
    styles: {
      primary: "#EF8001",
      primaryVariant: "#CB9374",
      secondary: "#A3582F",
    },
  },
];

const uniqueSlugs = new Set(works.map((work) => work.slug));
if (uniqueSlugs.size !== works.length) {
  throw new Error("Duplicate work slugs in registry");
}

export function getWorkBySlug(slug: string): WorkListing | undefined {
  return works.find((work) => work.slug === slug);
}
