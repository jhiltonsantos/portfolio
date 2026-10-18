<template>
  <section
    id="contato"
    class="relative z-10 flex min-h-dvh flex-col"
  >
    <div class="mx-auto flex w-full max-w-(--spacing-container-max) flex-1 flex-col justify-center px-5 py-6 md:px-16 md:py-6">
      <UIGrid>
        <UIGridCell
          :span="8"
          class="flex flex-col gap-2"
        >
          <UIGridLabel>{{ t('contact.eyebrow') }}</UIGridLabel>
          <h2 class="text-headline-md text-on-surface">
            {{ t('contact.heading') }}
          </h2>
          <p class="max-w-xl text-body-lg text-on-surface-variant">
            {{ t('contact.intro') }}
          </p>
        </UIGridCell>

        <UIGridCell
          :span="4"
          class="relative isolate hidden overflow-hidden md:row-span-2 md:block"
          @mouseenter="onPhotoHover(true)"
          @mouseleave="onPhotoHover(false)"
        >
          <div
            ref="photoGlowRef"
            class="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-full bg-primary/20 opacity-30 blur-3xl"
          />
          <div class="absolute inset-4 md:inset-(--spacing-cell)">
            <img
              ref="photoRef"
              src="/image/me.webp"
              :alt="t('contact.photoAlt')"
              class="size-full object-cover"
            >
          </div>
        </UIGridCell>

        <ul class="col-span-12 flex flex-col md:col-span-8">
          <li
            v-for="contact in contacts"
            :key="contact.label"
            class="flex"
          >
            <ContactCard :contact="contact" />
          </li>
        </ul>

        <UILayoutFooter />
      </UIGrid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

interface ContactEntry {
  label: string
  value: string
  href: string
  icon: string
  external: boolean
}

const { t } = useI18n()

const contacts = computed<ContactEntry[]>(() => [
  { label: t('contact.emailLabel'), value: 'jhilton930@gmail.com', href: 'mailto:jhilton930@gmail.com', icon: 'i-lucide-mail', external: false },
  { label: 'GitHub', value: 'github.com/jhiltonsantos', href: 'https://github.com/jhiltonsantos', icon: 'i-simple-icons-github', external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/hiltonsantos9', href: 'https://linkedin.com/in/hiltonsantos9', icon: 'i-simple-icons-linkedin', external: true }
])

const store = useNavigationStore()
const photoRef = ref<HTMLImageElement>()
const photoGlowRef = ref<HTMLDivElement>()
const isActive = computed(() => store.sections[store.currentIndex]?.id === 'contato')

watch(isActive, (active) => {
  if (!active || !photoRef.value) return
  gsap.fromTo(
    photoRef.value,
    { opacity: 0, y: 24, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.inOut' }
  )
})

function onPhotoHover(hovering: boolean) {
  if (!photoGlowRef.value) return
  gsap.to(photoGlowRef.value, {
    opacity: hovering ? 0.6 : 0.3,
    scale: hovering ? 1.15 : 0.9,
    duration: 0.6,
    ease: 'power2.out'
  })
}
</script>
