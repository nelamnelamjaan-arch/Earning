const email = "nelamnelamjaan@gmail.com";

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-card p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-muted">
        For partnerships, support, or editorial inquiries, use the email below.
      </p>
      <a
        href={`mailto:${email}`}
        className="mt-6 inline-flex rounded-full border border-border px-5 py-3 font-medium hover:border-sky-500"
      >
        {email}
      </a>
    </section>
  );
}
