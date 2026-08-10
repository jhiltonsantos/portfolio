<template>
  <section
    id="experiencias"
    class="relative z-10 min-h-screen"
  >
    <div class="mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col justify-center gap-10 px-5 py-24 md:px-16">
      <div class="flex flex-col gap-2">
        <span class="text-label-caps uppercase text-primary">{{ t('experience.eyebrow') }}</span>
        <h2 class="text-headline-md text-on-surface">
          {{ t('experience.heading') }}
        </h2>
      </div>

      <ul class="hidden flex-col gap-4 md:flex">
        <li
          v-for="experience in experiences"
          :key="experience.role"
        >
          <ExperienceCard :experience="experience" />
        </li>
      </ul>

      <ul
        ref="carouselRef"
        data-carousel
        class="-mx-5 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 md:hidden"
      >
        <li
          v-for="experience in experiences"
          :key="experience.role"
          class="w-[85vw] shrink-0 snap-center snap-always"
        >
          <ExperienceCard
            :experience="experience"
            class="h-full"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ExperienceTag {
  name: string
  icon: string
}

interface ExperienceMeta {
  company: string
  period: string
  tags: ExperienceTag[]
}

const { t } = useI18n()
const { carouselRef } = useCarouselDragHint('experiencias')
useCarouselSectionSwipe(carouselRef)

const experienceMeta: ExperienceMeta[] = [
  {
    company: 'Defsafe/Skill5',
    period: '2024 — Presente',
    tags: [
      { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { name: 'Nuxt 3', icon: 'i-simple-icons-nuxt' },
      { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
      { name: 'AWS', icon: 'i-simple-icons-amazonwebservices' }
    ]
  },
  {
    company: 'Fido',
    period: '2023 — 2024',
    tags: [
      { name: 'React', icon: 'i-simple-icons-react' },
      { name: 'React Native', icon: 'i-lucide-smartphone' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
      { name: 'Redux', icon: 'i-simple-icons-redux' }
    ]
  },
  {
    company: 'Instituto Dom Barreto',
    period: '2019 — 2023',
    tags: [
      { name: 'Python', icon: 'i-simple-icons-python' },
      { name: 'Django REST', icon: 'i-simple-icons-django' },
      { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
      { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
      { name: 'HTML5', icon: 'i-simple-icons-html5' },
      { name: 'CSS3', icon: 'i-simple-icons-css3' }
    ]
  }
]

const experiences = computed(() => experienceMeta.map((meta, index) => ({
  ...meta,
  role: t(`experience.items.${index}.role`),
  description: t(`experience.items.${index}.description`)
})))
</script>

<style scoped>
[data-carousel] {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
[data-carousel]::-webkit-scrollbar {
  display: none;
}
</style>
