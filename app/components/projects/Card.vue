<template>
  <UCard
    role="button"
    tabindex="0"
    class="flex h-full cursor-pointer flex-col bg-surface-container p-1 ring-outline-variant transition-colors hover:ring-primary focus-visible:outline-2 focus-visible:outline-primary"
    :ui="{ body: 'flex h-full flex-col gap-3' }"
    @click="emit('select')"
    @keydown.enter="emit('select')"
    @keydown.space.prevent="emit('select')"
  >
    <p class="text-body-lg font-semibold text-on-surface">
      {{ project.title }}
    </p>
    <p class="flex-1 text-body-md text-on-surface-variant">
      {{ project.description }}
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

    <div class="flex flex-row items-center justify-between">
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
        @click.stop
      />
      <div class="flex justify-end ml-auto">
        <UButton
          :to="project.github"
          target="_blank"
          rel="noopener noreferrer"
          icon="i-simple-icons-github"
          :aria-label="t('projects.viewCode')"
          variant="ghost"
          color="primary"
          square
          @click.stop
        />
      </div>
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

const { t } = useI18n()
</script>
