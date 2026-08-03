<script setup lang="ts">
import { gsap } from 'gsap'

interface ContactEntry {
  label: string
  value: string
  href: string
  icon: string
  external: boolean
}

const contacts: ContactEntry[] = [
  { label: 'Email', value: 'jhilton930@gmail.com', href: 'mailto:jhilton930@gmail.com', icon: 'i-lucide-mail', external: false },
  { label: 'GitHub', value: 'github.com/jhiltonsantos', href: 'https://github.com/jhiltonsantos', icon: 'i-simple-icons-github', external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/hiltonsantos9', href: 'www.linkedin.com/in/hiltonsantos9', icon: 'i-simple-icons-linkedin', external: true }
]

const store = useNavigationStore()
const photoRef = ref<HTMLImageElement>()
const isActive = computed(() => store.sections[store.currentIndex]?.id === 'contato')

watch(isActive, (active) => {
  if (!active || !photoRef.value) return
  gsap.fromTo(
    photoRef.value,
    { opacity: 0, y: 24, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.inOut' }
  )
})

onMounted(() => {
  if (!photoRef.value) return
  gsap.to(photoRef.value, { y: '+=14', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
})
</script>

<template>
  <section
    id="contato"
    class="relative z-10 flex min-h-screen flex-col"
  >
    <div class="mx-auto flex w-full max-w-(--spacing-container-max) flex-1 flex-col justify-center gap-10 px-5 md:flex-row md:items-center md:justify-between md:gap-12 md:px-16">
      <div class="flex flex-col gap-10 md:w-1/2">
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

      <div class="hidden md:flex md:w-1/2 md:items-center md:justify-center">
        <img
          ref="photoRef"
          src="/image/me.webp"
          alt="Foto de Hilton Santos"
          class="h-72 w-72 rounded-xl object-cover ring-1 ring-outline-variant shadow-glow-primary md:h-80 md:w-80"
        >
      </div>
    </div>

    <AppFooter />
  </section>
</template>
