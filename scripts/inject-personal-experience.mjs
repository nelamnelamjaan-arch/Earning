import fs from "node:fs";
import path from "node:path";

const blogDir = path.join(process.cwd(), "content", "blog");

const entries = [
  ["01-technical-seo-audit-checklist", "During my own MERN stack project audits, I learned that even a small metadata error can completely tank your rankings."],
  ["03-on-page-seo-best-practices", "After manually optimizing over 50 pages, I've found that these specific tweaks are the most effective for improving dwell time."],
  ["04-internal-linking-strategy-guide", "I saw a 30% boost in organic traffic simply by restructuring my internal links to be more logical."],
  ["06-structured-data-implementation-basics", "Manually coding JSON-LD schema was challenging at first, but seeing 'Rich Results' appear in search made the effort 100% worth it."],
  ["05-core-web-vitals-optimization-guide", "My site was flagging for LCP; after aggressive image compression and code cleanup, I saw a noticeable jump in my rankings."],
  ["41-mobile-first-indexing-checklist", "Noticing that 80% of my audience visits via mobile, I redesigned my entire UI to be mobile-first from the ground up."],
  ["44-site-taxonomy-design-for-seo", "Simplifying my site architecture significantly reduced the time it takes for Google bots to crawl my new pages."],
  ["24-crawl-budget-optimization-guide", "I once accidentally blocked my own main page; that's when I truly realized the critical importance of a correct Robots.txt file."],
  ["42-canonical-tags-best-practices", "To resolve duplicate content issues on my dev projects, I implemented canonical tags, which successfully protected my site authority."],
  ["01-technical-seo-audit-checklist", "Installing a proper security certificate didn't just build user trust; I also noticed a slight, steady climb in my search rankings."],
  ["02-keyword-clustering-for-topical-authority", "I tested this clustering method on my own niche site and successfully outranked older competitors within just a few weeks."],
  ["15-search-intent-mapping-method", "I used to rank for the wrong terms until I started mapping intent; now, my conversion rates are much higher."],
  ["17-topical-map-creation-guide", "Building a topical map for my IT blog revealed several content gaps that I had previously overlooked."],
  ["18-pillar-and-cluster-model", "Adopting this structure made my site much easier to navigate for both Google and my human readers."],
  ["16-seo-content-calendar-template", "Consistency was my biggest struggle until I built this specific calendar; now I stick to a strict weekly publishing schedule."],
  ["34-entity-based-seo-explained", "When I shifted focus from keyword density to semantic topics, my organic reach expanded without needing extra backlinks."],
  ["07-content-pruning-for-seo-growth", "Last month, I deleted 20 low-performing posts, and surprisingly, my total site impressions actually increased."],
  ["20-evergreen-content-maintenance", "I spend every Sunday updating older posts because I've seen firsthand how much Google values content freshness."],
  ["37-long-tail-keyword-research", "I've found that ranking for long-tail keywords is much easier and brings in a far more loyal audience."],
  ["34-entity-based-seo-explained", "Adding contextual keywords makes my content feel deep and natural rather than AI-generated."],
  ["30-ai-content-quality-guidelines", "I use AI for initial drafts, but I've learned that adding a 20% human touch is what actually gets those posts to rank #1."],
  ["50-editorial-quality-control-seo", "Applying E-E-A-T isn't just about showing off expertise; it's about building real, transparent trust with my readers."],
  ["36-zero-click-search-opportunities", "I noticed featured snippets were eating my traffic, so I optimized for zero-click visibility to keep my brand dominant."],
  ["36-zero-click-search-opportunities", "Optimizing for voice search taught me that users ask much more conversational and specific questions when speaking."],
  ["30-ai-content-quality-guidelines", "I've updated my content to provide direct, concise answers to stay relevant within Google's new AI-driven search results."],
  ["10-programmatic-seo-strategy", "As a developer, I built a custom script to generate pages, which saved me months of manual data entry."],
  ["27-competitor-seo-research-method", "Analyzing competitor links helped me identify high-authority platforms where I could also secure quality mentions."],
  ["34-entity-based-seo-explained", "Understanding Google's BERT algorithm pushed me to make my writing style much more conversational and clear."],
  ["49-conversion-rate-optimization-for-seo", "I noticed that simply improving my page design lowered my bounce rate and naturally boosted my rankings."],
  ["05-core-web-vitals-optimization-guide", "Removing heavy plugins slashed my loading speed by 2 seconds, providing a much smoother experience for my visitors."],
  ["09-local-seo-optimization-framework", "Setting up a GMB profile for a local business in Faisalabad taught me the true power of local citations."],
  ["32-video-seo-optimization-guide", "Adding timestamps to my YouTube tutorials allowed Key Moments to appear directly in Google search results."],
  ["35-search-console-performance-analysis", "To get my tech articles into Google News, I relied on real-time indexing and staying on top of daily tech trends."],
  ["22-international-seo-hreflang-basics", "Setting up Hreflang tags taught me that search trends vary significantly from one country to another."],
  ["08-ecommerce-category-page-seo", "Adding a user reviews section to my product pages resulted in a 25% increase in my conversion rate."],
  ["13-image-seo-optimization-guide", "I used to ignore Alt text, but once I saw traffic coming from Google Images, I made it a mandatory part of my workflow."],
  ["14-link-building-with-digital-pr", "My first major guest post came from simple outreach; I've learned that real relationships are better than any paid link."],
  ["19-seo-copywriting-for-conversions", "Writing for bots is easy, but writing for buying intent is a skill I've honed through years of trial and error."],
  ["29-affiliate-seo-content-strategy", "I've learned that you can't just sell a product; you have to provide genuine value to the user first."],
  ["35-search-console-performance-analysis", "Analyzing Search Console data allowed me to identify and fix pages with high impressions but low click-through rates."],
  ["28-b2b-saas-seo-framework", "Following this specific roadmap, I took a brand-new domain to 10k monthly visitors in just six months."],
  ["30-ai-content-quality-guidelines", "SEO changes every single day, which is why I am constantly experimenting and adapting my strategies."],
  ["25-seo-reporting-dashboard-metrics", "Using GA4's event tracking has given me a much clearer understanding of my users' actual journey on my site."],
  ["14-link-building-with-digital-pr", "I've learned the hard way that one high-authority link is worth more than 100 low-quality ones."],
  ["46-serp-ctr-improvement-tactics", "Adding How-to or List formats to my titles resulted in an immediate improvement in my click-through rate."],
  ["38-link-reclamation-playbook", "Sharing content on social media didn't just bring traffic; it also helped Google index my new pages much faster."],
  ["41-mobile-first-indexing-checklist", "Learning ASO taught me how critical the right mix of keywords and professional screenshots is for app visibility."],
  ["33-blog-architecture-for-scale", "Starting a blog for my portfolio was the turning point that began bringing in international client inquiries."],
  ["47-topical-authority-measurement", "By consistently publishing quality content, I watched my site's DA grow from 0 to 25 organically."],
  ["50-editorial-quality-control-seo", "My experience has proven that keyword stuffing is dead; high-quality, helpful content is the only thing that lasts."],
];

const grouped = new Map();
for (const [slug, line] of entries) {
  grouped.set(slug, [...(grouped.get(slug) ?? []), line]);
}

let updatedFiles = 0;
let insertedLines = 0;

for (const [slug, lines] of grouped.entries()) {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Missing article for slug: ${slug}`);
    continue;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  const missingLines = lines.filter((line) => !content.includes(line));
  if (missingLines.length === 0) continue;

  const heading = "## How to use this strategy";
  const headingIndex = content.indexOf(heading);
  if (headingIndex === -1) {
    console.warn(`Missing heading in: ${slug}`);
    continue;
  }

  const paragraphStart = content.indexOf("\n\n", headingIndex) + 2;
  const paragraphEnd = content.indexOf("\n", paragraphStart);
  const insertAt = paragraphEnd === -1 ? paragraphStart : paragraphEnd + 1;

  const experienceParagraph =
    "\nFrom my own journey as an IT developer and SEO practitioner, this strategy became much more practical after real project testing. " +
    missingLines.join(" ") +
    " These firsthand lessons are why I treat this topic as a real execution system, not just a theory.\n";

  content = `${content.slice(0, insertAt)}${experienceParagraph}${content.slice(insertAt)}`;
  fs.writeFileSync(filePath, content);
  updatedFiles += 1;
  insertedLines += missingLines.length;
}

console.log(`Updated ${updatedFiles} files with ${insertedLines} personal experience lines.`);
