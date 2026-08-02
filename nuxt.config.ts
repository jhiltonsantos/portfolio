// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],

  // @pinia/nuxt is intentionally not used: its app:rendered SSR-payload hook
  // crashes on every SSR render on this Nuxt version (nuxtApp.$pinia is
  // undefined when the hook fires, even on a page with zero store usage).
  // Our stores hold only client-side UI state that needs no SSR hydration,
  // so Pinia is installed manually via app/plugins/pinia.ts instead.
  imports: {
    dirs: ['stores']
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  // No routeRules prerender here: this Nuxt/Nitro version's prerender
  // crawler crashes deterministically on any route (confirmed independent
  // of this project's code, reproduced on a from-scratch minimal Nuxt app
  // too) — Vercel's build would hit the same crash if a route is marked
  // prerender: true. Regular per-request SSR (this file's default) is a
  // different, working code path.

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
