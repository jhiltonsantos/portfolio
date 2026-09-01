<template>
  <UCard
    role="button"
    tabindex="0"
    class="flex h-full cursor-pointer flex-col bg-surface-container p-1 ring-outline-variant transition-colors hover:ring-primary focus-visible:outline-2 focus-visible:outline-primary"
    :ui="{ body: 'flex h-full flex-col gap-4 p-0 sm:p-0' }"
    @click="emit('select')"
    @keydown.enter="emit('select')"
    @keydown.space.prevent="emit('select')"
  >
    <div class="flex px-4 pt-4">
      <UCarousel
        :items="project.images.length ? project.images : [null]"
        :autoplay="{ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }"
        :watch-drag="false"
        class="overflow-hidden rounded-lg"
      >
        <template #default="{ item }">
          <img
            v-if="item"
            :src="item"
            :alt="project.title"
            class="aspect-video w-full object-cover"
          >
          <div
            v-else
            class="flex aspect-video w-full items-center justify-center bg-surface-container-high text-on-surface-variant"
          >
            <UIcon
              name="i-lucide-image"
              class="size-8"
            />
          </div>
        </template>
      </UCarousel>
    </div>

    <div class="flex flex-1 flex-col gap-3 px-4 pb-4">
      <p class="text-body-lg font-semibold text-on-surface">
        {{ project.title }}
      </p>

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

      <p class="flex-1 text-body-md text-on-surface-variant">
        {{ project.description }}
      </p>
    </div>
  </UCard>
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

defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  select: []
}>()
</script>
