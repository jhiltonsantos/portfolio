<template>
  <div class="flex flex-row items-center gap-3">
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="flex size-6 items-center justify-center overflow-hidden rounded-md transition-[filter,opacity] focus-visible:outline-2 focus-visible:outline-primary"
      :class="locale === option.code ? 'opacity-100' : 'opacity-40 hover:opacity-70'"
      :aria-label="option.label"
      :aria-pressed="locale === option.code"
      @click="setLocale(option.code)"
    >
      <UIcon
        :name="option.icon"
        class="size-full grayscale"
        :class="locale === option.code ? 'brightness-110' : 'brightness-75'"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const options = [
  { code: 'en' as const, label: 'English', icon: 'i-flagpack-us' },
  { code: 'pt' as const, label: 'Português', icon: 'i-flagpack-br' }
]
</script>
