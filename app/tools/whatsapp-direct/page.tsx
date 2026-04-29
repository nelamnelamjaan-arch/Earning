import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppDirectTool } from "@/components/tools/whatsapp-direct-tool";

export const metadata: Metadata = {
  title: "WhatsApp Direct Tool | Earning Pro Platform",
  description:
    "Open WhatsApp chats without saving contacts using a VIP-style direct message tool.",
};

export default function WhatsAppDirectPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-slate-950/5 sm:p-8">
        <Link
          href="/tools"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Back to tools
        </Link>
        <div className="mt-6 max-w-3xl space-y-4">
          <p className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-200">
            VIP Communication Tool
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            WhatsApp Direct Chat Generator
          </h1>
          <p className="text-base leading-8 text-muted">
            Create a WhatsApp chat link from any phone number and message.
            Launch conversations instantly without saving the contact first.
          </p>
        </div>
      </div>

      <WhatsAppDirectTool />
    </section>
  );
}
