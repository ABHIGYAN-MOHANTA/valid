<div align="center">

# Valid — SaaS Idea Validator

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-20232a?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38b2ac?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-API-4285F4?logo=google)](https://ai.google.dev)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)

</div>

---

<img width="1512" height="982" alt="Screenshot 2025-10-31 at 3 50 14 AM" src="https://github.com/user-attachments/assets/22890258-c5c7-489e-8145-c744008ff09e" />


### Overview

Valid helps you quickly assess the viability of a SaaS concept. Provide key signals (problem, market, solution, founder fit), and the app:

- Computes a weighted score out of 80 with zone classification
- Generates structured AI guidance (viability, risks, experiments, GTM)
- Presents insights in a clean, dark-first UI

### Features

- Scoring across Problem, Market, Solution, Founder dimensions
- AI Analysis powered by Gemini 2.0 Flash
- Structured insights parser with badges, sections, and experiment callouts
- Dark mode by default (with `next-themes`)
- Fully typed components (TypeScript)
- One-click Export to PDF (prints the results page as-is with dark theme)

### Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- next-themes for theming
- Google Generative AI (Gemini) SDK

### Getting Started

1) Prereqs

- Node.js 18+
- pnpm (recommended)
- A Google Gemini API key

2) Install

```bash
pnpm install
```

3) Configure env

Create a `.env.local` in the project root:

```bash
GEMINI_API_KEY=your_api_key_here
```

4) Run

```bash
pnpm dev
```

App will be available at `http://localhost:3000`.

### Usage

- Fill in the sliders and fields, then click “Generate Valid Score”.
- The app POSTs to `/api/validate`, computes scores, and asks Gemini for analysis.
- The AI output is constrained to a strict Markdown template so the UI parser renders consistent sections.
- Click "Export as PDF" on the results page to save a styled PDF.

#### Print/PDF

- We preserve background colors in print with `print-color-adjust: exact`.
- In some browsers you may need to enable "Background graphics" in the print dialog.
- Cards avoid splitting across pages; the score and gauge scale for paper sizes.

### Environment Variables

- `GEMINI_API_KEY` (required): token for Google Generative AI.

### Project Structure

```
app/
  api/validate/route.ts   # Scores + Gemini prompt + JSON response
  layout.tsx              # ThemeProvider (dark default)
  page.tsx                # Form + results flow
components/
  validator-form.tsx      # Input form
  results-display.tsx     # Summary + section scores + AI analysis
  ai-analysis.tsx         # Structured parser/renderer for Gemini output
  ui/                     # Minimal UI primitives (button, card, input, ...)
styles/
  globals.css             # Tailwind v4 + theme tokens
```

### How It Works

- Scores are computed in the API route and combined into `totalScore` and a zone: Launch Ready, Refinement Needed, Major Rework, Not Viable.
- The Gemini prompt enforces headings and markers (e.g., “## …”, “Key takeaway:”, “**Experiment N:**”) so `ai-analysis.tsx` can reliably segment content.

### Commands

- `pnpm dev` – start dev server
- `pnpm build` – production build
- `pnpm start` – run production server

### Theming

- Dark mode is default via `ThemeProvider` with `defaultTheme="dark"` and `enableSystem={false}`.

---

Built with ❤️ and AI assistance.


