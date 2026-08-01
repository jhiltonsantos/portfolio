<script setup lang="ts">
const roles = ['Desenvolvedor', 'Fullstack', 'Front-end']
</script>

<template>
  <section class="relative min-h-screen overflow-hidden bg-background">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,226,134,0.16),transparent_60%)]"
    />

    <div class="relative mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col px-5 pt-8 md:px-16 md:pt-12">
      <SiteHeader />

      <div class="flex flex-col gap-10 pt-10 md:flex-col md:items-start md:justify-between md:gap-10 md:pt-0">
        <h1 class="text-display-lg-mobile text-on-surface md:text-display-lg">
          Olá.<br>Eu sou o Hilton.
        </h1>

        <div class="flex items-center gap-4 md:mb-2">
          <UIcon
            name="mdi:arrow-top-right-bold-outline"
            class="pb-1.5 size-16 shrink-0 text-primary"
          />
          <div class="h-16 w-0.5 bg-outline-variant" />
          <ul class="flex flex-col gap-1 text-label-caps uppercase">
            <li
              v-for="(role, index) in roles"
              :key="role"
              :class="index === 0 ? 'text-on-surface' : index === 1 ? 'text-on-surface-variant' : 'text-outline'"
            >
              {{ role }}
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-1" />

      <div class="max-w-xl border-t border-outline-variant/40 pb-24 pt-8 md:pb-32">
        <p class="text-body-lg text-on-surface-variant">
          Eu sou desenvolvedor a 6 anos, focado em criar experiências digitais de alta performance e precisão técnica. Especializado em arquiteturas modernas, transformo complexidade em interfaces fluidas e intuitivas.
        </p>
      </div>

      <div class="absolute inset-x-0 bottom-10 flex items-center justify-center gap-4">
        <span class="h-px w-10 bg-primary/60" />
        <span class="text-label-caps text-primary">Role para explorar o trabalho</span>
        <span class="h-px w-10 bg-primary/60" />
      </div>
    </div>
  </section>
</template>
