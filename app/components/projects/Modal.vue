<template>
  <UModal
    v-model:open="open"
    :title="project?.title"
    :close="{ size: 'xl', ui: { leadingIcon: 'size-8' } }"
    :ui="{
      content: modalContentClass,
      header: 'flex items-stretch gap-0 p-0 sm:p-0 border-b border-outline-variant/60 bg-[linear-gradient(to_right,var(--color-background)_20%,transparent),linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[100%_100%,24px_24px,24px_24px]',
      wrapper: 'flex min-w-0 flex-1 flex-col justify-end p-4 md:p-(--spacing-cell)',
      body: 'p-0 sm:p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      footer: 'p-5 sm:p-6',
      title: 'text-2xl font-semibold text-on-surface',
      description: 'text-on-surface-variant',
      close: 'static flex size-16 shrink-0 items-center justify-center rounded-none border-l border-outline-variant/60 bg-background text-on-surface-variant hover:bg-background hover:text-primary focus-visible:outline-2 focus-visible:outline-primary md:size-20'
    }"
  >
    <template #actions>
      <div class="flex items-end p-4 md:p-(--spacing-cell)">
        <UIGridLabel>dev.project()</UIGridLabel>
      </div>
    </template>

    <template #body>
      <div
        v-if="project"
        class="relative"
      >
        <UIGrid
          :inert="lightboxOpen"
          class="-m-px w-[calc(100%+2px)] max-w-none"
        >
          <UIGridCell :span="7">
            <UCarousel
              :key="project.title"
              :items="images"
              :arrows="images.length > 1"
              :dots="images.length > 1"
              :autoplay="{ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }"
              class="group overflow-hidden"
              :ui="{ arrows: 'opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100' }"
              @select="carouselIndex = $event"
            >
              <template #default="{ item }">
                <button
                  v-if="item"
                  type="button"
                  class="block aspect-video w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-primary"
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
                  class="flex aspect-video w-full items-center justify-center bg-surface-container text-on-surface-variant"
                >
                  <UIcon
                    name="i-lucide-image"
                    class="size-8"
                  />
                </div>
              </template>
            </UCarousel>
          </UIGridCell>

          <UIGridCell
            :span="5"
            class="md:row-span-2"
          >
            <p class="text-sm text-on-surface-variant min-[1400px]:text-body-md 2xl:text-lg">
              {{ project.longDescription }}
            </p>
          </UIGridCell>

          <UIGridCell
            :span="7"
            class="flex flex-wrap items-center gap-3"
          >
            <UTooltip
              v-for="tag in project.tags"
              :key="tag.name"
              :text="tag.name"
              :delay-duration="0"
              :content="{ side: 'top' }"
            >
              <UIcon
                :name="tag.icon"
                :aria-label="tag.name"
                class="size-6 cursor-default text-primary transition-transform duration-200 ease-out hover:scale-125"
              />
            </UTooltip>
          </UIGridCell>

          <UIGridCell
            v-if="project.link"
            :span="6"
            interactive
            class="relative p-0 hover:z-10 md:p-0"
          >
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between gap-2 p-4 text-body-md lowercase text-primary focus-visible:outline-2 focus-visible:outline-primary md:p-(--spacing-cell)"
            >
              {{ t('projects.viewProject') }}
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-5"
              />
            </a>
          </UIGridCell>

          <UIGridCell
            :span="project.link ? 6 : 12"
            interactive
            class="relative p-0 hover:z-10 md:p-0"
          >
            <a
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="t('projects.viewCode')"
              class="flex items-center justify-between gap-2 p-4 text-body-md lowercase text-primary focus-visible:outline-2 focus-visible:outline-primary md:p-(--spacing-cell)"
            >
              <UIcon
                name="i-simple-icons-github"
                class="size-5"
              />
              github
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-5"
              />
            </a>
          </UIGridCell>
        </UIGrid>

        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
          @click.self="closeLightbox"
        >
          <img
            :src="images[lightboxIndex!]!"
            :alt="project.title"
            class="max-h-full max-w-full object-contain"
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
const modalContentClass = computed(() => lightboxOpen.value
  ? 'rounded-none bg-background border border-outline-variant/60 ring-0 divide-y-0 w-[calc(100vw-2rem)] h-[calc(100dvh-2rem)] max-w-none transition-[width,height,max-width] duration-200'
  : 'rounded-none bg-background border border-outline-variant/60 ring-0 divide-y-0 w-[calc(100vw-2rem)] sm:max-w-4xl min-h-[400px] max-h-[min(92dvh,800px)] transition-[width,height,max-width] duration-200')

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
