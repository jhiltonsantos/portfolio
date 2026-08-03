<template>
  <section
    id="hero"
    class="relative min-h-screen overflow-hidden bg-background"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,226,134,0.16),transparent_60%)]"
    />

    <div class="relative mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col px-5 pt-8 md:px-16 md:pt-12">
      <SiteHeader />

      <div class="flex flex-col gap-6 pt-10 md:gap-4 md:pt-0">
        <h1 class="text-display-lg-mobile text-on-surface md:text-display-lg">
          Olá.<br>Eu sou o Hilton.
        </h1>

        <div class="flex items-center self-center pr-12 gap-2">
          <UIcon
            name="i-lucide-arrow-down-right"
            class="pb-1.5 size-16 shrink-0 text-primary"
          />
          <ul class="flex flex-col gap-1 text-label-caps uppercase">
            <li
              v-for="(role, index) in roles"
              :key="role"
              :class="index === 0 ? 'text-on-surface' : index === 1 ? 'text-on-surface-variant' : 'text-outline'"
            >
              {{ role }}
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-1" />

      <div class="flex flex-col gap-8 pb-24 pt-8 md:flex-row md:items-start md:justify-between md:gap-10 md:pb-32">
        <p class="max-w-xl text-body-lg text-on-surface-variant">
          Eu sou desenvolvedor a 6 anos, focado em criar experiências digitais de alta performance e precisão técnica. Especializado em arquiteturas modernas, transformo complexidade em interfaces fluidas e intuitivas.
        </p>

        <div class="flex flex-col gap-3 items-end self-end">
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
      </div>

      <div class="absolute inset-x-0 bottom-10 flex items-center justify-center gap-4">
        <span class="h-px w-10 bg-primary/60" />
        <span class="text-label-caps text-primary">Role para explorar</span>
        <span class="h-px w-10 bg-primary/60" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const roles = ['Desenvolvedor', 'Fullstack', 'Front-end']

const stackRows = [
  [
    { name: 'Python', icon: 'i-simple-icons-python' },
    { name: 'Django', icon: 'i-simple-icons-django' },
    { name: 'Docker', icon: 'i-simple-icons-docker' },
    { name: 'Kubernetes', icon: 'i-simple-icons-kubernetes' },
    { name: 'AWS', icon: 'i-simple-icons-amazonwebservices' }
  ],
  [
    { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
    { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
    { name: 'React', icon: 'i-simple-icons-react' },
    { name: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
    { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
    { name: 'Nuxt', icon: 'i-simple-icons-nuxt' },
    { name: 'Angular', icon: 'i-simple-icons-angular' },
    { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' }
  ]
]
</script>
