<template>
  <span
    ref="rootEl"
    aria-hidden="true"
    class="absolute top-full mt-2 inline-flex items-center gap-1.5 md:mt-3 md:gap-2"
    :class="flipped ? 'left-0 flex-row-reverse' : 'right-0 flex-row'"
  >
    <UIcon
      :name="flipped ? 'i-lucide-arrow-down-left' : 'i-lucide-arrow-down-right'"
      class="size-10 shrink-0 pb-1 text-primary md:size-16 md:pb-1.5"
    />
    <span
      class="inline-flex flex-col gap-1 text-label-caps uppercase"
      :class="flipped ? 'items-end' : 'items-start'"
    >
      <span
        v-for="(role, index) in roles"
        :key="role"
        :class="index === 0 ? 'text-on-surface' : index === 1 ? 'text-on-surface-variant' : 'text-outline'"
      >
        {{ role }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
const { tm, rt } = useI18n()

const roles = computed(() => (tm('hero.roles') as string[]).map(role => rt(role)))

const rootEl = useTemplateRef<HTMLSpanElement>('rootEl')
const flipped = ref(false)

function checkOverflow() {
  const el = rootEl.value
  const anchor = el?.parentElement
  if (!el || !anchor) return

  const anchorRight = anchor.getBoundingClientRect().right
  const calloutWidth = el.getBoundingClientRect().width
  const margin = window.innerWidth >= 768 ? 64 : 20

  flipped.value = anchorRight - calloutWidth < margin
}

let observer: ResizeObserver | undefined

onMounted(() => {
  checkOverflow()

  // Only observe the stable anchor ("Hilton.", never translated so its size
  // only changes across the md breakpoint's font jump) — not the callout's
  // own root. Observing the element whose classes we toggle based on its
  // own measured size risks a ResizeObserver feedback loop if flipping ever
  // produces even a sub-pixel width difference (e.g. flex-row vs
  // flex-row-reverse rounding).
  const anchor = rootEl.value?.parentElement
  if (anchor) {
    observer = new ResizeObserver(() => checkOverflow())
    observer.observe(anchor)
  }

  window.addEventListener('resize', checkOverflow)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('resize', checkOverflow)
})
</script>
