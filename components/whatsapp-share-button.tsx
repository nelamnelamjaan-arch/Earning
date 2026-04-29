"use client";

import { FaWhatsapp } from "react-icons/fa";

const SHARE_MESSAGE = "Check out these amazing VIP Earning Tools!";

export function WhatsAppShareButton() {
  const handleShare = () => {
    const text = encodeURIComponent(`${SHARE_MESSAGE} ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share this page on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full border border-white/30 bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-950 shadow-2xl shadow-emerald-900/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500/30 hover:shadow-emerald-500/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:border-white/10 dark:bg-emerald-400/15 dark:text-emerald-50 dark:hover:bg-emerald-400/25"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-lg shadow-emerald-700/30">
        <FaWhatsapp aria-hidden="true" />
      </span>
      <span className="hidden pr-1 sm:inline">Share on WhatsApp</span>
    </button>
  );
}
