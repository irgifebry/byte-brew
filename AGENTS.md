<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repository notes

- Next.js `16.4.2` requires Node `>=20.9`; README's Node 18+ claim is stale. Read the relevant guide under `node_modules/next/dist/docs/` before changing Next.js APIs.
- App Router pages live in `src/app/`; shared UI in `src/components/`; menu and shop details in `src/data/menu.js`. Keep `contact/page.jsx` server-rendered; form and map behavior live in `ContactClient.jsx`.
- Ordering and booking are frontend-only dialogs/forms; no backend exists.
- `npm run lint` currently invokes removed `next lint` (Next 16) and lint dependencies/config are absent. `npm run build` is available for production validation.
- Run `node scripts/check-intro-animation.cjs` after changing intro, reveal, or reduced-motion behavior; it checks their source-level coupling.
