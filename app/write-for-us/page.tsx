const email = "nelamnelamjaan@gmail.com";

export default function WriteForUsPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 rounded-3xl border border-border bg-card p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Write For Us (Guest Posts)</h1>
      <p className="text-muted">
        We accept high-quality, original guest posts in SEO, web development, business
        growth, digital tools, and productivity systems. Sponsored and paid placements
        are available for relevant professional content.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-5">
          <h2 className="text-lg font-semibold">Submission Guidelines</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Original English content only</li>
            <li>Minimum 1000 words with practical value</li>
            <li>Clear H2 and H3 heading structure</li>
            <li>No duplicate, spun, or AI-spam articles</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5">
          <h2 className="text-lg font-semibold">Paid Guest Post Info</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Do-follow sponsored placements available</li>
            <li>Editorial review before publishing</li>
            <li>Relevant niche links only</li>
            <li>Fast response for serious inquiries</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-5">
        <h2 className="text-lg font-semibold">Pitch Your Article</h2>
        <p className="mt-2 text-sm text-muted">
          Send your topic idea, outline, and publication goals to:
        </p>
        <a
          href={`mailto:${email}`}
          className="mt-4 inline-flex rounded-full border border-border px-5 py-2 font-medium hover:border-sky-500"
        >
          {email}
        </a>
      </div>
    </section>
  );
}
