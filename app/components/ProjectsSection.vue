<template>
  <section
    id="projetos"
    class="relative z-10 min-h-screen"
  >
    <div class="mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col justify-center gap-10 px-5 py-24 md:px-16">
      <div class="flex flex-col gap-2">
        <span class="text-label-caps uppercase text-primary">{{ t('projects.eyebrow') }}</span>
        <h2 class="text-headline-md text-on-surface">
          {{ t('projects.heading') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UCard
          v-for="project in projects"
          :key="project.title"
          class="flex h-full flex-col bg-surface-container ring-outline-variant"
          :ui="{ body: 'flex h-full flex-col gap-3' }"
        >
          <p class="text-body-lg font-semibold text-on-surface">
            {{ project.title }}
          </p>
          <p class="flex-1 text-body-md text-on-surface-variant">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <UTooltip
              v-for="tag in project.tags"
              :key="tag.name"
              :text="tag.name"
            >
              <UBadge
                :icon="tag.icon"
                :aria-label="tag.name"
                color="primary"
                variant="soft"
              />
            </UTooltip>
          </div>

          <div class="flex flex-row items-center justify-between">
            <UButton
              v-if="project.link"
              :to="project.link"
              target="_blank"
              rel="noopener noreferrer"
              :label="t('projects.viewProject')"
              icon="i-lucide-arrow-up-right"
              trailing
              variant="link"
              color="primary"
              class="w-fit px-0"
            />
            <div class="flex justify-end ml-auto">
              <UButton
                :to="project.github"
                target="_blank"
                rel="noopener noreferrer"
                icon="i-simple-icons-github"
                :aria-label="t('projects.viewCode')"
                variant="ghost"
                color="primary"
                square
              />
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProjectTag {
  name: string
  icon: string
}

interface ProjectMeta {
  title: string
  tags: ProjectTag[]
  link?: string
  github: string
}

const { t } = useI18n()

const projectsMeta: ProjectMeta[] = [
  {
    title: 'Retriever',
    tags: [
      { name: 'FastAPI', icon: 'i-simple-icons-fastapi' },
      { name: 'Python', icon: 'i-simple-icons-python' },
      { name: 'LangChain', icon: 'i-simple-icons-langchain' },
      { name: 'ChromaDB', icon: 'i-lucide-database' },
      { name: 'Svelte', icon: 'i-simple-icons-svelte' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' }
    ],
    github: 'https://github.com/jhiltonsantos/retriever'
  },
  {
    title: 'Subscrip',
    tags: [
      { name: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
      { name: 'React', icon: 'i-simple-icons-react' },
      { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
      { name: 'Prisma ORM', icon: 'i-simple-icons-prisma' },
      { name: 'GSAP', icon: 'i-simple-icons-gsap' }
    ],
    link: 'https://www.subscrip.com.br/',
    github: 'https://github.com/jhiltonsantos/subscrip'
  },
  {
    title: 'Acompanhar RA',
    tags: [
      { name: 'Unity3D', icon: 'i-simple-icons-unity' },
      { name: 'C#', icon: 'i-simple-icons-csharp' },
      { name: 'ARCore', icon: 'i-lucide-scan' }
    ],
    link: 'https://jhiltonsantos.itch.io/acompanhar-ra',
    github: 'https://github.com/jhiltonsantos/ACOMPANHAR-RA'
  }
]

const projects = computed(() => projectsMeta.map((meta, index) => ({
  ...meta,
  description: t(`projects.items.${index}.description`)
})))
</script>
