<template>
  <UApp>
    <CustomCursor />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
const { t } = useI18n()
const head = useLocaleHead()

useHead({
  htmlAttrs: {
    lang: () => head.value.htmlAttrs?.lang
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  twitterCard: 'summary_large_image'
})
</script>
