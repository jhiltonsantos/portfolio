<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
    <div
      ref="heroGlow"
      class="absolute inset-0 origin-top-left opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,226,134,0.06),transparent_60%)]"
    />
    <div
      ref="experienceGlow"
      class="absolute inset-0 origin-bottom-right opacity-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,217,126,0.05),transparent_55%)]"
    />
    <div
      ref="projectsGlow"
      class="absolute inset-0 origin-top opacity-0 bg-[radial-gradient(ellipse_at_top,rgba(90,255,162,0.045),transparent_65%)]"
    />
    <div
      ref="contactGlow"
      class="absolute inset-0 origin-center opacity-0 bg-[radial-gradient(circle_at_center,rgba(34,226,134,0.04),transparent_70%)]"
    />
    <div
      ref="travelGlow"
      class="pointer-events-none absolute left-0 top-0 size-[46vmin] rounded-full opacity-0 blur-3xl bg-[radial-gradient(circle,rgba(34,226,134,0.08),transparent_70%)]"
    />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

// Below md the page scrolls natively (no fullpage), so the glows follow the
// scroll position instead of switching when the active section changes.
const MOBILE_QUERY = '(max-width: 767px)'

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

let mm: gsap.MatchMedia | undefined

function isScrollLinked() {
  return window.matchMedia(MOBILE_QUERY).matches && !prefersReducedMotion()
}

// Snap every layer to the resting state of one section (used when switching
// between the scroll-linked and the section-switch modes).
function showSection(index: number) {
  layers.forEach((layer, i) => {
    if (layer.value) gsap.set(layer.value, { opacity: i === index ? 1 : 0, scale: 1 })
  })
  if (travelGlow.value) gsap.set(travelGlow.value, { opacity: 0 })
}

onMounted(() => {
  const travel = travelGlow.value
  if (!travel) return
  gsap.registerPlugin(ScrollTrigger)
  gsap.set(travel, { xPercent: -50, yPercent: -50 })

  mm = gsap.matchMedia()
  mm.add({ isMobile: MOBILE_QUERY, reduceMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
    const { isMobile, reduceMotion } = context.conditions as { isMobile: boolean, reduceMotion: boolean }
    if (!isMobile || reduceMotion) {
      showSection(store.currentIndex)
      return
    }

    // A single ScrollTrigger derives the glow state from the scroll position.
    // Each section boundary blends while the next section travels from the
    // bottom of the viewport to its top (the last one until the end of the
    // page, since it can be shorter than the viewport); scrolling up plays it
    // backwards. Short tweens smooth the per-frame updates.
    const smooth = { duration: 0.4, ease: 'power1.out', overwrite: 'auto' as const }

    function render() {
      const y = window.scrollY
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      let base = 0
      let blend: { from: number, progress: number } | null = null

      for (let i = 0; i < layers.length - 1; i++) {
        const next = document.getElementById(store.sections[i + 1]!.id)
        if (!next) continue
        const start = next.offsetTop - window.innerHeight
        const end = i === layers.length - 2 ? Math.min(next.offsetTop, maxY) : next.offsetTop
        const progress = gsap.utils.clamp(0, 1, (y - start) / Math.max(1, end - start))
        if (progress >= 1) base = i + 1
        else if (progress > 0 && !blend) blend = { from: i, progress }
      }

      layers.forEach((layer, i) => {
        if (!layer.value) return
        let opacity = i === base ? 1 : 0
        let scale = 1
        if (blend && i === blend.from) {
          opacity = 1 - blend.progress
          scale = gsap.utils.interpolate(1, TRANSITIONS[i]!.exit.scale as number, blend.progress)
        } else if (blend && i === blend.from + 1) {
          opacity = blend.progress
          scale = gsap.utils.interpolate(TRANSITIONS[i]!.enter.from.scale as number, 1, blend.progress)
        } else if (blend) {
          opacity = 0
        }
        gsap.to(layer.value, { opacity, scale, ...smooth })
      })

      if (blend) {
        const from = ANCHORS[blend.from]!
        const to = ANCHORS[blend.from + 1]!
        const eased = gsap.parseEase(SCROLL_EASE)(blend.progress)
        gsap.to(travel!, {
          x: `${gsap.utils.interpolate(from.x, to.x, eased) * 100}vw`,
          y: `${gsap.utils.interpolate(from.y, to.y, eased) * 100}vh`,
          opacity: blend.progress < 0.5 ? blend.progress * 2 : (1 - blend.progress) * 2,
          ...smooth
        })
      } else {
        gsap.to(travel!, { opacity: 0, ...smooth })
      }
    }

    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: render, onRefresh: render })
    render()
  })
})

onUnmounted(() => mm?.revert())

watch(() => store.currentIndex, (next, prev) => {
  // Mobile: the scrubbed timelines above already drive the glows
  if (isScrollLinked()) return

  const outgoing = layers[prev]?.value
  const outgoingTransition = TRANSITIONS[prev]
  const outgoingAnchor = ANCHORS[prev]
  const incoming = layers[next]?.value
  const incomingTransition = TRANSITIONS[next]
  const incomingAnchor = ANCHORS[next]

  // Reduced motion: swap the glow layers instantly, no travelling glow
  if (prefersReducedMotion()) {
    if (outgoing) gsap.set(outgoing, { opacity: 0, scale: 1 })
    if (incoming) gsap.set(incoming, { opacity: 1, scale: 1 })
    return
  }

  layers.forEach((layer, i) => {
    if (layer.value && i !== prev && i !== next) {
      gsap.killTweensOf(layer.value)
      gsap.set(layer.value, { opacity: 0, scale: 1 })
    }
  })

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
