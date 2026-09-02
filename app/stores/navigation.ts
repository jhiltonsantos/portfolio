import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
  const sections = [
    { id: 'hero', label: 'Início' },
    { id: 'experiencias', label: 'Experiências' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contate-me' }
  ]

  const currentIndex = ref(0)
  const isAnimating = ref(false)
  const isLocked = ref(false)

  const isFirst = computed(() => currentIndex.value === 0)
  const isLast = computed(() => currentIndex.value === sections.length - 1)

  function goTo(index: number) {
    if (isAnimating.value || isLocked.value) return
    if (index < 0 || index >= sections.length) return
    currentIndex.value = index
  }

  function goToId(id: string) {
    const index = sections.findIndex(section => section.id === id)
    if (index !== -1) goTo(index)
  }

  function next() {
    goTo(currentIndex.value + 1)
  }

  function prev() {
    goTo(currentIndex.value - 1)
  }

  return {
    sections,
    currentIndex,
    isAnimating,
    isLocked,
    isFirst,
    isLast,
    goTo,
    goToId,
    next,
    prev
  }
})
