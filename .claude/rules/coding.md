# Coding

- **Tailwind only in templates.** Components and pages must be styled exclusively with Tailwind CSS utility classes in the `<template>` block. No `<style>` blocks (scoped or otherwise), no inline `style` attributes, and no hand-written CSS files for component-level styling. All design tokens (colors, typography, spacing, radius, shadows) come from the Tailwind theme configured in `app/assets/css/main.css` and `app/assets/css/variables.css` — use the generated utility classes (e.g. `bg-surface`, `text-primary`, `text-display-lg`) rather than raw CSS variables or arbitrary hex values.
