"use client";

import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const exampleMessage =
  "Hi! I found your VIP earning tools and want to learn more.";

function cleanPhoneNumber(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function WhatsAppDirectTool() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const cleanedPhone = useMemo(() => cleanPhoneNumber(phone), [phone]);
  const whatsappUrl = useMemo(() => {
    const query = message.trim()
      ? `?text=${encodeURIComponent(message.trim())}`
      : "";

    return cleanedPhone ? `https://wa.me/${cleanedPhone}${query}` : "";
  }, [cleanedPhone, message]);

  const openChat = () => {
    if (!whatsappUrl) return;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const useExample = () => {
    setPhone("+1 555 123 4567");
    setMessage(exampleMessage);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-white/15 p-6 shadow-2xl shadow-emerald-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
      <div className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-200">
            <FaWhatsapp className="text-base" aria-hidden="true" />
            VIP WhatsApp Direct
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Open WhatsApp chats without saving contacts
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Enter a country-code phone number, write your message, and launch
              a clean WhatsApp chat instantly. Perfect for sales, support, VIP
              leads, and fast follow-ups.
            </p>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              Phone number with country code
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+92 300 1234567"
                inputMode="tel"
                className="rounded-2xl border border-white/30 bg-white/60 px-4 py-3 text-base outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-slate-950/50"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type your VIP message here..."
                className="min-h-32 rounded-2xl border border-white/30 bg-white/60 px-4 py-3 text-base outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-slate-950/50"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openChat}
              disabled={!whatsappUrl}
              className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <FaWhatsapp className="text-lg" aria-hidden="true" />
              Open WhatsApp Chat
            </button>
            <button
              type="button"
              onClick={useExample}
              className="rounded-full border border-white/30 bg-white/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-white/60 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              Use VIP Example
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/25 bg-slate-950/90 p-5 text-emerald-50 shadow-2xl shadow-slate-950/25 dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Live Preview
          </p>
          <div className="mt-5 space-y-4 rounded-2xl bg-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-emerald-500 text-xl">
                <FaWhatsapp aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">WhatsApp Direct</p>
                <p className="text-xs text-emerald-100/70">
                  {cleanedPhone || "Waiting for phone number"}
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm text-white">
              {message.trim() || "Your message preview will appear here."}
            </div>
          </div>
          <p className="mt-5 text-xs leading-6 text-emerald-100/70">
            Tip: include the country code and remove local leading zeros when
            needed. The tool never stores your number or message.
          </p>
        </div>
      </div>
    </div>
  );
}
