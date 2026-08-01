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
- Component scoping: Use `<style scoped>` in `.vue` files
- Avoid custom CSS for simple layouts - use Tailwind utilities

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
