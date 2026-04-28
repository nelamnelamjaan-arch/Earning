import Link from "next/link";
import { tools } from "@/lib/tools";
import { ToolIcon } from "@/components/tools/tool-icon";

export default function ToolsIndexPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Professional Web Tools</h1>
      <p className="max-w-2xl text-muted">
        Modular architecture for 50+ production-grade utilities under one unified design system.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-2xl border border-border bg-card p-6 hover:border-sky-500"
          >
            <p className="inline-flex items-center gap-2 text-xs text-muted">
              <ToolIcon category={tool.category} />
              {tool.category}
            </p>
            <h2 className="mt-2 text-xl font-semibold">{tool.name}</h2>
            <p className="mt-2 text-muted">{tool.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
