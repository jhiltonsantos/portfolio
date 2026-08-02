<script setup lang="ts">
interface ContactEntry {
  label: string
  value: string
  href: string
  icon: string
  external: boolean
}

const contacts: ContactEntry[] = [
  { label: 'Email', value: 'jhilton930@gmail.com', href: 'mailto:jhilton930@gmail.com', icon: 'i-lucide-mail', external: false },
  { label: 'GitHub', value: 'github.com/hilton-placeholder', href: 'https://github.com/hilton-placeholder', icon: 'i-simple-icons-github', external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/hilton-placeholder', href: 'https://linkedin.com/in/hilton-placeholder', icon: 'i-simple-icons-linkedin', external: true }
]
</script>

<template>
  <section
    id="contato"
    class="relative z-10 min-h-screen"
  >
    <div class="mx-auto flex min-h-screen max-w-(--spacing-container-max) flex-col justify-center gap-10 px-5 md:px-16">
      <div class="flex max-w-xl flex-col gap-2">
        <span class="text-label-caps uppercase text-primary">Vamos conversar</span>
        <h2 class="text-headline-md text-on-surface">
          Contate-me
        </h2>
        <p class="text-body-lg text-on-surface-variant">
          Estou aberto a novas oportunidades e colaborações. Envie uma mensagem por qualquer um dos canais abaixo.
        </p>
      </div>

      <ul class="flex max-w-xl flex-col gap-3">
        <li
          v-for="contact in contacts"
          :key="contact.label"
        >
          <UButton
            :to="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined"
            :icon="contact.icon"
            variant="outline"
            color="neutral"
            size="xl"
            block
            class="justify-start gap-4 border-outline-variant text-on-surface hover:border-primary hover:text-primary"
          >
            <div class="flex flex-col items-start">
              <span class="text-label-caps uppercase text-on-surface-variant">{{ contact.label }}</span>
              <span class="text-body-md">{{ contact.value }}</span>
            </div>
          </UButton>
        </li>
      </ul>
    </div>
  </section>
</template>
