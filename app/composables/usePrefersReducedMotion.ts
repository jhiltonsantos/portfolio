// Evaluated at call time (not cached) so a changed OS setting is picked up on the next animation.
export function prefersReducedMotion() {
  return import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
