import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getToolBySlug, tools } from "@/lib/tools";
import { ToolWorkspace } from "@/components/tools/tool-workspace";
import { getToolArticleBySlug } from "@/lib/tool-content";
import { ToolIcon } from "@/components/tools/tool-icon";

type Props = {
  params: Promise<{ "tool-name": string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ "tool-name": tool.slug }));
}

export default async function ToolPage({ params }: Props) {
  const { "tool-name": toolName } = await params;
  const tool = getToolBySlug(toolName);
  if (!tool) notFound();
  const article = getToolArticleBySlug(tool.slug);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <section className="space-y-5 rounded-3xl border border-border bg-card p-8">
        <div className="rounded-xl border border-dashed border-border bg-background p-3 text-center text-xs font-medium text-muted">
          [AdSense Top]
        </div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
          <ToolIcon category={tool.category} />
          {tool.category}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{tool.name}</h1>
        <p className="text-muted">{tool.summary}</p>
        <p className="text-sm leading-7 text-muted">{tool.seoContent}</p>
        <ToolWorkspace slug={tool.slug} />
        <div className="prose prose-slate max-w-none dark:prose-invert">
          {article ? <MDXRemote source={article} /> : null}
        </div>
        <div className="rounded-xl border border-dashed border-border bg-background p-3 text-center text-xs font-medium text-muted">
          [AdSense Bottom]
        </div>
      </section>
      <aside className="h-fit rounded-3xl border border-border bg-card p-5">
        <div className="rounded-xl border border-dashed border-border bg-background p-6 text-center text-xs font-medium text-muted">
          [AdSense Sidebar]
        </div>
      </aside>
    </div>
  );
}
