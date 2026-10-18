<template>
  <span
    aria-hidden="true"
    class="inline-flex items-center gap-3 md:gap-4"
  >
    <UIcon
      name="i-lucide-arrow-up-right"
      class="size-16 shrink-0 text-primary md:size-24"
    />
    <span class="inline-flex flex-col gap-1 text-xl font-medium uppercase tracking-widest md:text-3xl">
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

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.from(roleEls.value, {
    y: 24,
    opacity: 0,
    duration: 0.6,
    delay: 0.3,
    stagger: 0.25,
    ease: 'power3.out'
  })
})
</script>
