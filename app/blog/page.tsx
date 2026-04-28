import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">SEO Articles</h1>
      <p className="max-w-2xl text-muted">
        MDX-powered publishing built for a 50+ article library with scalable slug routing.
      </p>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10"
          >
            <p className="text-xs text-muted">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-muted">{post.description}</p>
            <span className="mt-4 inline-flex text-sm font-medium text-sky-600 transition-transform group-hover:translate-x-1">
              Read More →
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Write For Us</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Accepting high-quality guest posts and sponsored content opportunities in SEO,
          development, digital business, and tools. Share your pitch and publishing goals.
        </p>
        <Link
          href="/write-for-us"
          className="mt-4 inline-flex rounded-full border border-border px-5 py-2 text-sm font-medium hover:border-sky-500"
        >
          Open Guest Post Details
        </Link>
      </div>
    </section>
  );
}
