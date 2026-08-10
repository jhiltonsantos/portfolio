<template>
  <UButton
    :to="contact.href"
    :target="contact.external ? '_blank' : undefined"
    :rel="contact.external ? 'noopener noreferrer' : undefined"
    :icon="contact.icon"
    variant="outline"
    color="neutral"
    size="xl"
    class="min-w-0 flex-1 justify-start gap-4 border-outline-variant bg-transparent text-on-surface hover:border-primary hover:text-primary hover:bg-on-primary-fixed-variant/20"
  >
    <slot name="contact-icon">
      <div class="flex w-full min-w-0 flex-row items-center justify-between">
        <div class="flex min-w-0 flex-1 flex-col items-start">
          <span class="text-label-caps uppercase text-on-surface-variant">{{ contact.label }}</span>
          <span class="w-full truncate text-body-md">{{ contact.value }}</span>
        </div>
        <UButton
          icon="i-lucide-copy"
          variant="outline"
          color="neutral"
          size="sm"
          square
          class="ml-2 shrink-0 border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
          :aria-label="t('contact.copy')"
          @click.stop.prevent="copyValue(contact.value)"
        />
      </div>
    </slot>
  </UButton>
</template>

<script setup lang="ts">
interface ContactEntry {
  label: string
  value: string
  href: string
  icon: string
  external: boolean
}

defineProps<{
  contact: ContactEntry
}>()

const { t } = useI18n()
const toast = useToast()

async function copyValue(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    toast.add({ title: t('contact.copied'), icon: 'i-lucide-check', color: 'success' })
  } catch {
    toast.add({ title: t('contact.copyError'), icon: 'i-lucide-x', color: 'error' })
  }
}
</script>
