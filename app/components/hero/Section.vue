<template>
  <section
    id="hero"
    class="relative min-h-screen overflow-hidden"
  >
    <div class="mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col px-5 py-6 md:px-16 md:py-10">
      <UIGrid class="flex-1 md:grid-rows-[auto_auto_auto_1fr_auto]">
        <UILayoutHeader cta />

        <UIGridCell class="overflow-hidden">
          <h1 class="text-display-lg-mobile uppercase text-on-surface md:text-display-xl">
            Hilton
          </h1>
        </UIGridCell>

        <UIGridCell
          :span="5"
          class="flex flex-col justify-between gap-8 md:row-span-2"
        >
          <div class="flex flex-wrap items-center justify-between gap-2">
            <UIGridLabel>{{ t('hero.intro') }}</UIGridLabel>
            <UIGridLabel>{{ t('hero.location') }}</UIGridLabel>
          </div>

          <HeroRoleCallout />
        </UIGridCell>

        <UIGridCell :span="7">
          <p class="text-body-lg text-balance text-on-surface-variant">
            {{ t('hero.bio') }}
          </p>
        </UIGridCell>

        <UIGridCell
          :span="7"
          class="flex flex-col items-start justify-between gap-6"
        >
          <div class="flex flex-col gap-3">
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

          <UButton
            :label="t('hero.cta')"
            trailing-icon="i-lucide-arrow-up-right"
            color="primary"
            size="xl"
            class="rounded-none"
            @click="store.goToId('projetos')"
          />
        </UIGridCell>

        <UIGridCell class="relative flex h-24 items-end overflow-hidden md:h-32">
          <div
            class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[24px_24px] mask-[linear-gradient(to_bottom,black,transparent)]"
          />
          <UIGridLabel class="relative">
            {{ t('hero.scrollHint') }}
          </UIGridLabel>
        </UIGridCell>
      </UIGrid>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const store = useNavigationStore()

const stackRows = [
  [
    { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
    { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
    { name: 'React', icon: 'i-simple-icons-react' },
    { name: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
    { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
    { name: 'Nuxt', icon: 'i-simple-icons-nuxt' },
    { name: 'Angular', icon: 'i-simple-icons-angular' },
    { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' }
  ],
  [
    { name: 'Python', icon: 'i-simple-icons-python' },
    { name: 'FastAPI', icon: 'i-simple-icons-fastapi' },
    { name: 'Django', icon: 'i-simple-icons-django' },
    { name: 'Java', icon: 'i-simple-icons-openjdk' },
    { name: 'Kotlin', icon: 'i-simple-icons-kotlin' },
    { name: 'Docker', icon: 'i-simple-icons-docker' },
    { name: 'Kubernetes', icon: 'i-simple-icons-kubernetes' },
    { name: 'AWS', icon: 'i-simple-icons-amazonwebservices' }
  ]
]
</script>
