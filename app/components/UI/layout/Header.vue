<template>
  <nav class="col-span-12 -ml-px -mt-px flex divide-x divide-outline-variant/60 border border-outline-variant/60">
    <div class="flex h-24 items-end p-4">
      <UIAppLogo />
    </div>

    <NuxtLink
      v-for="link in desktopLinks"
      :key="link.to"
      :to="link.to"
      class="hidden h-24 w-40 items-end p-4 text-body-md text-on-surface/80 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary md:flex"
      @click.prevent="store.goToId(link.id)"
    >
      {{ link.label }}
    </NuxtLink>

    <div class="flex-1" />

    <div class="hidden h-24 items-end gap-3 p-4 md:flex">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.name"
        class="flex size-6 items-center justify-center text-on-surface/80 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
      >
        <UIcon
          :name="social.icon"
          class="size-5"
        />
      </a>
    </div>

    <div class="hidden items-end p-4 md:flex">
      <UILanguageSwitch />
    </div>

    <button
      v-if="cta"
      type="button"
      class="hidden items-end justify-start gap-2 whitespace-nowrap bg-primary p-4 text-body-md font-medium text-on-primary transition-colors hover:bg-primary-fixed focus-visible:outline-2 focus-visible:outline-primary md:flex"
      @click="store.goToId('contato')"
    >
      {{ t('nav.contact') }}
      <UIcon
        name="i-lucide-arrow-up-right"
        class="size-5"
      />
    </button>

    <div class="flex items-center px-2 md:hidden">
      <UDropdownMenu
        :items="menuItems"
        :content="{ align: 'end' }"
      >
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          :aria-label="t('nav.menu')"
        />

        <template #language>
          <div class="flex justify-center px-2 py-1.5">
            <UILanguageSwitch />
          </div>
        </template>
      </UDropdownMenu>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  cta?: boolean
}>()

const store = useNavigationStore()
const { t } = useI18n()

const links = computed(() => [
  { label: t('nav.experiences'), to: '#experiencias', id: 'experiencias' },
  { label: t('nav.projects'), to: '#projetos', id: 'projetos' },
  { label: t('nav.contact'), to: '#contato', id: 'contato' }
])

const desktopLinks = computed(() => links.value.filter(link => link.id !== 'contato'))

const socials = [
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', href: 'https://www.linkedin.com' },
  { name: 'GitHub', icon: 'i-simple-icons-github', href: 'https://github.com/jhiltonsantos' }
]

const menuItems = computed(() => [
  ...links.value.map(link => ({ label: link.label, onSelect: () => store.goToId(link.id) })),
  { type: 'separator' as const },
  { slot: 'language' as const }
])
</script>
