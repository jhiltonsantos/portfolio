export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    tooltip: {
      slots: {
        content: 'rounded-none bg-surface-container-high font-mono text-on-surface ring-outline-variant',
        arrow: 'fill-surface-container-high stroke-outline-variant'
      }
    }
  }
})
