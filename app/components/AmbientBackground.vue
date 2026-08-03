<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
    <div
      ref="heroGlow"
      class="absolute inset-0 origin-top-left opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,226,134,0.16),transparent_60%)]"
    />
    <div
      ref="experienceGlow"
      class="absolute inset-0 origin-bottom-right opacity-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,217,126,0.14),transparent_55%)]"
    />
    <div
      ref="projectsGlow"
      class="absolute inset-0 origin-top opacity-0 bg-[radial-gradient(ellipse_at_top,rgba(90,255,162,0.12),transparent_65%)]"
    />
    <div
      ref="contactGlow"
      class="absolute inset-0 origin-center opacity-0 bg-[radial-gradient(circle_at_center,rgba(34,226,134,0.10),transparent_70%)]"
    />
    <div
      ref="travelGlow"
      class="pointer-events-none absolute left-0 top-0 size-[46vmin] rounded-full opacity-0 blur-3xl bg-[radial-gradient(circle,rgba(34,226,134,0.22),transparent_70%)]"
    />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

interface GlowTransition {
  enter: { from: gsap.TweenVars, to: gsap.TweenVars }
  exit: gsap.TweenVars
}

const TRANSITIONS: GlowTransition[] = [
  {
    enter: {
      from: { opacity: 0, scale: 0.94 },
      to: { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
    },
    exit: { opacity: 0, scale: 1.05, duration: 0.85, ease: 'power2.in' }
  },
  {
    enter: {
      from: { opacity: 0, scale: 0.9 },
      to: { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.6)' }
    },
    exit: { opacity: 0, scale: 1.06, duration: 0.9, ease: 'power2.in' }
  },
  {
    enter: {
      from: { opacity: 0, scale: 0.92 },
      to: { opacity: 1, scale: 1, duration: 0.95, ease: 'expo.out' }
    },
    exit: { opacity: 0, scale: 1.04, duration: 0.85, ease: 'power2.in' }
  },
  {
    enter: {
      from: { opacity: 0, scale: 0.96 },
      to: { opacity: 1, scale: 1, duration: 1.1, ease: 'sine.inOut' }
    },
    exit: { opacity: 0, scale: 1.03, duration: 1, ease: 'sine.inOut' }
  }
]

const ANCHORS = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 0.5, y: 0 },
  { x: 0.5, y: 0.5 }
]

const SCROLL_DURATION = 1
const SCROLL_EASE = 'power2.inOut'
const ARRIVAL_DELAY = SCROLL_DURATION * 0.55

const store = useNavigationStore()

const heroGlow = ref<HTMLDivElement>()
const experienceGlow = ref<HTMLDivElement>()
const projectsGlow = ref<HTMLDivElement>()
const contactGlow = ref<HTMLDivElement>()
const travelGlow = ref<HTMLDivElement>()

const layers = [heroGlow, experienceGlow, projectsGlow, contactGlow]

onMounted(() => {
  if (!travelGlow.value) return
  gsap.set(travelGlow.value, { xPercent: -50, yPercent: -50 })
})

watch(() => store.currentIndex, (next, prev) => {
  const outgoing = layers[prev]?.value
  const outgoingTransition = TRANSITIONS[prev]
  const outgoingAnchor = ANCHORS[prev]
  const incoming = layers[next]?.value
  const incomingTransition = TRANSITIONS[next]
  const incomingAnchor = ANCHORS[next]

  if (outgoing && outgoingTransition) {
    gsap.killTweensOf(outgoing)
    gsap.to(outgoing, outgoingTransition.exit)
  }
  if (incoming && incomingTransition) {
    gsap.killTweensOf(incoming)
    gsap.fromTo(incoming, incomingTransition.enter.from, { ...incomingTransition.enter.to, delay: ARRIVAL_DELAY })
  }
  if (travelGlow.value && outgoingAnchor && incomingAnchor) {
    const el = travelGlow.value
    gsap.killTweensOf(el)
    gsap.set(el, { x: `${outgoingAnchor.x * 100}vw`, y: `${outgoingAnchor.y * 100}vh`, opacity: 0 })
    gsap.to(el, { x: `${incomingAnchor.x * 100}vw`, y: `${incomingAnchor.y * 100}vh`, duration: SCROLL_DURATION, ease: SCROLL_EASE })
    gsap.to(el, { opacity: 1, duration: 0.18, ease: 'power1.out' })
    gsap.to(el, { opacity: 0, duration: 0.25, delay: SCROLL_DURATION - 0.25, ease: 'power1.in' })
  }
})
</script>
