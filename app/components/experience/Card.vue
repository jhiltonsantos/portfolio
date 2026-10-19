<template>
  <UIGridCell class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <UIGridLabel>{{ experience.period }}</UIGridLabel>
        <p class="font-mono text-label-mono lowercase text-on-surface">
          {{ experience.company }}
        </p>
      </div>

      <div class="flex max-w-1/2 flex-wrap justify-end gap-3">
        <UTooltip
          v-for="tag in experience.tags"
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
    </div>

    <div class="flex flex-1 flex-col gap-3 pt-6">
      <p class="text-2xl text-on-surface min-[1400px]:text-headline-md 2xl:text-4xl">
        {{ experience.role }}
      </p>
      <p class="text-sm text-on-surface-variant min-[1400px]:text-body-md 2xl:text-lg">
        {{ experience.description }}
      </p>
    </div>
  </UIGridCell>
</template>

<script setup lang="ts">
interface ExperienceTag {
  name: string
  icon: string
}

interface Experience {
  role: string
  company: string
  period: string
  description: string
  tags: ExperienceTag[]
}

defineProps<{
  experience: Experience
}>()
</script>
