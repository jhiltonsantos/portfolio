<template>
  <nav class="flex items-center justify-end gap-8 md:gap-6">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="hidden text-body-md text-on-surface/80 transition-colors hover:text-primary md:inline"
      @click.prevent="store.goToId(link.id)"
    >
      {{ link.label }}
    </NuxtLink>
    <UILanguageSwitch class="z-10 hidden md:flex" />

    <UDropdownMenu
      :items="menuItems"
      :content="{ align: 'end' }"
      class="md:hidden"
    >
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        :aria-label="t('nav.menu')"
      />

      <template #language>
        <div class="flex justify-center px-2 py-1.5">
          <UILanguageSwitch />
        </div>
      </template>
    </UDropdownMenu>
  </nav>
</template>

<script setup lang="ts">
const store = useNavigationStore()
const { t } = useI18n()

const links = computed(() => [
  { label: t('nav.experiences'), to: '#experiencias', id: 'experiencias' },
  { label: t('nav.projects'), to: '#projetos', id: 'projetos' },
  { label: t('nav.contact'), to: '#contato', id: 'contato' }
])

const menuItems = computed(() => [
  ...links.value.map(link => ({ label: link.label, onSelect: () => store.goToId(link.id) })),
  { type: 'separator' as const },
  { slot: 'language' as const }
])
</script>
