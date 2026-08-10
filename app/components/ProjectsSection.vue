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

      <div class="hidden gap-4 md:grid md:grid-cols-3">
        <ProjectCard
          v-for="project in projects"
          :key="project.title"
          :project="project"
        />
      </div>

      <ul
        data-carousel
        class="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 md:hidden"
      >
        <li
          v-for="project in projects"
          :key="project.title"
          class="w-[85vw] shrink-0 snap-center snap-always"
        >
          <ProjectCard
            :project="project"
            class="h-full"
          />
        </li>
      </ul>
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

<style scoped>
[data-carousel] {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
[data-carousel]::-webkit-scrollbar {
  display: none;
}
</style>
