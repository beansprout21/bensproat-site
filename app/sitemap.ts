import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/jsonld";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/ventures",
  "/hire",
  "/projects",
  "/resume",
  "/contact",
  "/links",
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
