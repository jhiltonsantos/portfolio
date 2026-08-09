<template>
  <div class="fixed bottom-8 right-5 z-50 flex flex-col gap-3 md:right-16">
    <UButton
      icon="i-lucide-chevron-up"
      color="neutral"
      variant="outline"
      size="lg"
      :disabled="store.isFirst || store.isAnimating"
      class="rounded-full border-outline-variant text-on-surface hover:border-primary hover:text-primary disabled:opacity-30"
      :aria-label="t('sectionNav.prev')"
      @click="store.prev()"
    />
    <UButton
      icon="i-lucide-chevron-down"
      color="neutral"
      variant="outline"
      size="lg"
      :disabled="store.isLast || store.isAnimating"
      class="rounded-full border-outline-variant text-on-surface hover:border-primary hover:text-primary disabled:opacity-30"
      :aria-label="t('sectionNav.next')"
      @click="store.next()"
    />
  </div>
</template>

<script setup lang="ts">
const store = useNavigationStore()
const { t } = useI18n()
</script>
