---
name: nuxt-vercel-deploy
description: The correct nuxt.config.ts / server-plugin configuration for deploying THIS project (Nuxt 4.5.1 + Nitro 2.13.4 + Vercel serverless SSR) and the exact reasoning behind each choice. Use this whenever touching deployment-related config in nuxt.config.ts, debugging a Vercel build or runtime error for this project, seeing a production 500 ("__VUE_PROD_DEVTOOLS__ is not defined", "nuxtApp.$pinia" errors, prerender crashes), being asked to deploy/redeploy/fix the Vercel deploy, or before re-adding @pinia/nuxt, vite.define for Vue flags, or a routeRules prerender rule — each of those has already been tried here and breaks the build for reasons documented below. Don't rediscover these from scratch; read this first.
---

# Nuxt → Vercel serverless deploy (this project)

This project's Nuxt/Nitro/Vercel dependency combination has two real, reproducible upstream
bugs. Both were root-caused through extensive bisection (isolated on a from-scratch minimal
Nuxt app, confirmed on Vercel's own clean build runner, not a local environment quirk). The
fixes below are not optional style choices — reverting any of them reintroduces the exact
crash described. If you're about to touch `nuxt.config.ts` deployment settings or Pinia setup,
read the relevant section before changing anything.

## The target configuration

- `ssr` is left at its default (`true`). Real per-request SSR — what Vercel's serverless
  function does for every request — works fine. It is a **different code path** from Nitro's
  build-time prerender crawler, which is broken (see below). Don't set `ssr: false` for this
  project; that was a workaround tried during a GitHub Pages static-export attempt and is not
  needed for Vercel.
- No `routeRules` with `prerender: true` on any route.
- No `@pinia/nuxt` in `modules`.
- No `vite.define` for `__VUE_PROD_DEVTOOLS__` / `__VUE_OPTIONS_API__` / `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`.
- `imports: { dirs: ['stores'] }` — replaces the auto-import that `@pinia/nuxt` would normally
  register for `app/stores/*.ts`.
- `app/plugins/pinia.ts` — manual Pinia install (see below).
- `server/plugins/vue-globals.ts` — Vue prod-flag globals set at Nitro startup (see below).

## Gotcha 1: `@pinia/nuxt` crashes every SSR render

`@pinia/nuxt`'s runtime plugin registers an `app:rendered` hook:

```js
hooks: {
  "app:rendered"() {
    const nuxtApp = useNuxtApp();
    nuxtApp.payload.pinia = toRaw(nuxtApp.$pinia).state.value; // <- $pinia is undefined here
  }
}
```

On this Nuxt/Nitro version, `nuxtApp.$pinia` is undefined when this hook fires — on **every**
SSR render, not just prerendering, and reproduced even on a page with zero store usage (a
brand-new `nuxt init` + `@nuxt/ui` + `@pinia/nuxt` project with a one-line page hits the same
crash). This isn't fixable from userland config; there's no option to disable just that hook.

**Fix:** don't use the `@pinia/nuxt` module. Install Pinia manually instead:

```ts
// app/plugins/pinia.ts
import { createPinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
})
```

This is safe specifically because this project's stores hold only client-side UI state (e.g.
`useNavigationStore`'s scroll-section index) with nothing that needs SSR→client hydration — the
store just starts fresh at its default state on every render. If a future store *does* need
SSR-hydrated state, that's a reason to revisit this, not a reason to silently re-add
`@pinia/nuxt`.

Since the module also handled auto-importing `defineStore`/`useXStore`, replace it with:
- `import { defineStore } from 'pinia'` explicitly in each store file.
- `imports: { dirs: ['stores'] }` in `nuxt.config.ts` to keep `useNavigationStore()` etc.
  auto-imported in components.

## Gotcha 2: `__VUE_PROD_DEVTOOLS__ is not defined` in production

This is two bugs stacked, and the second one hides behind a false-positive test if you're not
careful.

**Root cause:** `pinia`'s published build (`node_modules/pinia/dist/pinia.js`) references
`__VUE_PROD_DEVTOOLS__` as a bare global, expecting a bundler to replace it at build time:

```js
if ((process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && ...)
```

Nitro's `vercel` preset copies `pinia` into the deployed function's `node_modules/` as a raw,
un-bundled file rather than inlining it into the main chunk. Vite's `define` (which is how this
global is normally supposed to get replaced with a literal `false`) only processes files Vite
actually bundles — it never touches this externalized copy. At runtime, when
`process.env.NODE_ENV === "production"` (true on Vercel, true in any real deploy), the `||`
must evaluate its right side, hits the undeclared identifier, and throws.

**The trap:** the obvious fix — add `vite: { define: { __VUE_PROD_DEVTOOLS__: 'false', ... } }`
to `nuxt.config.ts` — makes it *worse* in a confusing way. Vite's `define` does a blind
text/AST substitution of that identifier **everywhere in every bundled file**, including inside
your own fix code. `globals.__VUE_PROD_DEVTOOLS__ ??= false` written in a `server/plugins/*.ts`
file gets rewritten to `globals.false ??= false` — silently doing nothing, no error, looks fine
in a build log. (Nuxt already sets an equivalent internal define for these flags regardless of
whether you add your own — so even removing your own `vite.define` doesn't stop this from
happening to a naively-written fix.)

**Fix:** set the globals at Nitro startup, in `server/plugins/vue-globals.ts`, building the
property name at runtime so there's no literal `__VUE_X__` identifier anywhere in the source
for the bundler to pattern-match and replace:

```ts
// server/plugins/vue-globals.ts
function setVueFlag(name: string, value: boolean) {
  const key = `__${name}__`
  const globals = globalThis as Record<string, unknown>
  globals[key] ??= value
}

export default defineNitroPlugin(() => {
  setVueFlag('VUE_PROD_DEVTOOLS', false)
  setVueFlag('VUE_OPTIONS_API', true)
  setVueFlag('VUE_PROD_HYDRATION_MISMATCH_DETAILS', false)
})
```

Do **not** also add a `vite.define` block for these flags — it's both useless (never reaches
the externalized `pinia.js`) and actively dangerous (clobbers any literal-identifier fix
elsewhere in the bundle, including this one).

### The false-positive trap when testing this locally

`NODE_ENV` is what gates whether the crashing line even executes
(`process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__`). A plain
`node .output/server/index.mjs` or an ad-hoc `node -e "import handler from ..."` test does
**not** set `NODE_ENV=production` by default — so the left side of that `||` is already `true`,
the right side is never evaluated, and the bug appears fixed when it isn't. Real Vercel
functions always run with `NODE_ENV=production`. Always test with it set explicitly (see
Verification below) — a green local test without it means nothing for this specific bug.

## Gotcha 3: the prerender crawler crashes on every route

Nitro's build-time prerender crawler (triggered by `nuxt generate`, or by any `routeRules`
entry with `prerender: true`) crashes with `[500] Server Error` on `/` while `/200.html` and
`/404.html` (the generic SPA-fallback pages, rendered via a different code path) succeed. This
was bisected all the way down to a from-scratch, zero-module, zero-page, one-line `app.vue`
Nuxt project — it is not caused by anything in this project's code, and reproduces across
Nuxt 4.4.8/4.5.1 and Nitropack 2.13.0/2.13.4.

**Fix:** don't mark any route `prerender: true`, and don't use `nuxt generate`. Regular SSR
(the default) is a working, separate code path — Vercel's per-request rendering never invokes
the prerender crawler unless a route is explicitly marked for it.

If Vercel deployment is ever swapped for a static host again, this crash comes back and needs
`ssr: false` (client-only SPA shell) as a workaround — see git history around the GitHub Pages
attempt for the tradeoffs (mainly: `useHead`/`useSeoMeta` calls no longer bake into the static
HTML, so title/OG/meta tags need to move into `nuxt.config.ts`'s static `app.head` instead).

## Verification recipe

Don't trust a build that merely completes, and don't trust a runtime test without
`NODE_ENV=production` (see Gotcha 2). To honestly verify a config or plugin change:

```bash
# 1. Build with the exact preset Vercel uses
rm -rf .nuxt .output .vercel/output node_modules/.cache
NITRO_PRESET=vercel pnpm build

# 2. Confirm your fix's code actually survived the bundler unmangled —
#    grep for the pattern you wrote, not just "no errors in the log"
grep -n "setVueFlag" .vercel/output/functions/__fallback.func/chunks/nitro/nitro.mjs

# 3. Invoke the REAL built function with NODE_ENV=production, matching Vercel exactly
NODE_ENV=production node --input-type=module -e "
import { createServer } from 'node:http';
import handler from './.vercel/output/functions/__fallback.func/index.mjs';
const server = createServer((req, res) => handler(req, res));
server.listen(4400, async () => {
  const res = await fetch('http://localhost:4400/');
  console.log('STATUS:', res.status);
  console.log(await res.text());
  server.close();
});
"

# 4. Clean up build artifacts and regenerate .nuxt for lint/typecheck
rm -rf .vercel .output .nuxt node_modules/.cache
pnpm exec nuxt prepare
```

If you have Vercel MCP tools available, cross-check against the actual deployment instead of
guessing from a screenshot: `list_deployments` → `get_deployment_build_logs` (build-time
issues) and `get_runtime_logs` with `statusCode: "500"` (runtime issues) for the specific
`deploymentId`. `get_runtime_errors`'s aggregated table can miss crashes that happen very early
in a request (before the app-level error handlers it reads from get involved) — prefer
`get_runtime_logs` when the aggregated view says "no errors" but the site is visibly down.

## Quick diagnostic table

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot read properties of undefined (reading 'state')` at `app:rendered` | `@pinia/nuxt` module is back in `modules` | Remove it; use `app/plugins/pinia.ts` |
| `__VUE_PROD_DEVTOOLS__ is not defined` (or `__VUE_OPTIONS_API__`, `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`) | `server/plugins/vue-globals.ts` missing, or rewritten with literal `__VUE_X__` identifiers that a define clobbered | Restore the runtime-assembled-key version above; don't add `vite.define` for these |
| Build succeeds locally but crashes only on Vercel, or a local "fix" verification doesn't hold up | Tested without `NODE_ENV=production` | Re-test per the Verification recipe |
| `[500] Server Error` on `/` during `nuxt generate` / prerender, `/200.html` and `/404.html` succeed | Prerender crawler bug (Gotcha 3) | Remove `routeRules` prerender entries, don't use `nuxt generate` for this project's Vercel deploy |
