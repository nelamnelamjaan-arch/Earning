import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { storeProducts } from "@/lib/store-products";
import { tools } from "@/lib/tools";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://earning-gamma.vercel.app"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/store",
    "/tools",
    "/write-for-us",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  })) satisfies MetadataRoute.Sitemap;

  const toolRoutes = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const storeRoutes = storeProducts.map((product) => ({
    url: `${siteUrl}/store/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticRoutes, ...blogRoutes, ...toolRoutes, ...storeRoutes];
}
