export type StoreProduct = {
  slug: string;
  title: string;
  type: string;
  price: string;
  description: string;
};

export const storeProducts: StoreProduct[] = [
  {
    slug: "premium-seo-content-calendar",
    title: "Premium SEO Content Calendar",
    type: "Template",
    price: "$29",
    description:
      "A production-ready Notion and spreadsheet workflow for planning and scaling SEO content.",
  },
  {
    slug: "nextjs-utility-snippet-pack",
    title: "Next.js Utility Snippet Pack",
    type: "Code Snippets",
    price: "$39",
    description:
      "Reusable TypeScript snippets for auth flows, API utilities, validation, and UI patterns.",
  },
  {
    slug: "freelancer-proposal-bundle",
    title: "Freelancer Proposal Bundle",
    type: "Template",
    price: "$19",
    description:
      "Clean proposal, pricing, and scope templates to help close web development and SEO clients.",
  },
  {
    slug: "technical-seo-audit-checklist",
    title: "Technical SEO Audit Checklist",
    type: "Guide + Template",
    price: "$24",
    description:
      "Detailed checklist and scoring sheet for performing site audits professionally.",
  },
];

export function getStoreProductBySlug(slug: string) {
  return storeProducts.find((product) => product.slug === slug) ?? null;
}
