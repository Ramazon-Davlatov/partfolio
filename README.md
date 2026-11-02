# Ramazon Davlatov — Portfolio

Live: **https://www.shavkatovichdev.uz/**

A bilingual (Uzbek / Russian) single-page portfolio built with React 19, Vite,
Tailwind CSS v4 and Framer Motion. The visual identity is inspired by Samarkand
tilework: lapis night, turquoise glaze and saffron gold, with an animated girih
star in the hero.

## Features

- Light / dark theme (remembers the choice, follows the system on first visit)
- Uzbek / Russian language switch (remembered)
- Motion: girih rosette that draws itself, custom cursor, card spotlight,
  magnetic buttons, crossing marquee, word-by-word headings, count-up stats,
  scroll-filled timeline, sticky stacking project cards
- Respects `prefers-reduced-motion`
- SEO: the page is prerendered to static HTML at build time, plus canonical URL,
  Open Graph image, JSON-LD (Person / WebSite), `sitemap.xml`, `robots.txt`
- Contact form that delivers messages to Telegram

## Run locally

```bash
npm install
npm run dev
```

`npm run build` builds the site and then prerenders it into `dist/index.html`
(`src/entry-server.jsx` + `scripts/prerender.js`).

## Contact form (Telegram)

The form posts to `/api/contact`, a Vercel serverless function in
`api/contact.js`. Set these in **Vercel → Project → Settings → Environment
Variables** and redeploy:

| Name        | Value                                   |
| ----------- | --------------------------------------- |
| `BOT_TOKEN` | Token from @BotFather                   |
| `CHAT_ID`   | Your Telegram chat id                   |

Never put the bot token in frontend code or commit it. If it leaks, send
`/revoke` to @BotFather and set the new token in Vercel.

## Editing content

- All text (both languages): `src/i18n/translations.js`
- Social links: `src/links.js`
- Colors and fonts: `src/index.css` (`@theme` block and `:root[data-theme='light']`)
- Skills: `src/sections/Skills.jsx` · Projects: `src/sections/Projects.jsx`
- SEO tags and structured data: `index.html` · Sitemap: `public/sitemap.xml`
