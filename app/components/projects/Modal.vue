<template>
  <UModal
    v-model:open="open"
    :title="project?.title"
    :ui="{
      content: 'bg-background ring ring-outline-variant divide-y-0 w-[calc(100vw-2rem)] sm:max-w-3xl min-h-[400px] max-h-[min(85dvh,640px)]',
      header: 'p-5 sm:p-6',
      body: 'p-5 sm:p-6',
      footer: 'p-5 sm:p-6',
      title: 'text-2xl font-semibold text-on-surface text-primary',
      description: 'text-on-surface-variant',
      close: 'top-5 end-5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
    }"
  >
    <template #body>
      <div
        v-if="project"
        class="grid gap-6 md:grid-cols-2"
      >
        <div
          :inert="lightboxOpen"
          class="flex flex-col gap-4 flex-3/4"
        >
          <UCarousel
            :key="project.title"
            :items="images"
            :arrows="images.length > 1"
            :dots="images.length > 1"
            :autoplay="{ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }"
            class="group overflow-hidden rounded-lg"
            :ui="{ arrows: 'opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100' }"
            @select="carouselIndex = $event"
          >
            <template #default="{ item }">
              <button
                v-if="item"
                type="button"
                class="block aspect-video w-full overflow-hidden rounded-lg"
                @click="openLightbox"
              >
                <img
                  :src="item"
                  :alt="project.title"
                  class="size-full object-cover"
                >
              </button>
              <div
                v-else
                class="flex aspect-video w-full items-center justify-center rounded-lg bg-surface-container text-on-surface-variant"
              >
                <UIcon
                  name="i-lucide-image"
                  class="size-8"
                />
              </div>
            </template>
          </UCarousel>

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

          <div class="flex items-center justify-between gap-2">
            <UButton
              v-if="project.link"
              :to="project.link"
              target="_blank"
              rel="noopener noreferrer"
              :label="t('projects.viewProject')"
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
              :aria-label="t('projects.viewCode')"
              variant="ghost"
              color="primary"
              square
            />
          </div>
        </div>

        <p
          :inert="lightboxOpen"
          class="text-body-md text-on-surface-variant"
        >
          {{ project.longDescription }}
        </p>

        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
          @click.self="closeLightbox"
        >
          <img
            :src="images[lightboxIndex!]!"
            :alt="project.title"
            class="max-h-full max-w-full rounded-lg object-contain"
          >

          <UButton
            icon="i-lucide-x"
            :aria-label="t('projects.lightbox.close')"
            variant="ghost"
            color="neutral"
            class="absolute top-4 end-4 text-white"
            square
            @click="closeLightbox"
          />

          <template v-if="images.length > 1">
            <UButton
              icon="i-lucide-chevron-left"
              :aria-label="t('projects.lightbox.previous')"
              variant="ghost"
              color="neutral"
              class="absolute start-4 top-1/2 -translate-y-1/2 text-white"
              square
              @click="prevLightboxImage"
            />
            <UButton
              icon="i-lucide-chevron-right"
              :aria-label="t('projects.lightbox.next')"
              variant="ghost"
              color="neutral"
              class="absolute end-4 top-1/2 -translate-y-1/2 text-white"
              square
              @click="nextLightboxImage"
            />
          </template>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
interface ProjectTag {
  name: string
  icon: string
}

interface Project {
  title: string
  description: string
  longDescription: string
  images: string[]
  tags: ProjectTag[]
  link?: string
  github: string
}

const props = defineProps<{
  project: Project | null
}>()

const open = defineModel<boolean>('open', { default: false })

const { t } = useI18n()

const images = computed(() => props.project?.images.length ? props.project.images : [null])

const carouselIndex = ref(0)
const lightboxIndex = ref<number | null>(null)
const lightboxOpen = computed(() => lightboxIndex.value !== null)

function openLightbox() {
  lightboxIndex.value = carouselIndex.value
}
function closeLightbox() {
  lightboxIndex.value = null
}
function nextLightboxImage() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length
}
function prevLightboxImage() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + images.value.length) % images.value.length
}

function onLightboxKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation()
    closeLightbox()
    return
  }
  if (event.key === 'ArrowRight') {
    event.stopPropagation()
    nextLightboxImage()
    return
  }
  if (event.key === 'ArrowLeft') {
    event.stopPropagation()
    prevLightboxImage()
  }
}

watch(lightboxOpen, (isOpen) => {
  if (isOpen) window.addEventListener('keydown', onLightboxKeydown, { capture: true })
  else window.removeEventListener('keydown', onLightboxKeydown, { capture: true })
})
watch(open, (isOpen) => {
  if (!isOpen) lightboxIndex.value = null
})
watch(() => props.project, () => {
  lightboxIndex.value = null
  carouselIndex.value = 0
})

onUnmounted(() => window.removeEventListener('keydown', onLightboxKeydown, { capture: true }))
</script>
