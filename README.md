# Imara Company: website

The official website of **Imara Company Limited**, a software company based in
Bujumbura, Burundi. Live at **[imaracompany.com](https://imaracompany.com)**, in
English and French.

> *Technology built to last.* Build it. Run it. Fix it.

Imara is one team for all things software: we build websites, web apps and
mobile apps for businesses, create our own products, and keep laptops and
phones running with friendly help-desk support.

## What's on the site

**Products**
- **Afya Sync** (coming soon, Android & iOS): a daily health companion. Water,
  steps, sleep, weight & BMI, mood and energy check-ins, cycle tracking,
  blood pressure, sugar and pulse, weekly insights and streaks, in English,
  French, Swahili and Kirundi.
- **Afya Sync Band** (coming soon): a screenless smart band that works with the
  Afya Sync app. Visitors can sign up to be notified at launch.
- **Duka POS**: point of sale for shops, from a single kiosk to a chain of
  stores (sales, inventory, branches, staff, loyalty).
- **School Management System**: students, timetables, grades, report cards,
  fees and attendance for private schools, even offline.
- **Imara Pay**: pay for global subscriptions (Netflix, ChatGPT, Claude…) in
  BIF with Lumicash or EcoCash, with an order form on its page.

**Services**, each with its own detail page (why you need it, what we do,
benefits, how we work):
AI solutions & automation · Custom web development · Mobile app development ·
Help desk & IT support · Backend, APIs & DevOps · UI/UX & graphic design ·
Training & coding classes.

**Other pages**: Labs (upcoming projects such as a savings-group app and
shipment tracking, with "notify me" sign-ups) · About (story, values, team) ·
Contact · Blog · Privacy, Terms and Cookies.

**Features**
- English and French on every page (`/en/…`, `/fr/…`), chosen from the
  visitor's browser language or saved choice.
- Contact, quote and order forms that email the team (via Resend) and send the
  visitor a confirmation, with spam protection and rate limits.
- "Notify me" and newsletter sign-ups.
- WhatsApp contact links.
- Light and dark mode, mobile-first layout, accessible markup.
- SEO: per-page titles and descriptions, sitemap, structured data and
  generated social-share images.

## Tech

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript ·
Chakra UI v3 · react-hook-form + zod · Resend (email) · Upstash Redis (rate
limits, optional) · hosted on Vercel, deployed automatically from `main`.

## Run it locally

```bash
yarn install        # also regenerates Chakra theme types
cp .env.example .env.local
yarn dev            # http://localhost:3000
yarn build && yarn start
yarn typecheck && yarn lint
```

Settings go in `.env.local` (see `.env.example`). Without `RESEND_API_KEY`,
emails are printed in the terminal instead of being sent.

## Folder structure

Everything lives in `app/`. **A folder with a `page.tsx` is a page on the site**;
folders without one (components, data, lib…) are just code.

```
app/
├── [lang]/                   ← every page, once per language: /en/… and /fr/…
│   ├── layout.tsx            ← wraps every page: navbar, footer, fonts, theme
│   ├── page.tsx              ← Home                       /en  /fr
│   ├── not-found.tsx         ← 404 page
│   ├── products/
│   │   ├── page.tsx          ← Products (Afya Sync featured)
│   │   ├── duka-pos/         ← Duka POS
│   │   ├── school/           ← School Management System
│   │   └── imara-pay/        ← Imara Pay + order form
│   ├── services/             ← Services + one page per service: services/[service]/
│   ├── labs/  about/  contact/  blog/
│   └── legal/                ← privacy/  terms/  cookies/  (EN + FR text inside)
│
├── i18n/                     ← LANGUAGES
│   ├── dictionaries/en.ts    ← all English text
│   ├── dictionaries/fr.ts    ← all French text
│   └── config.ts             ← list of languages
│
├── data/                     ← site.ts (email, WhatsApp, links), products.ts, services.ts
├── components/
│   ├── navbar/  footer/      ← top bar (with EN/FR switch) and footer
│   ├── sections/             ← big page blocks: Hero, CTASection, ContactSection…
│   ├── shared/               ← reusable pieces: cards, forms, FAQ…
│   └── illustrations/  motion/  brand/  providers/  seo/
├── actions/                  ← form handlers that run on the server (send email)
├── lib/                      ← validation, email, spam checks, SEO
├── theme/index.ts            ← colours, fonts, button & card styles
└── sitemap.ts  robots.ts  icon.png

proxy.ts                      ← sends "/" to /en or /fr
```

Files outside `app/` are config that Next.js requires at the root
(`package.json`, `next.config.ts`, `tsconfig.json`) plus `public/` for static files.

## Adding a page
1. Create `app/[lang]/<name>/page.tsx` (copy `app/[lang]/blog/page.tsx` as a starting point).
2. Add its text to both dictionaries (`app/i18n/dictionaries/en.ts` and `fr.ts`).
3. Add it to `routes` in `app/data/site.ts`. The sitemap picks it up automatically.
4. Add a link in `app/components/navbar/navLinks.ts` or the footer if needed.

## Languages (English / French)

Every page exists twice: `/en/...` and `/fr/...`. Visiting `/` sends people to
their saved choice, or their browser's language (English by default).

- **All page text** lives in `app/i18n/dictionaries/en.ts` and `fr.ts`.
  Both files have the same shape — change a line in one, change it in the other
  (TypeScript reports anything missing).
- **Legal pages** keep their EN and FR text inside each page file
  (`app/[lang]/legal/*/page.tsx`).
- **In code:** server components use `const { t, href } = await getI18n()`;
  interactive (client) components use `const { t, href } = useI18n()`.
  `href("/products")` gives `/fr/products` on French pages.
- **Adding a language later** (e.g. Swahili): add it to `app/i18n/config.ts`,
  copy `en.ts` to `sw.ts` and translate it, then register it in `app/i18n/server.ts`.
