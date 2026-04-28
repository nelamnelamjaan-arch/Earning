import Link from "next/link";
import { notFound } from "next/navigation";
import { ManualPaymentCheckout } from "@/components/manual-payment-checkout";
import { getStoreProductBySlug, storeProducts } from "@/lib/store-products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return storeProducts.map((product) => ({ slug: product.slug }));
}

export default async function StoreProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getStoreProductBySlug(slug);

  if (!product) notFound();

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div className="space-y-6 rounded-3xl border border-border bg-card p-8">
        <Link href="/store" className="text-sm text-sky-600 hover:text-sky-500">
          ← Back to Store
        </Link>
        <p className="text-sm uppercase tracking-[0.18em] text-sky-600">
          {product.type}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{product.title}</h1>
        <p className="max-w-2xl text-muted">{product.description}</p>
        <div className="rounded-2xl border border-border bg-background p-5">
          <h2 className="text-xl font-semibold">What you get</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Instant manual order verification through WhatsApp</li>
            <li>Delivery after payment screenshot confirmation</li>
            <li>Professional digital resource for business and development use</li>
            <li>Support via the payment confirmation chat</li>
          </ul>
        </div>
      </div>

      <ManualPaymentCheckout productName={product.title} price={product.price} />
    </section>
  );
}
