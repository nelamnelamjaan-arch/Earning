import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { tools } from "@/lib/tools";
import { NativeAdBanner } from "@/components/native-ad-banner";

export default function Home() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Premium Platform</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Scalable blog and professional tools architecture for 50+ pages.
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Built with Next.js App Router, MDX content management, and a high-end
          dark/light visual system.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Articles</h2>
          <Link href="/blog" className="text-sm text-sky-600 hover:text-sky-500">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10"
            >
              <p className="text-xs text-muted">{post.date}</p>
              <h3 className="mt-2 font-semibold">{post.title}</h3>
              <p className="mt-2 text-sm text-muted">{post.description}</p>
              <span className="mt-4 inline-flex text-sm font-medium text-sky-600 transition-transform group-hover:translate-x-1">
                Read More →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Tools</h2>
          <Link href="/tools" className="text-sm text-sky-600 hover:text-sky-500">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {tools.slice(0, 3).map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-2xl border border-border bg-card p-5 hover:border-sky-500"
            >
              <p className="text-xs text-muted">{tool.category}</p>
              <h3 className="mt-2 font-semibold">{tool.name}</h3>
              <p className="mt-2 text-sm text-muted">{tool.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <NativeAdBanner />
    </div>
  );
}
