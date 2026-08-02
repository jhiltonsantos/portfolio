// Some dependencies (e.g. pinia's published build) reference Vue's prod
// feature-flag globals directly, expecting a bundler to have replaced them
// at build time. Nitro's Vercel preset copies certain packages into the
// function's node_modules as raw files rather than inlining them, so that
// replacement never happens and the bare reference throws "is not defined"
// at runtime. Setting them here, as early as possible in the server
// lifecycle, covers any dependency relying on these globals existing.
export default defineNitroPlugin(() => {
  const globals = globalThis as Record<string, unknown>
  globals.__VUE_PROD_DEVTOOLS__ ??= false
  globals.__VUE_OPTIONS_API__ ??= true
  globals.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ ??= false
})
