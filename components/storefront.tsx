"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ManualPaymentCheckout } from "@/components/manual-payment-checkout";
import type { StoreProduct } from "@/lib/store-products";

type StorefrontProps = {
  products: StoreProduct[];
};

export function Storefront({ products }: StorefrontProps) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const handleBuyNow = (product: StoreProduct) => {
    setSelectedProduct(product);
    window.setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10"
          >
            <p className="text-xs text-muted">{product.type}</p>
            <h2 className="mt-2 text-xl font-semibold">{product.title}</h2>
            <p className="mt-2 text-sm text-muted">{product.description}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-lg font-semibold">{product.price}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleBuyNow(product)}
                  className="rounded-full border border-sky-500 bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
                >
                  Buy Now
                </button>
                <Link
                  href={`/store/${product.slug}`}
                  className="rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-sky-500"
                >
                  Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div ref={checkoutRef} id="checkout" className="scroll-mt-28">
        <ManualPaymentCheckout
          productName={selectedProduct.title}
          price={selectedProduct.price}
        />
      </div>
    </div>
  );
}
