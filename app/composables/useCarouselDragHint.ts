import { gsap } from 'gsap'

export function useCarouselDragHint(sectionId: string) {
  const carouselRef = ref<HTMLElement | null>(null)
  const store = useNavigationStore()
  const isActive = computed(() => store.sections[store.currentIndex]?.id === sectionId)

  watch(isActive, (active) => {
    const el = carouselRef.value
    if (!active || !el || window.innerWidth >= 768) return

    gsap.fromTo(
      el,
      { scrollLeft: 0 },
      { scrollLeft: 64, duration: 0.5, delay: 0.6, ease: 'power2.out', yoyo: true, repeat: 1 }
    )
  })

  return { carouselRef }
}
