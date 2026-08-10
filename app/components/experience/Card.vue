<template>
  <div class="flex flex-col gap-3 rounded-lg border border-outline-variant bg-surface-container p-6 md:flex-row md:items-start md:justify-between md:gap-8">
    <div class="flex flex-col gap-1 md:w-1/3">
      <p class="text-body-lg font-semibold text-on-surface">
        {{ experience.role }}
      </p>
      <p class="text-label-caps uppercase text-on-surface-variant">
        {{ experience.company }} · {{ experience.period }}
      </p>
    </div>

    <div class="flex flex-col gap-3 md:w-2/3">
      <p class="text-body-md text-on-surface-variant">
        {{ experience.description }}
      </p>
      <div class="flex flex-wrap gap-2">
        <UTooltip
          v-for="tag in experience.tags"
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
    </div>
  </div>
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
