import Script from "next/script";

export function NativeAdBanner() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-4 text-center">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        Advertisement
      </p>
      <Script
        async
        data-cfasync="false"
        src="https://pl29279759.profitablecpmratenetwork.com/ed824a680c13ab75a20adf304fb804a6/invoke.js"
        strategy="afterInteractive"
      />
      <div id="container-ed824a680c13ab75a20adf304fb804a6" />
    </div>
  );
}
