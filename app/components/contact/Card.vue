<template>
  <UButton
    :to="contact.href"
    :target="contact.external ? '_blank' : undefined"
    :rel="contact.external ? 'noopener noreferrer' : undefined"
    variant="ghost"
    color="neutral"
    class="relative -ml-px -mt-px h-full w-full min-w-0 flex-1 items-stretch justify-start rounded-none border border-outline-variant/60 p-0 font-normal lowercase text-on-surface transition-colors hover:z-10 hover:border-primary hover:bg-transparent hover:text-on-surface focus-visible:outline-2 focus-visible:outline-primary"
  >
    <slot name="contact-icon">
      <div class="grid h-full w-full min-w-0 grid-cols-[auto_1fr_auto] divide-x divide-outline-variant/60 md:grid-cols-[10rem_1fr_auto]">
        <div class="flex items-center gap-3 p-4 md:px-(--spacing-cell)">
          <UIcon
            :name="contact.icon"
            class="size-5 shrink-0 text-primary"
          />
          <UIGridLabel class="hidden md:inline">
            {{ contact.label }}
          </UIGridLabel>
        </div>

        <div class="flex min-w-0 items-center p-4 md:px-(--spacing-cell)">
          <span class="w-full truncate text-body-md text-on-surface 2xl:text-lg">{{ contact.value }}</span>
        </div>

        <div class="flex items-center p-4 md:px-(--spacing-cell)">
          <UButton
            icon="i-lucide-copy"
            variant="ghost"
            color="neutral"
            size="lg"
            square
            :ui="{ leadingIcon: 'size-5' }"
            class="shrink-0 rounded bg-transparent text-on-surface-variant transition-all duration-200 ease-out hover:scale-125 hover:bg-transparent hover:text-primary focus-visible:outline-primary"
            :aria-label="t('contact.copy')"
            @click.stop.prevent="copyValue(contact.value)"
          />
        </div>
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
