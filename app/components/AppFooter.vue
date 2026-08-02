<script setup lang="ts">
const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hilton-placeholder' },
  { label: 'Github', href: 'https://github.com/hilton-placeholder' },
  { label: 'Substack', href: 'https://hilton-placeholder.substack.com' }
]
</script>

<template>
  <footer class="border-t border-outline-variant/40">
    <div class="mx-auto flex max-w-(--spacing-container-max) flex-col items-center gap-6 px-5 py-8 md:flex-row md:justify-between md:px-16">
      <AppLogo />

      <nav class="flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-body-md text-on-surface-variant transition-colors hover:text-primary"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <p class="text-label-caps uppercase text-on-surface-variant">
        © {{ new Date().getFullYear() }} Hilton Santos
      </p>
    </div>
  </footer>
</template>
