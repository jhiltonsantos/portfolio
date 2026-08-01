# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Nuxt 4** portfolio/starter project built with:
- **Vue 3** for component development
- **Nuxt UI** for pre-built UI components (do not build custom UI components from scratch)
- **TypeScript** for type safety
- **Pinia** for state management
- **Tailwind CSS** for styling (configured via Nuxt UI)
- **Prisma** ORM for database operations

Package manager: **pnpm** (required)

## Development Commands

### Common Commands
```bash
pnpm dev          # Start dev server on http://localhost:3000
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm lint         # Run ESLint checks
pnpm typecheck    # Run TypeScript type checking
pnpm install      # Install dependencies
```

### Before Committing
Always run these to ensure CI passes:
```bash
pnpm lint && pnpm typecheck
```

## Project Structure

```
app/
├── app.vue              # Root component/layout
├── app.config.ts        # Nuxt app configuration
├── pages/               # Auto-routed pages (file-based routing)
│   └── index.vue       # Home page (prerendered)
├── components/          # Reusable Vue components
│   ├── TemplateMenu.vue
│   └── AppLogo.vue
└── assets/
    └── css/
        └── main.css    # Custom Tailwind CSS
```

**Key Pattern**: Nuxt uses file-based routing - files in `pages/` automatically become routes.

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
- Import from `#ui/components` or use global registration via Nuxt UI

### Vue 3 Composition API
- Use `<script setup>` for component logic
- Use `ref()` and `computed()` for reactivity
- Use `useRoute()` and `useRouter()` for navigation

## State Management with Pinia

For any app-wide state:
```typescript
// stores/myStore.ts
export const useMyStore = defineStore('myStore', () => {
  const count = ref(0)
  return { count }
})
```

Import and use:
```typescript
const store = useMyStore()
```

## Database & Prisma

Prisma is installed but not yet configured. If implementing database features:
1. Define schema in `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev --name <migration-name>`
3. Use Prisma client in API routes (`server/api/`)

## Styling

- **Tailwind CSS** is configured via Nuxt UI
- Custom global styles: `app/assets/css/main.css`
- Style in the template with Tailwind utility classes, not `<style>` blocks (see Coding Standards)
- Avoid custom CSS for simple layouts - use Tailwind utilities

## Coding Standards

1. **Scan before building.** Search the repo for existing functions, types, components, and utilities that already cover the task. Reuse or minimally adapt them instead of writing new ones.
2. **Minimal, root-cause changes.** Ship the smallest safe diff that solves the requirement. Don't add layers, abstractions, or helpers unless they reduce total complexity. When fixing bugs, fix the root cause — no band-aids or temporary patches. Touch only what's necessary; don't introduce side effects while fixing something else.
3. **Single responsibility, short functions.** Each function does one thing and is named for that thing.
4. **No redundancy.** Consolidate duplicated logic into one reusable function; call existing utilities rather than rewriting them.
5. **Explicit contracts.** Use typed signatures and clear input/output shapes. Validate inputs at system boundaries and fail fast with clear errors.
6. **Readability over cleverness, minimal comments.** Use expressive names and simple control flow so the code doesn't need comments to explain itself. A one-line docstring on exported/public functions is enough — do not add full JSDoc blocks or multi-line comments.
7. **Reuse what's installed.** Prefer already-installed packages and battle-tested libraries over new dependencies or custom implementations of solved problems.
8. **Correctness before performance.** Don't micro-optimize before measuring.
9. **Ask, don't assume.** If a requirement is ambiguous or you're unsure of an architectural detail, ask for clarification before implementing rather than guessing.
10. **Keep files small.** Aim for a soft cap of ~150 lines per file; split when a file grows past that.
11. **Always use `pnpm`**, never `npm` or `yarn`.
12. **No unsolicited docs.** Don't create `.md` summaries, reports, or overview files unless explicitly asked to.
13. **Consult MCP docs when available.** If a Nuxt UI or Context7 MCP server is configured in this environment, check it before using an unfamiliar Nuxt UI component or external library API.
14. **Rely on Nuxt auto-imports.** Don't manually import `ref`, `computed`, `watch`, `useRoute`, `useRouter`, or other Nuxt/Vue auto-imports.
15. **Never hand-edit `.sql` migration files.** Always generate and apply schema changes through Prisma Migrate (`pnpm prisma migrate dev`).
16. **Nuxt UI first.** Use `UTable`, `UButton`, `UInput`, `USelect`, `UTextarea`, `UFormField`, `UModal`, `UBadge`, etc. instead of raw HTML controls, unless explicitly told otherwise.
17. **Tailwind, template-first, no `<style>` blocks.** Style in the template with Tailwind utility classes and design tokens, not a separate style block. Only use `<style scoped>` when technically unavoidable (e.g. `:deep()` for a third-party component), and keep the exception minimal and commented.
18. **No unnecessary semicolons** in TypeScript — only where syntax requires them (already enforced by `pnpm lint`).

## CI/CD Pipeline

GitHub Actions runs on every push:
1. Checkout code
2. Install pnpm & Node 22
3. Install dependencies
4. Run `pnpm lint`
5. Run `pnpm typecheck`

**Note**: No tests are currently configured. Add test scripts to `package.json` and CI workflow if implementing tests.

## Important Notes

### Home Page Prerendering
The home page (`/`) is set to prerender in `nuxt.config.ts`. This means:
- Static HTML is generated at build time
- Changes to `pages/index.vue` require a rebuild to see in production

### Devtools Enabled
DevTools is enabled in `nuxt.config.ts` for development. Access with keyboard shortcut in dev mode.

### Node Version
CI runs on Node 22. Ensure local Node version matches (check with `node --version`).

## File Format Notes

- Vue files: `<script setup lang="ts">` with type-safe props/emits
- Config files: TypeScript (`.ts`) - must be valid Node.js modules
- Imports: Use path alias `~` for app directory (e.g., `~/components/Button.vue`)
