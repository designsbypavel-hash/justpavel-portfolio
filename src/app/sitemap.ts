import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.justpaveldesign.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/mentoring`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/youtube`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...projectRoutes];
}
