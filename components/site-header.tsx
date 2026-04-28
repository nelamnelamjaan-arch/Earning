import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Earning Pro
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/blog" className="text-muted hover:text-foreground">
            Blog
          </Link>
          <Link href="/store" className="text-muted hover:text-foreground">
            Store
          </Link>
          <Link href="/write-for-us" className="text-muted hover:text-foreground">
            Write For Us
          </Link>
          <Link href="/tools" className="text-muted hover:text-foreground">
            Tools
          </Link>
          <Link href="/contact" className="text-muted hover:text-foreground">
            Contact
          </Link>
          <Link href="/about" className="text-muted hover:text-foreground">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
