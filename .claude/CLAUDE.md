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
- **@nuxtjs/i18n** for English/Portuguese content, with browser-language auto-detection (see i18n below)
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
├── app.vue                      # <UApp><NuxtLayout><NuxtPage/></NuxtLayout></UApp>, page <head>/SEO
├── app.config.ts                # Nuxt UI theme config (primary/neutral colors)
├── layouts/default.vue          # Renders UILayoutBackground + <slot>, calls useFullpageScroll()
├── pages/index.vue              # The entire site: stacks the 4 section components
├── components/
│   ├── hero/Section.vue, experience/{Section,Card}.vue, projects/{Section,Card}.vue,
│   │   contact/{Section,Card}.vue
│   │                             # One folder per fullpage-scroll section, in scroll order.
│   │                             # experience/projects/contact each split a Section (layout +
│   │                             # data) from a Card (single-item presentation); each Section
│   │                             # renders its list once: stacked on mobile, grid on md+.
│   ├── hero/RoleCallout.vue      # The little role-label callout anchored to the hero name
│   └── UI/                       # Cross-section shared components
│       ├── AppLogo.vue, LanguageSwitch.vue
│       ├── grid/Grid.vue, Cell.vue, Label.vue   # <UIGrid>/<UIGridCell>/<UIGridLabel> cell primitives
│       └── layout/Background.vue, Header.vue, Footer.vue   # Header/Footer are grid rows (col-span-12)
├── composables/
│   ├── useFullpageScroll.ts        # Desktop: GSAP Observer → store → scrollTo; mobile: native scroll + section sync
│   └── usePrefersReducedMotion.ts  # prefersReducedMotion(): every GSAP animation checks it first
├── stores/navigation.ts          # Pinia store: section list, currentIndex, isAnimating, goTo/next/prev
├── plugins/pinia.ts               # Manual Pinia install (see State Management)
└── assets/css/
    ├── main.css                   # Tailwind entry + design tokens
    └── variables.css              # Design tokens (colors, typography, spacing — see public/DESIGN.md)

i18n/locales/{pt,en}.json          # Locale files (repo root, not app/ — see i18n below)
server/plugins/vue-globals.ts     # Nitro-startup fix for a Vercel/Pinia SSR bug (see Deployment Gotchas)
```

**Key pattern**: `pages/index.vue` is the only real page. It is not multi-route content — it's
one page that stacks `<HeroSection>` / `<ExperienceSection>` / `<ProjectsSection>` /
`<ContactSection>` and hands scroll control to `useFullpageScroll()` (called once, from
`layouts/default.vue`) / `useNavigationStore()`. When adding a new section, add it to both the
component stack in `pages/index.vue` and the `sections` array in `app/stores/navigation.ts` (id
must match the section root element's `id`).

**Header/Footer are not in the layout.** `layouts/default.vue` only renders the animated
background (`UILayoutBackground`) and calls `useFullpageScroll()` — `<UILayoutHeader>` is
rendered inside `hero/Section.vue` and `<UILayoutFooter>` inside `contact/Section.vue` (both are
`col-span-12` rows of a `<UIGrid>`, so they only work inside one). Don't
assume a conventional header-in-layout/footer-in-layout structure when tracing header/footer
behavior; go to those two section files instead. Also note `<NuxtPage>` **must** stay wrapped in
`<NuxtLayout>` in `app.vue` — without that wrapper, `definePageMeta({ layout: 'default' })` on
the page is silently ignored and nothing in the layout (background, header, footer,
`useFullpageScroll()`) mounts at all.

### Component auto-import naming (folder-prefixed)

Components auto-import using Nuxt's default folder-prefixed PascalCase naming — every path
segment under `app/components/` is PascalCased and prepended to the filename. This means the
casing of a folder name is significant and must be typed exactly as registered:

| File | Auto-imported as |
| --- | --- |
| `components/hero/Section.vue` | `<HeroSection>` |
| `components/experience/Card.vue` | `<ExperienceCard>` |
| `components/UI/layout/Header.vue` | `<UILayoutHeader>` |

`UI` is capitalized exactly like that (not `Ui`) because the folder itself is named `UI` — a
lowercase `ui` folder would instead register as `<Ui...>`. When in doubt, check
`.nuxt/components.d.ts` rather than guessing; a casing mismatch fails silently (the tag just
doesn't render, no build error).

### The fullpage-scroll system

Fullpage scrolling is **desktop-only** (`md+`, 768px). On mobile the page scrolls natively —
sections taller than the device screen were unreadable when every gesture jumped a whole section.

- `useFullpageScroll.ts` uses `gsap.matchMedia()`:
  - `(min-width: 768px)`: GSAP `Observer`s on `window` for wheel/touch plus an ↑/↓ keyboard
    handler call `store.next()`/`store.prev()`. Entering this mode (e.g. resizing up from mobile)
    snaps to the nearest section first.
  - `(max-width: 767px)`: no Observers; an `IntersectionObserver` keeps `store.currentIndex` on the
    section crossing the middle of the viewport, so section-driven effects (background glows)
    still run. A `syncingFromScroll` flag stops these updates from triggering the scroll animation.
  - A `watch` on `store.currentIndex` drives `gsap.to(window, { scrollTo })` in both modes, so
    header/menu links (`store.goToId`) animate on mobile too.

There are no horizontal carousels: on mobile, Experience and Projects stack their cards vertically
(one list per section, `flex flex-col` below `md`, grid on `md+`). Below `md`,
Experience/Projects/Contact have natural height (`md:min-h-dvh md:h-dvh` only on desktop); the
Hero stays `min-h-dvh`.

## i18n

Locale files live at repo-root `i18n/locales/{pt,en}.json` — **not** under `app/`, because
`langDir` resolves against `rootDir`. Both files must stay structurally identical (same nested
keys); components read them with `useI18n()`'s `t()` and `useLocaleHead()` (used once, in
`app.vue`, for `<html lang>`/SEO tags).

Locale is picked automatically (`nuxt.config.ts`'s `i18n.detectBrowserLanguage`): any Portuguese
browser-language variant (`pt-BR`, `pt-PT`, ...) maps to `pt`, everything else falls back to
`en`. A manual pick from `<LanguageSwitch>` overwrites the `i18n_redirected` cookie and takes
priority over auto-detection on later visits. `strategy: 'no_prefix'` means there is no
`/en`/`/pt` URL prefix — both locales are served at the same routes.

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

## Design system conventions ("grid of cells")

The site follows a Universe-style grid of 1px-bordered cells (ADRs in `docs/adr/`, tokens in
`docs/design-system/tokens.md`). When adding or changing UI:

- **Layout**: compose sections from `<UIGrid>` / `<UIGridCell>` / `<UIGridLabel>`
  (`app/components/UI/grid/`). Cells touch via `-ml-px -mt-px`; no rounded blocks, no `ring`/glow
  shadows. Hero, Experience, Projects and Contact are `md:h-dvh` sections whose grid fills the
  viewport (`grid-rows-[auto_minmax(0,1fr)]`), so every section has the same outer frame.
- **Typography**: Mona Sans (text) and Mona Sans Mono (labels). Section eyebrows are mono lowercase
  `dev.*()` strings (identical in `pt`/`en`, not translated); titles/long text are translated.
  Text of links and buttons is `lowercase` (apply the class — `button` resets `text-transform`).
- **Colors**: only design-system tokens (`bg-surface`, `text-on-surface-variant`,
  `border-outline-variant/60`, `text-primary`). Nuxt UI's `--ui-*` semantic variables are remapped
  to these tokens at the end of `variables.css`, so Nuxt UI components never show the default
  slate/blue; the tooltip is styled in `app.config.ts`.
- **Tech icons** (stack/tags) are borderless `UIcon size-6 text-primary` wrapped in
  `UTooltip :delay-duration="0" :content="{ side: 'top' }"` with `hover:scale-125`; no `UBadge`.
- **Interactive cells** use `hover:border-primary` (+ `relative hover:z-10`) and
  `focus-visible:outline-2 focus-visible:outline-primary`.
- **Motion**: guard any GSAP animation with `prefersReducedMotion()`
  (`app/composables/usePrefersReducedMotion.ts`).
- **Responsive typography**: card titles/descriptions use
  `text-2xl min-[1400px]:text-headline-md 2xl:text-4xl` and
  `text-sm min-[1400px]:text-body-md 2xl:text-lg`, so 4-card grids do not overflow short viewports
  and still grow on large monitors. The container cap is `--spacing-container-max: 1600px`.
- **Hero name** sizes with container-query units (`@container` on its cell,
  `text-[min(12.5cqw,18vh)]`), never `vw`: the grid stops growing at the container cap while the
  viewport keeps growing, so a `vw` size overflows the cell on wide screens.

## Styling

- **Tailwind CSS v4** is configured via Nuxt UI
- Design tokens (colors, typography, spacing, radius) live in `app/assets/css/main.css` and
  `app/assets/css/variables.css`; the source design spec is `public/DESIGN.md`
- Style in the `<template>` with Tailwind utility classes — no `<style>` blocks (scoped or
  otherwise), no inline `style` attributes. See `.claude/rules/coding.md` for the full rule and
  the rare, documented exception.
- `<template>` must come before `<script setup lang="ts">` in every `.vue` file — see
  `app/components/contact/Card.vue` for the expected order.

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
