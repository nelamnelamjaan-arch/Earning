import { Storefront } from "@/components/storefront";
import { storeProducts } from "@/lib/store-products";

export default function StorePage() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-border bg-card p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-sky-600">Digital Store</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Professional digital products</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Sell templates, code assets, and practical resources in one clean storefront.
          Replace sample products with your own files, payment links, and delivery flow.
        </p>
      </div>

      <Storefront products={storeProducts} />
    </section>
  );
}
