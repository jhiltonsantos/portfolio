<template>
  <section
    id="projetos"
    class="relative z-10 md:h-dvh md:min-h-dvh"
  >
    <div class="mx-auto flex max-w-(--spacing-container-max) flex-col justify-center px-5 py-6 md:h-full md:min-h-0 md:px-16 md:py-6">
      <UIGrid class="min-h-0 flex-1 md:grid-rows-[auto_minmax(0,1fr)]">
        <UIGridCell class="flex flex-col gap-2">
          <UIGridLabel>{{ t('projects.eyebrow') }}</UIGridLabel>
          <h2 class="text-headline-md text-on-surface">
            {{ t('projects.heading') }}
          </h2>
        </UIGridCell>

        <!-- Card tracks: image · empty · title · description · icons; cards use subgrid so titles
             line up and the longest description sets the height. -->
        <div class="col-span-12 flex flex-col md:grid md:min-h-0 md:grid-cols-3 md:grid-rows-[auto_1fr_auto_auto_auto]">
          <ProjectsCard
            v-for="project in projects"
            :key="project.title"
            :project="project"
            @select="openProject(project)"
          />
        </div>
      </UIGrid>
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
