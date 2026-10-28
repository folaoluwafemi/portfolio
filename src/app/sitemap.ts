import type { MetadataRoute } from "next";
import { works } from "@features/works/domain/Works";

/**
 * The production origin is owner input (see CONTENT.md). Until a domain is
 * verified, no sitemap is emitted rather than publishing a placeholder URL.
 */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!BASE_URL) return [];
  const workRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${BASE_URL}/works/${work.slug}`,
  }));

  return [
    { url: `${BASE_URL}/` },
    ...workRoutes,
    { url: `${BASE_URL}/crafts` },
    { url: `${BASE_URL}/about-me` },
    { url: `${BASE_URL}/contact` },
  ];
}
