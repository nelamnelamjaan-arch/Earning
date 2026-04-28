const email = "nelamnelamjaan@gmail.com";

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-3xl border border-border bg-card p-8">
      <h1 className="text-3xl font-semibold tracking-tight">About Us</h1>
      <a href={`mailto:${email}`} className="inline-flex rounded-full border border-border px-5 py-2 font-medium hover:border-sky-500">
        {email}
      </a>
    </section>
  );
}
