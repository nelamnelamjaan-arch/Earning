"use client";

import { useMemo, useState } from "react";

type Values = Record<string, string>;
type ToolConfig = {
  fields: { id: string; label: string; type?: "number" | "textarea" | "text" }[];
  run: (values: Values) => string | Promise<string>;
  example: Values;
};

const toNum = (v: string) => Number.parseFloat(v || "0");
const slugify = (v: string) => v.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const configs: Record<string, ToolConfig> = {
  "jwt-decoder": { fields: [{ id: "token", label: "JWT Token", type: "textarea" }], run: ({ token }) => { try { const [h, p, s] = token.split("."); const d = (part: string) => JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "="))); return `Header:\n${JSON.stringify(d(h), null, 2)}\n\nPayload:\n${JSON.stringify(d(p), null, 2)}\n\nSignature length: ${s?.length ?? 0}`; } catch { return "Invalid token."; } }, example: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiQXBpIFVzZXIiLCJyb2xlIjoiYWRtaW4ifQ.dGVzdHNpZw" } },
  "json-formatter": { fields: [{ id: "json", label: "JSON", type: "textarea" }], run: ({ json }) => JSON.stringify(JSON.parse(json), null, 2), example: { json: '{"project":"Earning Pro","features":["tools","blog"],"active":true}' } },
  "base64-encoder-decoder": { fields: [{ id: "text", label: "Text/Base64", type: "textarea" }], run: ({ text }) => { const encoded = btoa(unescape(encodeURIComponent(text))); let decoded = ""; try { decoded = decodeURIComponent(escape(atob(text || ""))); } catch { decoded = "Input is not valid Base64 for decode."; } return `Encoded:\n${encoded}\n\nDecoded:\n${decoded}`; }, example: { text: "Professional web tools platform" } },
  "url-encoder-decoder": { fields: [{ id: "text", label: "URL Text", type: "textarea" }], run: ({ text }) => { let decoded = ""; try { decoded = decodeURIComponent(text || ""); } catch { decoded = "Invalid encoded URL string."; } return `Encoded:\n${encodeURIComponent(text)}\n\nDecoded:\n${decoded}`; }, example: { text: "utm_source=google ads&campaign=seo growth" } },
  "uuid-generator": { fields: [{ id: "count", label: "Count", type: "number" }], run: ({ count }) => Array.from({ length: Math.max(1, Math.min(20, Math.floor(toNum(count) || 1))) }, () => crypto.randomUUID()).join("\n"), example: { count: "5" } },
  "password-generator": { fields: [{ id: "length", label: "Length", type: "number" }], run: ({ length }) => { const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*"; const len = Math.max(8, Math.min(64, Math.floor(toNum(length) || 16))); return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(""); }, example: { length: "20" } },
  "hash-generator": { fields: [{ id: "text", label: "Text", type: "textarea" }], run: async ({ text }) => { const bytes = new TextEncoder().encode(text); const hash = async (algo: "SHA-256" | "SHA-384" | "SHA-512") => { const digest = await crypto.subtle.digest(algo, bytes); return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join(""); }; return `SHA-256: ${await hash("SHA-256")}\n\nSHA-384: ${await hash("SHA-384")}\n\nSHA-512: ${await hash("SHA-512")}`; }, example: { text: "secure-input-value" } },
  "unix-timestamp-converter": { fields: [{ id: "value", label: "Timestamp or ISO Date" }], run: ({ value }) => (/^\d+$/.test(value.trim()) ? new Date(Number(value) * 1000).toISOString() : String(Math.floor(new Date(value).getTime() / 1000))), example: { value: "1713936600" } },
  "color-converter": { fields: [{ id: "hex", label: "HEX Color" }], run: ({ hex }) => { const clean = hex.replace("#", ""); if (!/^[0-9a-fA-F]{6}$/.test(clean)) return "Invalid HEX"; const n = Number.parseInt(clean, 16); const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return `rgb(${r}, ${g}, ${b})\nhsl(${Math.round((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI + 360) % 360}, calculated, calculated)`; }, example: { hex: "#2563eb" } },
  "slug-generator": { fields: [{ id: "text", label: "Input Text", type: "textarea" }], run: ({ text }) => slugify(text), example: { text: "How to Build SEO Tool Pages in 2026" } },
  "roi-calculator": { fields: [{ id: "gain", label: "Net Gain", type: "number" }, { id: "cost", label: "Cost", type: "number" }], run: ({ gain, cost }) => `${((toNum(gain) - toNum(cost)) / toNum(cost || "1") * 100).toFixed(2)}% ROI`, example: { gain: "15000", cost: "8000" } },
  "invoice-generator": { fields: [{ id: "client", label: "Client" }, { id: "items", label: "Items (name:amount)", type: "textarea" }], run: ({ client, items }) => { const lines = items.split("\n").filter(Boolean); const rows = lines.map((l) => { const [n, a] = l.split(":"); return { n: n?.trim() ?? "", a: toNum(a ?? "0") }; }); const total = rows.reduce((s, r) => s + r.a, 0); return `Invoice for ${client}\n${rows.map((r, i) => `${i + 1}. ${r.n} - ${r.a.toFixed(2)}`).join("\n")}\nTotal: ${total.toFixed(2)}`; }, example: { client: "Acme Media", items: "SEO Audit:500\nTool Integration:750\nTechnical Support:250" } },
  "loan-repayment-planner": { fields: [{ id: "principal", label: "Principal", type: "number" }, { id: "rate", label: "Annual Rate %", type: "number" }, { id: "years", label: "Years", type: "number" }], run: ({ principal, rate, years }) => { const p = toNum(principal); const r = toNum(rate) / 1200; const n = toNum(years) * 12; const m = p * r / (1 - (1 + r) ** -n); return `Monthly: ${m.toFixed(2)}\nTotal Paid: ${(m * n).toFixed(2)}\nTotal Interest: ${(m * n - p).toFixed(2)}`; }, example: { principal: "250000", rate: "8.5", years: "20" } },
  "profit-margin-analyzer": { fields: [{ id: "revenue", label: "Revenue", type: "number" }, { id: "cost", label: "Cost", type: "number" }], run: ({ revenue, cost }) => `${(((toNum(revenue) - toNum(cost)) / toNum(revenue || "1")) * 100).toFixed(2)}% margin`, example: { revenue: "10000", cost: "6400" } },
  "seo-meta-builder": { fields: [{ id: "keyword", label: "Primary Keyword" }, { id: "brand", label: "Brand" }], run: ({ keyword, brand }) => `Title: ${keyword} | ${brand}\nDescription: Learn ${keyword} with practical steps, technical background, and performance-focused guidance.\nH1: ${keyword}`, example: { keyword: "JSON Formatter Tool", brand: "Earning Pro" } },
  "word-counter": { fields: [{ id: "text", label: "Text", type: "textarea" }], run: ({ text }) => `Words: ${text.trim().split(/\s+/).filter(Boolean).length}\nCharacters: ${text.length}\nParagraphs: ${text.split(/\n\s*\n/).filter(Boolean).length}`, example: { text: "Professional content requires clear structure and measurable readability.\n\nThis sentence helps estimate paragraphs and words." } },
  "case-converter": { fields: [{ id: "text", label: "Text", type: "textarea" }], run: ({ text }) => `UPPER: ${text.toUpperCase()}\nLOWER: ${text.toLowerCase()}\nTitle: ${text.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase())}\nslug: ${slugify(text)}`, example: { text: "professional seo heading example" } },
  "csv-to-json": { fields: [{ id: "csv", label: "CSV", type: "textarea" }], run: ({ csv }) => { const [h, ...rows] = csv.trim().split("\n"); const headers = h.split(",").map((v) => v.trim()); return JSON.stringify(rows.filter(Boolean).map((r) => Object.fromEntries(r.split(",").map((v, i) => [headers[i], v.trim()]))), null, 2); }, example: { csv: "name,role\nAreeb,Developer\nSara,Analyst" } },
  "json-to-csv": { fields: [{ id: "json", label: "JSON Array", type: "textarea" }], run: ({ json }) => { const arr = JSON.parse(json); const keys = Object.keys(arr[0] ?? {}); return [keys.join(","), ...arr.map((o: Record<string, unknown>) => keys.map((k) => String(o[k] ?? "")).join(","))].join("\n"); }, example: { json: '[{"name":"Areeb","role":"Developer"},{"name":"Sara","role":"Analyst"}]' } },
  "http-header-inspector": { fields: [{ id: "headers", label: "Raw Headers", type: "textarea" }], run: ({ headers }) => headers.split("\n").map((l) => l.split(":")).filter((p) => p.length > 1).map(([k, ...v]) => `${k.trim()} => ${v.join(":").trim()}`).join("\n"), example: { headers: "Content-Type: application/json\nCache-Control: no-store\nX-Frame-Options: DENY" } },
  "regex-tester": {
    fields: [
      { id: "pattern", label: "Pattern" },
      { id: "flags", label: "Flags (e.g. gi)" },
      { id: "text", label: "Text", type: "textarea" },
    ],
    run: ({ pattern, flags, text }) => {
      const regex = new RegExp(pattern, flags || "g");
      const entries = Array.from(text.matchAll(regex)).map((m) => ({
        match: m[0],
        index: m.index,
        groups: m.slice(1),
      }));
      return JSON.stringify(
        {
          totalMatches: entries.length,
          matches: entries,
        },
        null,
        2,
      );
    },
    example: {
      pattern: "\\b(seo|tool)\\b",
      flags: "gi",
      text: "SEO pages and tool pages both need strong interlinking. Tool quality matters.",
    },
  },
  "html-minifier": { fields: [{ id: "html", label: "HTML", type: "textarea" }], run: ({ html }) => html.replace(/\n/g, "").replace(/\s{2,}/g, " ").replace(/>\s+</g, "><").trim(), example: { html: "<div>\n  <h1> Title </h1>\n  <p> Sample paragraph </p>\n</div>" } },
  "css-minifier": { fields: [{ id: "css", label: "CSS", type: "textarea" }], run: ({ css }) => css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim(), example: { css: "/* demo */\n.card { color: #111; padding: 16px; }\n.card h2 { font-size: 24px; }" } },
  "javascript-minifier": { fields: [{ id: "js", label: "JavaScript", type: "textarea" }], run: ({ js }) => js.replace(/\/\/.*$/gm, "").replace(/\s+/g, " ").replace(/\s*([{}();,:+\-*/=<>])\s*/g, "$1").trim(), example: { js: "// sample\nfunction add(a,b){ return a + b; }\nconsole.log(add(1,2));" } },
  "image-size-estimator": { fields: [{ id: "width", label: "Width px", type: "number" }, { id: "height", label: "Height px", type: "number" }, { id: "bpp", label: "Bits per pixel", type: "number" }], run: ({ width, height, bpp }) => `${((toNum(width) * toNum(height) * toNum(bpp || "24")) / 8 / 1024).toFixed(2)} KB (uncompressed)`, example: { width: "1920", height: "1080", bpp: "24" } },
  "reading-time-estimator": { fields: [{ id: "text", label: "Text", type: "textarea" }], run: ({ text }) => `${Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200))} min read`, example: { text: "This tool estimates reading time by using average words per minute and input length." } },
  "keyword-density-checker": { fields: [{ id: "text", label: "Text", type: "textarea" }, { id: "keyword", label: "Keyword" }], run: ({ text, keyword }) => { const words = text.toLowerCase().split(/\s+/).filter(Boolean); const matches = words.filter((w) => w.includes(keyword.toLowerCase())).length; return `${((matches / Math.max(words.length, 1)) * 100).toFixed(2)}% density\nMatches: ${matches}\nTotal words: ${words.length}`; }, example: { text: "SEO tool pages need SEO structure and technical SEO depth.", keyword: "seo" } },
  "meta-tag-preview": { fields: [{ id: "title", label: "Title" }, { id: "description", label: "Description", type: "textarea" }], run: ({ title, description }) => `${title.slice(0, 60)}\n${description.slice(0, 160)}\n\nLengths => title: ${title.length}, description: ${description.length}`, example: { title: "Best JSON Formatter Tool for Developers", description: "Format and validate JSON instantly with structured output, copy controls, and technical guidance." } },
  "open-graph-generator": { fields: [{ id: "title", label: "Title" }, { id: "description", label: "Description", type: "textarea" }, { id: "url", label: "URL" }], run: ({ title, description, url }) => `<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${description}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:type" content="website" />`, example: { title: "Professional SEO Tools", description: "Advanced online utilities for developers and marketers.", url: "https://example.com/tools" } },
  "email-subject-line-grader": { fields: [{ id: "subject", label: "Subject" }], run: ({ subject }) => { const score = Math.max(1, Math.min(100, 100 - Math.abs(subject.length - 45))); const urgency = /\b(now|today|urgent|limited)\b/i.test(subject) ? 10 : 0; const clarity = /\b(guide|report|strategy|update|plan)\b/i.test(subject) ? 10 : 0; return `Score: ${Math.min(100, score + urgency + clarity)}/100\nLength: ${subject.length}\nSuggestion: keep between 35 and 55 characters.`; }, example: { subject: "SEO Strategy Update: Improve Rankings This Week" } },
  "utm-builder": { fields: [{ id: "url", label: "Base URL" }, { id: "source", label: "Source" }, { id: "medium", label: "Medium" }, { id: "campaign", label: "Campaign" }], run: ({ url, source, medium, campaign }) => `${url}?utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`, example: { url: "https://example.com/pricing", source: "google", medium: "cpc", campaign: "spring-growth" } },
  "break-even-calculator": { fields: [{ id: "fixed", label: "Fixed Cost", type: "number" }, { id: "price", label: "Price/Unit", type: "number" }, { id: "variable", label: "Variable Cost/Unit", type: "number" }], run: ({ fixed, price, variable }) => `${(toNum(fixed) / Math.max(toNum(price) - toNum(variable), 1)).toFixed(2)} units`, example: { fixed: "5000", price: "75", variable: "25" } },
  "gross-margin-calculator": { fields: [{ id: "revenue", label: "Revenue", type: "number" }, { id: "cogs", label: "COGS", type: "number" }], run: ({ revenue, cogs }) => `${(((toNum(revenue) - toNum(cogs)) / Math.max(toNum(revenue), 1)) * 100).toFixed(2)}%`, example: { revenue: "40000", cogs: "23000" } },
  "net-profit-calculator": { fields: [{ id: "revenue", label: "Revenue", type: "number" }, { id: "expenses", label: "Expenses", type: "number" }], run: ({ revenue, expenses }) => `${(toNum(revenue) - toNum(expenses)).toFixed(2)}`, example: { revenue: "40000", expenses: "26500" } },
  "commission-calculator": { fields: [{ id: "sales", label: "Sales", type: "number" }, { id: "rate", label: "Rate %", type: "number" }], run: ({ sales, rate }) => `${(toNum(sales) * toNum(rate) / 100).toFixed(2)}`, example: { sales: "15000", rate: "7.5" } },
  "vat-calculator": { fields: [{ id: "amount", label: "Amount", type: "number" }, { id: "vat", label: "VAT %", type: "number" }], run: ({ amount, vat }) => `With VAT: ${(toNum(amount) * (1 + toNum(vat) / 100)).toFixed(2)}\nVAT Value: ${(toNum(amount) * toNum(vat) / 100).toFixed(2)}`, example: { amount: "1000", vat: "15" } },
  "discount-calculator": { fields: [{ id: "price", label: "Original Price", type: "number" }, { id: "discount", label: "Discount %", type: "number" }], run: ({ price, discount }) => `${(toNum(price) * (1 - toNum(discount) / 100)).toFixed(2)}`, example: { price: "250", discount: "20" } },
  "markup-calculator": { fields: [{ id: "cost", label: "Cost", type: "number" }, { id: "markup", label: "Markup %", type: "number" }], run: ({ cost, markup }) => `${(toNum(cost) * (1 + toNum(markup) / 100)).toFixed(2)}`, example: { cost: "120", markup: "35" } },
  "percentage-calculator": { fields: [{ id: "part", label: "Part", type: "number" }, { id: "whole", label: "Whole", type: "number" }], run: ({ part, whole }) => `${((toNum(part) / Math.max(toNum(whole), 1)) * 100).toFixed(2)}%`, example: { part: "45", whole: "180" } },
  "unit-converter": { fields: [{ id: "meters", label: "Meters", type: "number" }], run: ({ meters }) => `${toNum(meters).toFixed(2)} m\n${(toNum(meters) * 3.28084).toFixed(2)} ft\n${(toNum(meters) * 39.3701).toFixed(2)} in\n${(toNum(meters) * 100).toFixed(2)} cm`, example: { meters: "12.5" } },
  "speed-converter": { fields: [{ id: "kmh", label: "km/h", type: "number" }], run: ({ kmh }) => `${(toNum(kmh) * 0.621371).toFixed(2)} mph\n${(toNum(kmh) / 3.6).toFixed(2)} m/s\n${(toNum(kmh) * 0.539957).toFixed(2)} knots`, example: { kmh: "88" } },
  "bmi-calculator": { fields: [{ id: "kg", label: "Weight (kg)", type: "number" }, { id: "cm", label: "Height (cm)", type: "number" }], run: ({ kg, cm }) => { const bmi = toNum(kg) / ((toNum(cm) / 100) ** 2); const status = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese"; return `${bmi.toFixed(2)} BMI (${status})`; }, example: { kg: "72", cm: "175" } },
  "calorie-needs-estimator": { fields: [{ id: "kg", label: "Weight (kg)", type: "number" }, { id: "cm", label: "Height (cm)", type: "number" }, { id: "age", label: "Age", type: "number" }], run: ({ kg, cm, age }) => `${(10 * toNum(kg) + 6.25 * toNum(cm) - 5 * toNum(age) + 5).toFixed(0)} kcal/day (baseline)`, example: { kg: "72", cm: "175", age: "30" } },
  "mortgage-calculator": { fields: [{ id: "loan", label: "Loan Amount", type: "number" }, { id: "rate", label: "Annual Rate %", type: "number" }, { id: "years", label: "Years", type: "number" }], run: ({ loan, rate, years }) => { const p = toNum(loan); const r = toNum(rate) / 1200; const n = toNum(years) * 12; const m = p * r / (1 - (1 + r) ** -n); return `${m.toFixed(2)} / month\nTotal: ${(m * n).toFixed(2)}`; }, example: { loan: "300000", rate: "7.2", years: "25" } },
  "compound-interest-calculator": { fields: [{ id: "principal", label: "Principal", type: "number" }, { id: "rate", label: "Rate %", type: "number" }, { id: "years", label: "Years", type: "number" }], run: ({ principal, rate, years }) => `${(toNum(principal) * (1 + toNum(rate) / 100) ** toNum(years)).toFixed(2)}`, example: { principal: "10000", rate: "12", years: "5" } },
  "savings-goal-planner": { fields: [{ id: "goal", label: "Goal Amount", type: "number" }, { id: "months", label: "Months", type: "number" }], run: ({ goal, months }) => `${(toNum(goal) / Math.max(toNum(months), 1)).toFixed(2)} per month`, example: { goal: "24000", months: "12" } },
  "debt-snowball-planner": { fields: [{ id: "debts", label: "Debts newline: name:amount", type: "textarea" }], run: ({ debts }) => debts.split("\n").filter(Boolean).map((l) => l.split(":")).sort((a, b) => toNum(a[1]) - toNum(b[1])).map(([n, v], i) => `${i + 1}. ${n} - ${toNum(v).toFixed(2)}`).join("\n"), example: { debts: "Card A:900\nCard B:2500\nLoan C:4200" } },
  "time-zone-converter": { fields: [{ id: "datetime", label: "DateTime (ISO)" }, { id: "zone", label: "Target Timezone (e.g. Asia/Karachi)" }], run: ({ datetime, zone }) => new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long", timeZone: zone || "UTC" }).format(new Date(datetime)), example: { datetime: "2026-04-24T12:00:00Z", zone: "Asia/Karachi" } },
  "pomodoro-timer": { fields: [{ id: "minutes", label: "Focus Minutes", type: "number" }, { id: "cycles", label: "Cycles", type: "number" }], run: ({ minutes, cycles }) => { const m = Math.max(1, toNum(minutes) || 25); const c = Math.max(1, Math.floor(toNum(cycles) || 4)); return Array.from({ length: c }, (_, i) => `Cycle ${i + 1}: Focus ${m} min, Break ${i === c - 1 ? 0 : 5} min`).join("\n"); }, example: { minutes: "25", cycles: "4" } },
  "task-priority-matrix": { fields: [{ id: "task", label: "Task" }, { id: "urgency", label: "Urgency 1-10", type: "number" }, { id: "importance", label: "Importance 1-10", type: "number" }], run: ({ task, urgency, importance }) => { const u = toNum(urgency), i = toNum(importance); const q = u >= 7 && i >= 7 ? "Do Now" : u < 7 && i >= 7 ? "Schedule" : u >= 7 ? "Delegate" : "Eliminate"; return `${task}: ${q}`; }, example: { task: "Publish technical SEO update", urgency: "8", importance: "9" } },
  "meeting-agenda-builder": { fields: [{ id: "topic", label: "Meeting Topic" }, { id: "goals", label: "Goals", type: "textarea" }], run: ({ topic, goals }) => `Agenda: ${topic}\n1. Opening\n2. Goals\n${goals.split("\n").filter(Boolean).map((g, i) => `${i + 3}. ${g}`).join("\n")}\nFinal: Action items`, example: { topic: "Q2 SEO Roadmap", goals: "Review traffic gaps\nApprove tool backlog\nAssign publishing owners" } },
  "character-counter": { fields: [{ id: "text", label: "Text", type: "textarea" }], run: ({ text }) => `Characters: ${text.length}\nWithout spaces: ${text.replace(/\s/g, "").length}`, example: { text: "Character counter for SEO title and meta length checks." } },
  "headline-analyzer": { fields: [{ id: "headline", label: "Headline" }], run: ({ headline }) => { const words = headline.split(/\s+/).filter(Boolean).length; const score = Math.max(1, Math.min(100, 70 + (words >= 6 && words <= 12 ? 20 : 0))); return `Score: ${score}\nWord Count: ${words}`; }, example: { headline: "Professional JSON Formatter for Developers and SEO Teams" } },
  "link-extractor": { fields: [{ id: "html", label: "HTML", type: "textarea" }], run: ({ html }) => Array.from(html.matchAll(/href=["']([^"']+)["']/g)).map((m) => m[1]).join("\n") || "No links found.", example: { html: '<a href="https://example.com">One</a><a href="/pricing">Two</a>' } },
  "word-frequency-analyzer": { fields: [{ id: "text", label: "Text", type: "textarea" }], run: ({ text }) => Object.entries(text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean).reduce<Record<string, number>>((a, w) => ((a[w] = (a[w] || 0) + 1), a), {})).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w, c]) => `${w}: ${c}`).join("\n"), example: { text: "SEO tools need strong SEO content and strong technical content for ranking." } },
  "sitemap-validator": {
    fields: [{ id: "xml", label: "Sitemap XML", type: "textarea" }],
    run: ({ xml }) => {
      const parsed = new DOMParser().parseFromString(xml, "application/xml");
      const parserError = parsed.querySelector("parsererror");
      if (parserError) return `Invalid XML: ${parserError.textContent?.trim() ?? "Parser error"}`;

      const urlset = parsed.querySelector("urlset");
      const sitemapIndex = parsed.querySelector("sitemapindex");
      if (!urlset && !sitemapIndex) return "Invalid sitemap: missing <urlset> or <sitemapindex> root.";

      const urls = parsed.querySelectorAll("url > loc");
      const sitemaps = parsed.querySelectorAll("sitemap > loc");
      const list = [...urls, ...sitemaps].map((node) => node.textContent?.trim()).filter(Boolean);
      if (list.length === 0) return "Invalid sitemap: no <loc> entries found.";
      const invalid = list.filter((entry) => {
        try {
          const u = new URL(entry ?? "");
          return !/^https?:$/.test(u.protocol);
        } catch {
          return true;
        }
      });
      return invalid.length
        ? `Invalid URLs detected (${invalid.length}).`
        : `Valid sitemap. Entries found: ${list.length}.`;
    },
    example: {
      xml: '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.com/</loc></url><url><loc>https://example.com/tools</loc></url></urlset>',
    },
  },
  "robots-txt-tester": { fields: [{ id: "robots", label: "robots.txt", type: "textarea" }, { id: "path", label: "Path to test" }], run: ({ robots, path }) => { const rules = robots.split("\n").map((l) => l.trim()); const disallow = rules.filter((r) => r.toLowerCase().startsWith("disallow:")).map((r) => r.split(":")[1]?.trim() || ""); const blocked = disallow.some((d) => d && path.startsWith(d)); return blocked ? "Blocked by robots.txt" : "Allowed by robots.txt"; }, example: { robots: "User-agent: *\nDisallow: /admin\nDisallow: /private", path: "/admin/settings" } },
};

export function ToolWorkspace({ slug }: { slug: string }) {
  const config = configs[slug];
  const [values, setValues] = useState<Values>({});
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);

  const defaults = useMemo(() => Object.fromEntries((config?.fields ?? []).map((f) => [f.id, ""])), [config]);

  if (!config) return <p className="text-sm text-muted">Tool config not found.</p>;

  const run = async () => {
    try {
      setRunning(true);
      const result = await config.run(values);
      setOutput(result);
      setError("");
    } catch {
      setError("Unable to process input. Please check values and retry.");
    } finally {
      setRunning(false);
    }
  };

  const clear = () => {
    setValues(defaults);
    setOutput("");
    setError("");
    setCopied(false);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
  };

  const example = () => {
    setValues(config.example);
    setError("");
    setCopied(false);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-background p-4">
      <div className="grid gap-3">
        {config.fields.map((field) =>
          field.type === "textarea" ? (
            <textarea
              key={field.id}
              placeholder={field.label}
              value={values[field.id] ?? ""}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              className="min-h-24 w-full rounded-xl border border-border bg-card p-3 text-sm"
            />
          ) : (
            <input
              key={field.id}
              placeholder={field.label}
              type={field.type ?? "text"}
              value={values[field.id] ?? ""}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm"
            />
          ),
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={run} className="rounded-full border border-border px-4 py-2 text-sm font-medium">
          {running ? "Running..." : "Run Tool"}
        </button>
        <button onClick={example} className="rounded-full border border-border px-4 py-2 text-sm">
          Example
        </button>
        <button onClick={copy} className="rounded-full border border-border px-4 py-2 text-sm">
          Copy
        </button>
        <button onClick={clear} className="rounded-full border border-border px-4 py-2 text-sm">
          Clear
        </button>
        {copied ? <span className="self-center text-xs text-emerald-500">Copied</span> : null}
      </div>
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      <pre className="overflow-auto rounded-xl border border-border bg-card p-3 text-xs">{output}</pre>
    </div>
  );
}
