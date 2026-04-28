## Earning Pro Platform

Production-ready Next.js App Router project with:

- 50 SEO blog pages (MDX)
- 50 professional web tool pages
- Dark/light UI system
- AdSense-ready placeholders in blog and tool detail layouts

## Local Development

Install dependencies and start dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build Check

Run before deployment:

```bash
npm run lint
npm run build
```

## Deployment (Vercel)

1. Push code to GitHub.
2. Import repo in [Vercel](https://vercel.com/new).
3. Use default detected Next.js settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output: auto
4. Deploy.

`vercel.json` is included for predictable defaults.

## Deployment (Netlify)

1. Push code to GitHub.
2. Import repo in Netlify.
3. Netlify will read `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Next.js plugin: `@netlify/plugin-nextjs`
4. Deploy.

## Environment Variables

No required environment variables are needed for baseline launch.

If you later add analytics, email, ad IDs, or APIs, configure them in:

- Vercel Project Settings -> Environment Variables
- Netlify Site Settings -> Environment Variables

## GitHub Push Quick Guide

After Git is installed on your machine:

```bash
git init
git add .
git commit -m "Initial production-ready setup"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
