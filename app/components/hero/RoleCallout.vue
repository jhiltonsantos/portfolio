<template>
  <span
    aria-hidden="true"
    class="inline-flex items-center gap-3 md:gap-4"
  >
    <svg
      ref="arrowEl"
      viewBox="0.94 0.5 22.6 22.6"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      class="ml-1 size-14 shrink-0 text-primary md:ml-2 md:size-20"
    >
      <path d="M2 22 22 2M6 2h16v16" />
    </svg>
    <span class="inline-flex flex-col gap-1 text-lg font-medium uppercase tracking-widest md:text-xl lg:text-2xl">
      <span
        v-for="(role, index) in roles"
        :key="role"
        ref="roleEls"
        :class="index === 0 ? 'text-on-surface' : index === 1 ? 'text-on-surface-variant' : 'text-outline'"
      >
        {{ role }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const { tm, rt } = useI18n()

const roles = computed(() => (tm('hero.roles') as string[]).map(role => rt(role)))

const roleEls = ref<HTMLElement[]>([])
const arrowEl = ref<SVGSVGElement | null>(null)

let timeline: gsap.core.Timeline | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // The arrow slides in along its own diagonal, then the roles rise in one by
  // one; after a hold everything fades out (arrow continues up-right) and the
  // cycle repeats after a pause.
  timeline = gsap.timeline({ repeat: -1, repeatDelay: 2.5, delay: 0.3 })
    .fromTo(
      arrowEl.value,
      { x: -28, y: 28, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      roleEls.value,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.35, ease: 'power3.out' },
      '-=0.5'
    )
    .addLabel('out', '+=3')
    .to(roleEls.value, { y: -16, opacity: 0, duration: 0.4, stagger: 0.15, ease: 'power2.in' }, 'out')
    .to(arrowEl.value, { x: 28, y: -28, opacity: 0, duration: 0.5, ease: 'power2.in' }, 'out')
})

onUnmounted(() => {
  timeline?.kill()
})
</script>
