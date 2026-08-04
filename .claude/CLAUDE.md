# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio site (single scrollable page) built with:
- **Nuxt 4** (4.5.1) + **Nitro** (2.13.4), deployed to **Vercel** as a serverless SSR function
- **Vue 3** Composition API (`<script setup lang="ts">`)
- **Nuxt UI** for pre-built UI components (do not build custom UI components from scratch)
- **TypeScript** for type safety
- **Pinia** for client-side UI state (installed manually — see State Management below)
- **Tailwind CSS v4** for styling (configured via Nuxt UI)
- **GSAP** (Observer + ScrollToPlugin) for the fullpage-scroll and section animations
- **Prisma** ORM — installed but not yet configured (no `prisma/schema.prisma` exists yet)

Package manager: **pnpm** (required, pinned via `packageManager` in `package.json`)

## Development Commands

```bash
pnpm dev          # Start dev server on http://localhost:3000
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm lint         # Run ESLint checks
pnpm typecheck    # Run TypeScript type checking (nuxt typecheck)
pnpm install      # Install dependencies
```

There is no test suite configured. `pnpm generate` exists in principle but must not be used
for this project's Vercel deploy — see Deployment Gotchas below.

### Before Committing
Always run these to ensure CI passes:
```bash
pnpm lint && pnpm typecheck
```

## Project Structure

```
app/
├── app.vue                      # Root layout: <UApp>, CustomCursor, NuxtPage, page <head>/SEO
├── app.config.ts                # Nuxt UI theme config (primary/neutral colors)
├── pages/index.vue              # The entire site: stacks section components, calls useFullpageScroll()
├── components/
│   ├── HeroSection.vue, ExperienceSection.vue, ProjectsSection.vue, ContactSection.vue
│   │                             # The four fullpage-scroll sections, in scroll order
│   ├── SectionNavButtons.vue     # Dot/arrow nav driven by the navigation store
│   ├── SiteHeader.vue, AppFooter.vue, AppLogo.vue
│   ├── AmbientBackground.vue     # Decorative background layer
│   └── CustomCursor.vue          # Custom cursor, mounted globally in app.vue
├── composables/useFullpageScroll.ts   # GSAP Observer wheel/touch → navigation store → scrollTo animation
├── stores/navigation.ts          # Pinia store: section list, currentIndex, isAnimating, goTo/next/prev
├── plugins/pinia.ts               # Manual Pinia install (see State Management)
└── assets/css/
    ├── main.css                   # Tailwind entry + design tokens
    └── variables.css              # Design tokens (colors, typography, spacing — see public/DESIGN.md)

server/plugins/vue-globals.ts     # Nitro-startup fix for a Vercel/Pinia SSR bug (see Deployment Gotchas)
```

**Key pattern**: `pages/index.vue` is the only real page. It is not multi-route content — it's
one page that stacks section components and hands scroll control to `useFullpageScroll()` /
`useNavigationStore()`. When adding a new section, add it to both the component stack in
`pages/index.vue` and the `sections` array in `app/stores/navigation.ts` (id must match the
section root element's `id`).

## Code Style & Conventions

### ESLint Configuration
The project enforces specific stylistic rules (see `nuxt.config.ts`):
- **Comma dangle**: Never (no trailing commas)
- **Brace style**: 1TBS (1True Brace Style)

Run `pnpm lint` to check and auto-fix issues.

### TypeScript
- TypeScript is strict and required
- All Vue components should use `<script setup lang="ts">`
- Run `pnpm typecheck` to verify type safety

### Components
- Use **Nuxt UI components** from `@nuxt/ui` instead of building custom UI
- Nuxt UI provides ready-made Button, Card, Modal, etc.

### Vue 3 Composition API
- Use `<script setup>` for component logic
- Use `ref()` and `computed()` for reactivity
- Use `useRoute()` and `useRouter()` for navigation

## State Management with Pinia

Pinia is installed **manually** in `app/plugins/pinia.ts` — the `@pinia/nuxt` module is
deliberately **not** in `nuxt.config.ts`'s `modules`. Its SSR payload hook crashes on this
Nuxt/Nitro version regardless of whether a page uses any store. Do not re-add `@pinia/nuxt`;
see the `nuxt-vercel-deploy` skill for the full root cause.

Consequences of the manual setup:
- Auto-import of stores comes from `imports: { dirs: ['stores'] }` in `nuxt.config.ts`, not
  from `@pinia/nuxt`.
- Store files must `import { defineStore } from 'pinia'` explicitly.
- Stores must hold only client-side UI state — nothing that needs SSR→client hydration, since
  there is no payload-sync hook. `useNavigationStore` (current scroll section) fits this; a
  store needing hydrated server data would not.

```typescript
// app/stores/myStore.ts
import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', () => {
  const count = ref(0)
  return { count }
})
```

## Deployment (Vercel + Nuxt/Nitro)

This project's Nuxt/Nitro/Vercel version combination has reproducible upstream bugs that shape
several config choices in `nuxt.config.ts` and `server/plugins/vue-globals.ts`. **Before
touching deployment config, Pinia setup, or `routeRules`/prerender, read the `nuxt-vercel-deploy`
skill** — it documents each gotcha and why the obvious "fix" makes things worse:

- No `routeRules` with `prerender: true` on any route, and don't use `nuxt generate` — Nitro's
  prerender crawler crashes deterministically on this version, independent of this project's
  code. The site relies on regular per-request SSR (the default), which is a separate, working
  code path.
- No `vite.define` for `__VUE_PROD_DEVTOOLS__` / `__VUE_OPTIONS_API__` /
  `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` — `server/plugins/vue-globals.ts` sets these at
  Nitro startup instead, because Vite's define does a blind text substitution that would
  clobber that very fix.

## Database & Prisma

Prisma is installed but not yet configured. If implementing database features:
1. Define schema in `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev --name <migration-name>`
3. Use Prisma client in API routes (`server/api/`)
4. Never hand-edit generated `.sql` migration files — always go through Prisma Migrate.

## Styling

- **Tailwind CSS v4** is configured via Nuxt UI
- Design tokens (colors, typography, spacing, radius) live in `app/assets/css/main.css` and
  `app/assets/css/variables.css`; the source design spec is `public/DESIGN.md`
- Style in the `<template>` with Tailwind utility classes — no `<style>` blocks (scoped or
  otherwise), no inline `style` attributes. See `.claude/rules/coding.md` for the full rule and
  the rare, documented exception.
- `<template>` must come before `<script setup lang="ts">` in every `.vue` file — see
  `app/components/SectionNavButtons.vue` for the expected order.

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`) runs on every push, on Node 22:
1. Checkout code
2. Install pnpm & Node 22
3. Install dependencies
4. Run `pnpm lint`
5. Run `pnpm typecheck`

No tests are currently configured. Add test scripts to `package.json` and the CI workflow if
implementing tests.

## Important Notes

### No prerendering
`pages/index.vue` is rendered via regular per-request SSR, not build-time prerendering — see
Deployment Gotchas above. Don't add a `routeRules` prerender entry for `/`; it reintroduces a
known crawler crash.

### Devtools Enabled
DevTools is enabled in `nuxt.config.ts` for development. Access with the keyboard shortcut in
dev mode.

### Node Version
CI runs on Node 22. Ensure local Node version matches (check with `node --version`).

## File Format Notes

- Vue files: `<template>` first, then `<script setup lang="ts">` with type-safe props/emits
- Config files: TypeScript (`.ts`) - must be valid Node.js modules
- Imports: Use path alias `~` for app directory (e.g., `~/components/Button.vue`)
