import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_280px]">
      <article className="rounded-3xl border border-border bg-card p-8">
        <div className="rounded-xl border border-dashed border-border bg-background p-3 text-center text-xs font-medium text-muted">
          [AdSense Top]
        </div>
        <p className="mt-5 text-sm text-muted">{post.date}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-muted">{post.description}</p>
        <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
          <MDXRemote source={post.content} />
        </div>
        <div className="mt-8 rounded-xl border border-dashed border-border bg-background p-3 text-center text-xs font-medium text-muted">
          [AdSense Bottom]
        </div>
      </article>
      <aside className="h-fit rounded-3xl border border-border bg-card p-5">
        <div className="rounded-xl border border-dashed border-border bg-background p-6 text-center text-xs font-medium text-muted">
          [AdSense Sidebar]
        </div>
      </aside>
    </div>
  );
}
