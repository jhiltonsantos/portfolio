<script setup lang="ts">
import { gsap } from 'gsap'

const store = useNavigationStore()

const heroGlow = ref<HTMLDivElement>()
const experienceGlow = ref<HTMLDivElement>()
const projectsGlow = ref<HTMLDivElement>()
const contactGlow = ref<HTMLDivElement>()

const layers = [heroGlow, experienceGlow, projectsGlow, contactGlow]

watch(() => store.currentIndex, (next, prev) => {
  const outgoing = layers[prev]?.value
  const incoming = layers[next]?.value

  if (outgoing) {
    gsap.to(outgoing, { opacity: 0, scale: 1.08, duration: 1, ease: 'power2.inOut' })
  }
  if (incoming) {
    gsap.fromTo(
      incoming,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }
    )
  }
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
    <div
      ref="heroGlow"
      class="absolute inset-0 opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,226,134,0.16),transparent_60%)]"
    />
    <div
      ref="experienceGlow"
      class="absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,217,126,0.14),transparent_55%)]"
    />
    <div
      ref="projectsGlow"
      class="absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_at_top,rgba(90,255,162,0.12),transparent_65%)]"
    />
    <div
      ref="contactGlow"
      class="absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_center,rgba(34,226,134,0.10),transparent_70%)]"
    />
  </div>
</template>
