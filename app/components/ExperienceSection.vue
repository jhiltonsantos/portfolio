<template>
  <section
    id="experiencias"
    class="relative z-10 min-h-screen"
  >
    <div class="mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col justify-center gap-10 px-5 py-24 md:px-16">
      <div class="flex flex-col gap-2">
        <span class="text-label-caps uppercase text-primary">Trajetória</span>
        <h2 class="text-headline-md text-on-surface">
          Experiência
        </h2>
      </div>

      <ul class="flex flex-col gap-4">
        <li
          v-for="experience in experiences"
          :key="experience.role"
          class="flex flex-col gap-3 rounded-lg border border-outline-variant bg-surface-container p-6 md:flex-row md:items-start md:justify-between md:gap-8"
        >
          <div class="flex flex-col gap-1 md:w-1/3">
            <p class="text-body-lg font-semibold text-on-surface">
              {{ experience.role }}
            </p>
            <p class="text-label-caps uppercase text-on-surface-variant">
              {{ experience.company }} · {{ experience.period }}
            </p>
          </div>

          <div class="flex flex-col gap-3 md:w-2/3">
            <p class="text-body-md text-on-surface-variant">
              {{ experience.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <UTooltip
                v-for="tag in experience.tags"
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
          </div>
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

interface ExperienceEntry {
  role: string
  company: string
  period: string
  description: string
  tags: ExperienceTag[]
}

const experiences: ExperienceEntry[] = [
  {
    role: 'Desenvolvedor Fullstack',
    company: 'Defsafe/Skill5',
    period: '2024 — Presente',
    description: 'Desenvolvo plataformas de ensino corporativo e integrações LMS. Atuo no desenvolvimento de APIs e arquiteturas serverless com AWS para processamento assíncrono e recursos de IA, além da evolução do front-end com Nuxt 3 e Vue.js focando em alta performance e SEO.',
    tags: [
      { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { name: 'Nuxt 3', icon: 'i-simple-icons-nuxt' },
      { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
      { name: 'AWS', icon: 'i-simple-icons-amazonwebservices' }
    ]
  },
  {
    role: 'Desenvolvedor Frontend',
    company: 'Fido',
    period: '2023 — 2024',
    description: 'Desenvolvi e mantive aplicações web e mobile com foco em arquitetura de componentes, experiência do usuário (UX/UI) e gerenciamento de estado. Atuei na integração com APIs RESTful e na implementação de testes unitários automatizados para garantir entregas consistentes.',
    tags: [
      { name: 'React', icon: 'i-simple-icons-react' },
      { name: 'React Native', icon: 'i-lucide-smartphone' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
      { name: 'Redux', icon: 'i-simple-icons-redux' }
    ]
  },
  {
    role: 'Desenvolvedor Web',
    company: 'Instituto Dom Barreto',
    period: '2019 — 2023',
    description: 'Desenvolvi o portal web institucional e criei painéis administrativos para automação de processos internos e gestão de dados. Responsável pela criação de APIs REST para persistência segura de dados, além de garantir acessibilidade e otimização da interface web.',
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
</script>
