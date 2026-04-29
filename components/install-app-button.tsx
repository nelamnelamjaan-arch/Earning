"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandaloneMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandaloneMode);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setInstalled(true);
    }

    setInstallPrompt(null);
  };

  if (installed || !installPrompt) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={installApp}
      className="mt-6 inline-flex md:hidden items-center gap-3 rounded-full border border-white/30 bg-white/20 px-5 py-3 text-sm font-semibold text-foreground shadow-xl shadow-emerald-950/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/30 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-700/30">
        EP
      </span>
      Install App
    </button>
  );
}
