<template>
  <nav class="flex items-center justify-end gap-8 md:gap-6">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="text-body-md text-on-surface/80 transition-colors hover:text-primary"
      @click.prevent="store.goToId(link.id)"
    >
      {{ link.label }}
    </NuxtLink>
    <LanguageSwitch class="z-10 hidden md:flex" />
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
</script>
