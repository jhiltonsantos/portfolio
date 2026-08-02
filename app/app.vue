<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

const title = 'Hilton Santos — Desenvolvedor Fullstack'
const description = 'Desenvolvedor fullstack focado em criar experiências digitais de alta performance e precisão técnica.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <CustomCursor />
    <NuxtPage />
  </UApp>
</template>
