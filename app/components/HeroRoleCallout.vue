<template>
  <span
    aria-hidden="true"
    class="absolute right-0 top-full mt-2 inline-flex items-center gap-1.5 md:mt-3 md:gap-2"
  >
    <UIcon
      name="i-lucide-arrow-down-right"
      class="size-10 shrink-0 pb-1 text-primary md:size-16 md:pb-1.5"
    />
    <span class="inline-flex flex-col gap-1 text-label-caps uppercase">
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
</script>
