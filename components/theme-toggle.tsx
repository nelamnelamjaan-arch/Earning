"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <button
        className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
        type="button"
        disabled
      >
        Theme
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-sky-500"
      aria-label="Toggle dark and light mode"
      type="button"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
