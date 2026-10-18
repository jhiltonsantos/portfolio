<template>
  <section
    id="experiencias"
    class="relative z-10 min-h-dvh md:h-dvh"
  >
    <div class="mx-auto flex min-h-dvh max-w-(--spacing-container-max) flex-col justify-center px-5 py-6 md:h-full md:min-h-0 md:px-16 md:py-6">
      <UIGrid class="min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)]">
        <UIGridCell class="flex flex-col gap-2">
          <UIGridLabel>{{ t('experience.eyebrow') }}</UIGridLabel>
          <h2 class="text-headline-md text-on-surface">
            {{ t('experience.heading') }}
          </h2>
        </UIGridCell>

        <ul class="col-span-12 hidden min-h-0 grid-cols-2 grid-rows-2 md:grid">
          <li
            v-for="experience in experiences"
            :key="experience.role + experience.company"
            class="flex"
          >
            <ExperienceCard
              :experience="experience"
              class="flex-1"
            />
          </li>
        </ul>

        <ul
          ref="carouselRef"
          data-carousel
          class="col-span-12 flex min-h-0 touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth md:hidden"
        >
          <li
            v-for="(pair, index) in experiencePairs"
            :key="index"
            class="grid w-[85vw] shrink-0 snap-center snap-always grid-rows-2"
          >
            <ExperienceCard
              v-for="experience in pair"
              :key="experience.role + experience.company"
              :experience="experience"
              class="min-h-72"
            />
          </li>
        </ul>
      </UIGrid>
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
    company: 'Grupo Portfolio',
    period: '2026 — Presente',
    tags: [
      { name: 'Kotlin', icon: 'i-simple-icons-kotlin' },
      { name: 'Quarkus', icon: 'i-simple-icons-quarkus' },
      { name: 'Angular', icon: 'i-simple-icons-angular' }
    ]
  },
  {
    company: 'Defsafe/Skill5',
    period: '2024 — 2026',
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

// Mobile carousel: two stacked cards per slide, drag sideways for the other two
const experiencePairs = computed(() => {
  const pairs: (typeof experiences.value)[] = []
  for (let i = 0; i < experiences.value.length; i += 2) pairs.push(experiences.value.slice(i, i + 2))
  return pairs
})
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
