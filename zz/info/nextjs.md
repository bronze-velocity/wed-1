# Next.js — Key Things Coming from React + Node

## Version Landscape (as of 2026)

- **Next.js 15** is current stable. Use it.
- **App Router** (introduced in v13) is the default and future. The old Pages Router still works but is legacy. All new projects should use App Router.

---

## The Biggest Mental Shift: Server Components

React in Next.js App Router defaults to **React Server Components (RSC)**. This means:

- Components run on the server by default — no bundle cost, can access DB/env vars directly.
- To use hooks (`useState`, `useEffect`, `useContext`) or browser APIs, you must opt in: add `"use client"` at the top of the file.
- Rule of thumb: push `"use client"` as deep in the tree as possible. Keep data-fetching and layout components as server components.

```tsx
// server component — no directive needed, runs on server
export default async function Page() {
  const data = await db.query(...); // direct DB access fine here
  return <ClientWidget data={data} />;
}

// client component
"use client";
export function ClientWidget({ data }) {
  const [open, setOpen] = useState(false);
  ...
}
```

---

## File-Based Routing (App Router)

Routes live in `app/`. The folder structure IS the URL.

```
app/
  page.tsx          → /
  about/page.tsx    → /about
  blog/[slug]/page.tsx → /blog/:slug
  layout.tsx        → wraps all routes (persistent shell, nav, etc.)
  loading.tsx       → automatic Suspense boundary for the route
  error.tsx         → automatic error boundary for the route
  not-found.tsx     → 404 for the route
```

- `layout.tsx` does NOT re-render on navigation within its scope — good for persistent sidebars/navbars.
- `loading.tsx` / `error.tsx` are automatically used by Next.js — no manual Suspense needed.

---

## API Routes → Route Handlers + Server Actions

**REST endpoints** still exist as Route Handlers:
```
app/api/hello/route.ts  →  GET/POST /api/hello
```

```ts
// app/api/hello/route.ts
export async function GET(req: Request) {
  return Response.json({ hello: "world" });
}
```

**Server Actions** replace most mutation endpoints. Instead of `POST /api/submit`, you write a function and call it directly from the client:

```ts
// actions.ts
"use server";
export async function submitForm(data: FormData) {
  await db.insert(...);
}

// ClientComponent.tsx
"use client";
import { submitForm } from "./actions";
<form action={submitForm}>...</form>
```

This removes the need for a separate API layer for your own frontend's mutations.

---

## Data Fetching Patterns

| Old React + Node way | Next.js App Router way |
|---|---|
| `useEffect` + `fetch` on mount | `async` server component, `await fetch(...)` at top level |
| API route returns data to frontend | Server component reads DB directly |
| SWR/React Query for client caching | Still valid for client components; server components use `cache()` or `unstable_cache()` |

`fetch` in server components is automatically **extended** by Next.js — you can pass `{ next: { revalidate: 60 } }` to control caching.

---

## Dev Experience

```bash
npx create-next-app@latest   # scaffold
npm run dev                  # dev server with Fast Refresh, default port 3000
npm run build && npm start   # production build + server
```

- TypeScript is first-class, configured out of the box.
- `next.config.ts` (TypeScript) replaces the old `next.config.js`.
- `.env.local` for secrets. Variables prefixed `NEXT_PUBLIC_` are exposed to the client bundle; others are server-only.

---

## Deployment

**Easiest:** Vercel (made by the same team). Push to GitHub → auto-deploy. Free tier works for most projects.

**Self-host:** `npm run build` produces a Node server. Run with `npm start`. Works on any VPS, Railway, Fly.io, etc.

**Static export:** If you don't need SSR/API routes, `output: "export"` in config produces a plain static site deployable on S3/Netlify/GitHub Pages.

---

## Gotchas

- **`"use client"` does NOT mean "only runs on client"** — it still SSR-renders on the server for the initial HTML, then hydrates. It just enables hooks/browser APIs.
- **Node modules in server components** — you can import `fs`, `crypto`, DB clients directly. They never ship to the browser.
- **Cookies / headers** in server components need `import { cookies, headers } from "next/headers"` — can't use `req` object like in Express.
- **Middleware** (`middleware.ts` at root) runs on the Edge runtime by default — no Node APIs available there.
- **Image optimization** — use `next/image` instead of `<img>`. Handles lazy loading, sizing, and format conversion automatically.
- **Link navigation** — use `next/link` instead of `<a>`. Prefetches linked routes automatically.

