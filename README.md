# Ramazon Davlatov — Portfolio

A single-page animated portfolio built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

## What's included

- Loading screen with animated counter
- Ambient glow background with mouse parallax + grid + noise
- Dark / light mode toggle (persisted, respects system preference on first visit)
- Navbar with scroll-hide, active-section indicator, animated mobile menu
- Hero with staggered letter reveal, typewriter role text, and a rotating "orbit" widget
  (your initials in the center, AI tools you use orbiting around it, continuously spinning)
- About with animated stat counters + timeline
- Skills with animated progress bars + 3D tilt cards
- Services grid
- Projects showcase with a featured card + 3D tilt
- AI section (Claude, ChatGPT, Gemini, DeepSeek, Grok, Copilot) + Telegram QR code
- Contact form wired to a small Express backend that forwards messages to your Telegram bot
- Footer with socials + back-to-top

## Run it locally

```bash
npm install
npm run dev
```

## Contact form backend (Telegram bot)

The contact form posts to `/api/contact`. A matching Express server lives in `/backend`.

```bash
cd backend
npm install
cp .env.example .env
# edit .env and add your BOT_TOKEN and CHAT_ID
npm run dev
```

Your `backend/.env` already exists locally with your bot's credentials — it is listed in
`backend/.gitignore` so `git` will never track or push it. **Never paste your bot token into
any `.jsx`/`.js` file, into `index.html`, or into a GitHub issue/commit** — anyone with the
token can send messages as your bot. If you ever suspect it leaked, message **@BotFather** →
`/revoke` to invalidate it and get a new one.

In development, Vite proxies `/api` to `http://localhost:5174` (see `vite.config.js`), so run
both `npm run dev` (frontend, in the project root) and `cd backend && npm run dev` (backend) at
the same time.

## Deploying

This is a two-part deploy: the **frontend** (static React build) and the **backend** (the
small Node server that talks to Telegram). GitHub Pages only serves static files — it cannot
run the Express server — so the backend needs to live somewhere that runs Node.

### 1. Frontend → GitHub Pages

A ready-made workflow is included at `.github/workflows/deploy.yml`. To use it:

1. Push this project to a GitHub repo.
2. In the repo, go to **Settings → Pages** and set **Source** to "GitHub Actions".
3. If your repo is *not* named `<your-username>.github.io`, open `vite.config.js` and change
   `base: '/'` to `base: '/<your-repo-name>/'` (this makes asset URLs resolve correctly).
4. Push to `main` — the workflow builds and deploys automatically. Your site will be live at
   `https://<your-username>.github.io/<your-repo-name>/`.

### 2. Backend → any free Node host (Render, Railway, Fly.io, etc.)

Render's free tier is the simplest (no card required for a basic web service):

1. Push this project to GitHub (the backend folder comes along).
2. On Render: **New → Web Service** → connect the repo → set **Root Directory** to `backend`.
3. Build command: `npm install`. Start command: `npm start`.
4. Add environment variables `BOT_TOKEN` and `CHAT_ID` (same values as your local `.env`) in
   Render's dashboard — never in code.
5. Once deployed, copy the service URL (e.g. `https://your-app.onrender.com`).

### 3. Connect them

Set `VITE_API_URL` to that backend URL so the deployed frontend knows where to send contact
form submissions:

- Locally / for the GitHub Actions build: add a repo **Variable** (Settings → Secrets and
  variables → Actions → Variables) named `VITE_API_URL` with the backend URL. The workflow
  already reads it.
- Or copy `.env.example` to `.env` in the project root and set it there for a manual build.

Free hosts like Render's free tier "sleep" after inactivity, so the first message after a
quiet period may take a few extra seconds to arrive — that's normal.

## Editing content

- Name/links: `src/sections/Hero.jsx`, `src/sections/Footer.jsx`
- Orbit widget (center initials, ring size): `src/components/OrbitAvatar.jsx`
- Skills: `src/sections/Skills.jsx`
- Projects: `src/sections/Projects.jsx`
- AI tools (also feeds the orbit widget): `src/i18n/translations.js` → `ai.tools`
- Colors/fonts, incl. light-mode palette: `src/index.css` (`@theme` block and
  `:root[data-theme='light']`)
