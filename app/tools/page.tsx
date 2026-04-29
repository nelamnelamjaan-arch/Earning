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
      <Link
        href="/tools/whatsapp-direct"
        className="block overflow-hidden rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-200">
          VIP Featured Tool
        </p>
        <h2 className="mt-3 text-2xl font-semibold">WhatsApp Direct Chat Generator</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Open WhatsApp chats instantly with a phone number and message, no contact saving required.
        </p>
      </Link>
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
