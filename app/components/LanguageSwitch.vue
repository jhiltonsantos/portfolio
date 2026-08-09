<template>
  <div class="flex flex-row items-center gap-3">
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="flex size-6 items-center justify-center overflow-hidden rounded-md ring-1 ring-outline-variant transition-opacity"
      :class="locale === option.code ? 'opacity-100 ring-primary' : 'opacity-50 hover:opacity-90'"
      :aria-label="option.label"
      :aria-pressed="locale === option.code"
      @click="setLocale(option.code)"
    >
      <UIcon
        :name="option.icon"
        class="size-full"
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
