import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://euphoric-disorder-eight.vercel.app";
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/product`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
