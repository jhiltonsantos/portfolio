<script setup lang="ts">
interface ExperienceEntry {
  role: string
  company: string
  period: string
  description: string
  tags: string[]
}

const experiences: ExperienceEntry[] = [
  {
    role: 'Desenvolvedor Fullstack Sênior',
    company: 'Empresa Exemplo Ltda.',
    period: '2023 — Presente',
    description: 'Responsável pelo desenvolvimento de aplicações web de ponta a ponta, com foco em performance e arquitetura escalável.',
    tags: ['Vue', 'Nuxt', 'Node.js']
  },
  {
    role: 'Desenvolvedor Frontend',
    company: 'Outra Empresa',
    period: '2021 — 2023',
    description: 'Construção de interfaces de usuário reutilizáveis e acessíveis para produtos digitais de grande escala.',
    tags: ['React', 'TypeScript']
  },
  {
    role: 'Desenvolvedor Júnior',
    company: 'Primeira Empresa',
    period: '2019 — 2021',
    description: 'Manutenção e evolução de sistemas web, aprendendo boas práticas de desenvolvimento e trabalho em equipe.',
    tags: ['JavaScript', 'CSS']
  }
]
</script>

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
              <UBadge
                v-for="tag in experience.tags"
                :key="tag"
                :label="tag"
                color="primary"
                variant="soft"
                class="text-label-caps uppercase"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
