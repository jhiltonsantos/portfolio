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
        <ProjectsCard
          v-for="project in projects"
          :key="project.title"
          :project="project"
          @select="openProject(project)"
        />
      </div>

      <ul
        ref="carouselRef"
        data-carousel
        class="-mx-5 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 py-2 md:hidden"
      >
        <li
          v-for="project in projects"
          :key="project.title"
          class="w-[85vw] shrink-0 snap-center snap-always"
        >
          <ProjectsCard
            :project="project"
            class="h-full"
            @select="openProject(project)"
          />
        </li>
      </ul>
    </div>

    <ProjectsModal
      v-model:open="isModalOpen"
      :project="selectedProject"
    />
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
  // Static image list, or a per-locale map when the screenshots themselves differ by language
  images: string[] | Record<'pt' | 'en', string[]>
  link?: string
  github: string
}

const { t, locale } = useI18n()
const { carouselRef } = useCarouselDragHint('projetos')
useCarouselSectionSwipe(carouselRef)

const projectsMeta: ProjectMeta[] = [
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
    images: {
      pt: [
        '/image/projects/subscrip/pt/1.webp',
        '/image/projects/subscrip/pt/2.webp'
      ],
      en: [
        '/image/projects/subscrip/en/1.webp',
        '/image/projects/subscrip/en/2.webp',
        '/image/projects/subscrip/en/3.webp'
      ]
    },
    link: 'https://www.subscrip.com.br/',
    github: 'https://github.com/jhiltonsantos/subscrip'
  },
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
    images: [
      '/image/projects/retriever/1.webp',
      '/image/projects/retriever/2.webp',
      '/image/projects/retriever/3.webp',
      '/image/projects/retriever/4.webp'
    ],
    link: 'https://github.com/jhiltonsantos/retriever/blob/main/README.md',
    github: 'https://github.com/jhiltonsantos/retriever'
  },
  {
    title: 'Acompanhar RA',
    tags: [
      { name: 'Unity3D', icon: 'i-simple-icons-unity' },
      { name: 'C#', icon: 'i-simple-icons-csharp' },
      { name: 'ARCore', icon: 'i-lucide-scan' },
      { name: 'Android', icon: 'i-simple-icons-android' }
    ],
    images: [
      '/image/projects/acompanhar/1.webp',
      '/image/projects/acompanhar/2.webp',
      '/image/projects/acompanhar/3.webp',
      '/image/projects/acompanhar/4.webp'
    ],
    link: 'https://jhiltonsantos.itch.io/acompanhar-ra',
    github: 'https://github.com/jhiltonsantos/ACOMPANHAR-RA'
  }
]

const projects = computed(() => projectsMeta.map((meta, index) => ({
  ...meta,
  images: Array.isArray(meta.images)
    ? meta.images
    : meta.images[locale.value as 'pt' | 'en'],
  description: t(`projects.items.${index}.description`),
  longDescription: t(`projects.items.${index}.longDescription`)
})))

type Project = (typeof projects.value)[number]

const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const navigationStore = useNavigationStore()
watch(isModalOpen, (value) => {
  navigationStore.isLocked = value
})

function openProject(project: Project) {
  selectedProject.value = project
  isModalOpen.value = true
}
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
