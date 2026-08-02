// Some dependencies (e.g. pinia's published build) reference Vue's prod
// feature-flag globals directly, expecting a bundler to have replaced them
// at build time. Nitro's Vercel preset copies certain packages into the
// function's node_modules as raw files rather than inlining them, so that
// replacement never happens and the bare reference throws "is not defined"
// at runtime. Setting them here, as early as possible in the server
// lifecycle, covers any dependency relying on these globals existing.
//
// The property names are assembled at runtime (not written as literal
// `__VUE_X__` identifiers) because Nuxt's own Vite config already defines
// those exact identifiers project-wide — writing them literally here would
// get text-replaced by that define too, turning this into a no-op.
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
