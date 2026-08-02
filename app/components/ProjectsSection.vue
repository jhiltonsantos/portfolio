<script setup lang="ts">
interface ProjectEntry {
  title: string
  description: string
  tags: string[]
  link: string
}

const projects: ProjectEntry[] = [
  {
    title: 'Projeto Exemplo 1',
    description: 'Plataforma web com foco em performance e experiência do usuário, construída com uma arquitetura moderna.',
    tags: ['Nuxt', 'Tailwind'],
    link: '#'
  },
  {
    title: 'Projeto Exemplo 2',
    description: 'Aplicação para gerenciamento de dados em tempo real, com estado centralizado e interface reativa.',
    tags: ['Vue', 'Pinia'],
    link: '#'
  },
  {
    title: 'Projeto Exemplo 3',
    description: 'Site institucional com animações fluidas e navegação imersiva entre seções.',
    tags: ['TypeScript', 'GSAP'],
    link: '#'
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
        <span class="text-label-caps uppercase text-primary">Trabalho</span>
        <h2 class="text-headline-md text-on-surface">
          Projetos
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UCard
          v-for="project in projects"
          :key="project.title"
          class="bg-surface-container ring-outline-variant"
        >
          <div class="flex flex-col gap-3">
            <p class="text-body-lg font-semibold text-on-surface">
              {{ project.title }}
            </p>
            <p class="text-body-md text-on-surface-variant">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                color="primary"
                variant="soft"
                class="text-label-caps uppercase"
              />
            </div>

            <UButton
              :to="project.link"
              target="_blank"
              label="Ver projeto"
              icon="i-lucide-arrow-up-right"
              trailing
              variant="link"
              color="primary"
              class="w-fit px-0"
            />
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
