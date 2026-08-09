<template>
  <section
    id="hero"
    class="relative min-h-screen overflow-hidden"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,226,134,0.16),transparent_60%)]"
    />

    <div class="relative mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col px-5 pt-8 md:px-16 md:pt-12">
      <SiteHeader />

      <div class="flex flex-col gap-6 pt-10 md:gap-4 md:pt-0">
        <h1 class="text-display-lg-mobile text-on-surface md:text-display-lg">
          {{ t('hero.greetingLine1') }}<br>{{ t('hero.namePrefix') }} <span class="relative inline-block">Hilton.<HeroRoleCallout /></span>
        </h1>
      </div>

      <div class="flex-1" />

      <div class="flex flex-col gap-8 pb-24 pt-8 md:flex-row md:items-start md:justify-between md:gap-10 md:pb-32">
        <p class="max-w-xl text-xl text-balance text-on-surface-variant">
          {{ t('hero.bio') }}
        </p>

        <div class="flex flex-col gap-3 items-end self-end">
          <div
            v-for="(row, index) in stackRows"
            :key="index"
            class="flex gap-4"
          >
            <UIcon
              v-for="tech in row"
              :key="tech.name"
              :name="tech.icon"
              :title="tech.name"
              class="size-6 text-primary"
            />
          </div>
        </div>
      </div>

      <div class="absolute inset-x-0 bottom-10 flex items-center justify-center gap-4">
        <span class="h-px w-10 bg-primary/60" />
        <span class="text-label-caps text-primary">{{ t('hero.scrollHint') }}</span>
        <span class="h-px w-10 bg-primary/60" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const stackRows = [
  [
    { name: 'Python', icon: 'i-simple-icons-python' },
    { name: 'FastAPI', icon: 'i-simple-icons-fastapi' },
    { name: 'Django', icon: 'i-simple-icons-django' },
    { name: 'Docker', icon: 'i-simple-icons-docker' },
    { name: 'Kubernetes', icon: 'i-simple-icons-kubernetes' },
    { name: 'AWS', icon: 'i-simple-icons-amazonwebservices' }
  ],
  [
    { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
    { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
    { name: 'React', icon: 'i-simple-icons-react' },
    { name: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
    { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
    { name: 'Nuxt', icon: 'i-simple-icons-nuxt' },
    { name: 'Angular', icon: 'i-simple-icons-angular' },
    { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' }
  ]
]
</script>
