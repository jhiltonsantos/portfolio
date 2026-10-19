<template>
  <section
    id="experiencias"
    class="relative z-10 md:h-dvh md:min-h-dvh"
  >
    <div class="mx-auto flex max-w-(--spacing-container-max) flex-col justify-center px-5 py-6 md:h-full md:min-h-0 md:px-16 md:py-6">
      <UIGrid class="min-h-0 flex-1 md:grid-rows-[auto_minmax(0,1fr)]">
        <UIGridCell class="flex flex-col gap-2">
          <UIGridLabel>{{ t('experience.eyebrow') }}</UIGridLabel>
          <h2 class="text-headline-md text-on-surface">
            {{ t('experience.heading') }}
          </h2>
        </UIGridCell>

        <!-- Each card row has 4 tracks (top · empty · title · description); cards span them with
             subgrid so titles line up and the longest description sets the height. -->
        <ul class="col-span-12 flex flex-col md:grid md:min-h-0 md:grid-cols-12 md:grid-rows-[auto_1fr_auto_auto_auto_1fr_auto_auto]">
          <li
            v-for="experience in experiences"
            :key="experience.role + experience.company"
            class="flex md:contents"
          >
            <ExperienceCard
              :experience="experience"
              :span="6"
              class="flex-1"
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
</script>
