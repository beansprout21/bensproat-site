import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/jsonld";

// /links is noindexed (#29), so it stays out. No lastModified: the repo has
// no trustworthy per-page dates (docs/brief-c5.md 3).
const STATIC_ROUTES = [
  "/",
  "/about",
  "/ventures",
  "/hire",
  "/projects",
  "/resume",
  "/contact",
  "/now",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = getProjects().map(
    (project) => `/projects/${project.slug}`,
  );

  return [...STATIC_ROUTES, ...projectRoutes].map((route) => ({
    url: new URL(route, SITE_URL).toString(),
  }));
}
