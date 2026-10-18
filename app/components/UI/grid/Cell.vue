<template>
  <div
    class="-ml-px -mt-px border border-outline-variant/60 p-4 md:p-(--spacing-cell)"
    :class="[spanClass, interactive && 'transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-primary']"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  interactive?: boolean
}>(), {
  span: 12,
  interactive: false
})

// Full class names (not interpolated) so Tailwind's scanner can see them.
const spanClasses = {
  1: 'col-span-12 md:col-span-1',
  2: 'col-span-12 md:col-span-2',
  3: 'col-span-12 md:col-span-3',
  4: 'col-span-12 md:col-span-4',
  5: 'col-span-12 md:col-span-5',
  6: 'col-span-12 md:col-span-6',
  7: 'col-span-12 md:col-span-7',
  8: 'col-span-12 md:col-span-8',
  9: 'col-span-12 md:col-span-9',
  10: 'col-span-12 md:col-span-10',
  11: 'col-span-12 md:col-span-11',
  12: 'col-span-12'
} as const

const spanClass = computed(() => spanClasses[props.span])
</script>
