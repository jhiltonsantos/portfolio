<template>
  <div class="pointer-events-none fixed inset-0 z-[100] hidden md:block">
    <div
      ref="cursorDot"
      class="fixed left-0 top-0 size-2 rounded-full bg-primary"
    />
    <div
      ref="cursorRing"
      class="fixed left-0 top-0 rounded-full border border-primary shadow-glow-primary transition-[width,height] duration-200"
      :class="isHovering ? 'size-12' : 'size-8'"
    />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const cursorDot = ref<HTMLDivElement>()
const cursorRing = ref<HTMLDivElement>()
const isHovering = ref(false)

onMounted(() => {
  if (!cursorDot.value || !cursorRing.value) return

  gsap.set([cursorDot.value, cursorRing.value], { xPercent: -50, yPercent: -50 })

  const dotX = gsap.quickTo(cursorDot.value, 'x', { duration: 0.15, ease: 'power3.out' })
  const dotY = gsap.quickTo(cursorDot.value, 'y', { duration: 0.15, ease: 'power3.out' })
  const ringX = gsap.quickTo(cursorRing.value, 'x', { duration: 0.45, ease: 'power3.out' })
  const ringY = gsap.quickTo(cursorRing.value, 'y', { duration: 0.45, ease: 'power3.out' })

  function onMouseMove(event: MouseEvent) {
    dotX(event.clientX)
    dotY(event.clientY)
    ringX(event.clientX)
    ringY(event.clientY)
  }

  function onPointerOver(event: PointerEvent) {
    isHovering.value = !!(event.target as HTMLElement).closest('a, button, [role="button"]')
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('pointerover', onPointerOver)

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('pointerover', onPointerOver)
  })
})
</script>
