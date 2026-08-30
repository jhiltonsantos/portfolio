<template>
  <UModal
    v-model:open="open"
    :title="project?.title"
    :ui="{
      content: 'bg-background ring ring-outline-variant divide-y-0 w-[calc(100vw-2rem)] sm:max-w-3xl h-[min(55dvh)]',
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
        <div class="flex flex-col gap-4 flex-3/4">
          <UCarousel
            :items="images"
            arrows
            :dots="images.length > 1"
            class="overflow-hidden rounded-lg"
          >
            <template #default="{ item }">
              <img
                v-if="item"
                :src="item"
                :alt="project.title"
                class="aspect-video w-full rounded-lg object-cover"
              >
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

        <p class="text-body-md text-on-surface-variant">
          {{ project.longDescription }}
        </p>
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
</script>
