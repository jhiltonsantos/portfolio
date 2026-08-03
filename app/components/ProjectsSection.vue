<script setup lang="ts">
interface ProjectTag {
  name: string
  icon: string
}

interface ProjectEntry {
  title: string
  description: string
  tags: ProjectTag[]
  link: string
  github: string
}

const projects: ProjectEntry[] = [
  {
    title: 'Portfólio',
    description: 'Portfólio pessoal em Nuxt 4 e Vue 3, com navegação full-page por scroll, cursor e fundos animados em GSAP e um design system próprio construído com Tailwind CSS.',
    tags: [
      { name: 'Nuxt', icon: 'i-simple-icons-nuxt' },
      { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
      { name: 'GSAP', icon: 'i-simple-icons-gsap' }
    ],
    link: 'https://hilton-portfolio-nuxt.vercel.app',
    github: 'https://github.com/jhiltonsantos/portfolio'
  },
  {
    title: 'Subscrip',
    description: 'Plataforma para acabar com o vazamento de dinheiro invisível: centraliza assinaturas ativas (Netflix, AWS, Vercel, academias etc.) e evita pagamentos por serviços esquecidos ou renovações inesperadas.',
    tags: [
      { name: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
      { name: 'React', icon: 'i-simple-icons-react' },
      { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
      { name: 'Prisma ORM', icon: 'i-simple-icons-prisma' },
      { name: 'GSAP', icon: 'i-simple-icons-gsap' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' }
    ],
    link: 'https://www.subscrip.com.br/',
    github: 'https://github.com/jhiltonsantos/subscrip'
  },
  {
    title: 'Acompanhar RA',
    description: 'App móvel de Realidade Aumentada que usa a câmera do dispositivo e o método TEACCH para criar um ambiente estruturado e inclusivo, apoiando a independência de pessoas com TEA.',
    tags: [
      { name: 'Unity3D', icon: 'i-simple-icons-unity' },
      { name: 'C#', icon: 'i-simple-icons-csharp' },
      { name: 'ARCore', icon: 'i-lucide-scan' }
    ],
    link: 'https://jhiltonsantos.itch.io/acompanhar-ra',
    github: 'https://github.com/jhiltonsantos/ACOMPANHAR-RA'
  }
]
</script>

<template>
  <section
    id="projetos"
    class="relative z-10 min-h-screen"
  >
    <div class="mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col justify-center gap-10 px-5 py-24 md:px-16">
      <div class="flex flex-col gap-2">
        <span class="text-label-caps uppercase text-primary">Pessoal</span>
        <h2 class="text-headline-md text-on-surface">
          Projetos selecionados
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

          <div class="flex items-center justify-between">
            <UButton
              :to="project.link"
              target="_blank"
              rel="noopener noreferrer"
              label="Ver projeto"
              icon="i-lucide-arrow-up-right"
              trailing
              variant="link"
              color="primary"
              class="w-fit px-0"
            />
            <UButton
              :to="project.github"
              target="_blank"
              rel="noopener noreferrer"
              icon="i-simple-icons-github"
              aria-label="Ver código no GitHub"
              variant="ghost"
              color="primary"
              square
            />
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
