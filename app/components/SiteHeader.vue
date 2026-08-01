<script setup lang="ts">
const links = [
  { label: 'Experiências', to: '#experiencias' },
  { label: 'Projetos', to: '#projetos' },
  { label: 'Contate-me', to: '#contato' }
]
</script>

<template>
  <nav class="flex items-center justify-end gap-8 md:gap-10">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="text-body-md text-on-surface/80 transition-colors hover:text-primary"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>
