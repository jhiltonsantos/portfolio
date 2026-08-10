<template>
  <section
    id="contato"
    class="relative z-10 flex min-h-screen flex-col"
  >
    <div class="mx-auto flex w-full max-w-(--spacing-container-max) flex-1 flex-col justify-center gap-10 px-5 md:flex-row md:items-center md:justify-between md:gap-12 md:px-16">
      <div class="flex flex-col gap-10 md:w-1/2">
        <div class="flex max-w-xl flex-col gap-2">
          <span class="text-label-caps uppercase text-primary">{{ t('contact.eyebrow') }}</span>
          <h2 class="text-headline-md text-on-surface">
            {{ t('contact.heading') }}
          </h2>
          <p class="text-body-lg text-on-surface-variant">
            {{ t('contact.intro') }}
          </p>
        </div>

        <ul class="flex max-w-xl flex-col gap-3">
          <li
            v-for="contact in contacts"
            :key="contact.label"
            class="flex items-stretch gap-2"
          >
            <UButton
              :to="contact.href"
              :target="contact.external ? '_blank' : undefined"
              :rel="contact.external ? 'noopener noreferrer' : undefined"
              :icon="contact.icon"
              variant="outline"
              color="neutral"
              size="xl"
              class="min-w-0 flex-1 justify-start gap-4 border-outline-variant bg-transparent text-on-surface hover:border-primary hover:text-primary hover:bg-on-primary-fixed-variant/20"
            >
              <slot name="contact-icon">
                <div class="flex w-full min-w-0 flex-row items-center justify-between">
                  <div class="flex min-w-0 flex-1 flex-col items-start">
                    <span class="text-label-caps uppercase text-on-surface-variant">{{ contact.label }}</span>
                    <span class="w-full truncate text-body-md">{{ contact.value }}</span>
                  </div>
                  <UButton
                    icon="i-lucide-copy"
                    variant="outline"
                    color="neutral"
                    size="sm"
                    square
                    class="ml-2 shrink-0 border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
                    :aria-label="t('contact.copy')"
                    @click="copyValue(contact.value)"
                  />
                </div>
              </slot>
            </UButton>
          </li>
        </ul>
      </div>

      <div class="hidden md:flex md:w-1/3 md:items-center md:justify-end items-end self-center-safe">
        <div
          class="relative w-full max-w-md"
          @mouseenter="onPhotoHover(true)"
          @mouseleave="onPhotoHover(false)"
        >
          <div
            ref="photoGlowRef"
            class="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-full bg-primary/30 opacity-60 blur-3xl"
          />
          <img
            ref="photoRef"
            src="/image/me.webp"
            :alt="t('contact.photoAlt')"
            class="aspect-square w-full rounded-xl object-cover ring-1 ring-outline-variant shadow-glow-primary"
          >
        </div>
      </div>
    </div>

    <UILayoutFooter />
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

const toast = useToast()

async function copyValue(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    toast.add({ title: t('contact.copied'), icon: 'i-lucide-check', color: 'success' })
  } catch {
    toast.add({ title: t('contact.copyError'), icon: 'i-lucide-x', color: 'error' })
  }
}

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
    opacity: hovering ? 1 : 0.6,
    scale: hovering ? 1.15 : 0.9,
    duration: 0.6,
    ease: 'power2.out'
  })
}
</script>
