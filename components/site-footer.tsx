import Link from "next/link";

const email = "nelamnelamjaan@gmail.com";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/about" className="hover:text-foreground">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <a href={`mailto:${email}`} className="hover:text-foreground">
            {email}
          </a>
        </div>
        <p>Professional publishing and tools platform.</p>
      </div>
    </footer>
  );
}
