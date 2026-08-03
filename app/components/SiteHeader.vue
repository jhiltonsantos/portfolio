<template>
  <nav class="flex items-center justify-end gap-8 md:gap-10">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="text-body-md text-on-surface/80 transition-colors hover:text-primary"
      @click.prevent="store.goToId(link.id)"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const store = useNavigationStore()

const links = [
  { label: 'Experiências', to: '#experiencias', id: 'experiencias' },
  { label: 'Projetos', to: '#projetos', id: 'projetos' },
  { label: 'Contate-me', to: '#contato', id: 'contato' }
]
</script>
