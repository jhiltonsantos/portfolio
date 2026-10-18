<template>
  <UCard
    role="button"
    tabindex="0"
    class="relative -ml-px -mt-px flex h-full cursor-pointer flex-col rounded-none border border-outline-variant/60 bg-transparent shadow-none ring-0 transition-colors hover:z-10 hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
    :ui="{ body: 'flex h-full flex-col gap-4 p-4 sm:p-4 md:p-(--spacing-cell) sm:md:p-(--spacing-cell)' }"
    @click="emit('select')"
    @keydown.enter="emit('select')"
    @keydown.space.prevent="emit('select')"
  >
    <UCarousel
      :items="project.images.length ? project.images : [null]"
      :autoplay="{ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }"
      :watch-drag="false"
      class="overflow-hidden"
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

    <div class="flex flex-col gap-3">
      <p class="text-2xl text-on-surface min-[1400px]:text-headline-md">
        {{ project.title }}
      </p>
      <p class="text-sm text-on-surface-variant min-[1400px]:text-body-md">
        {{ project.description }}
      </p>
    </div>

    <div class="mt-auto flex flex-wrap gap-3">
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
