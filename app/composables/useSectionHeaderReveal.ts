import { gsap } from 'gsap'

export function useSectionHeaderReveal(sectionId: string) {
  const store = useNavigationStore()
  let mm: gsap.MatchMedia | undefined

  onMounted(() => {
    if (prefersReducedMotion()) return

    const targets = gsap.utils.toArray<HTMLElement>(`#${sectionId} [data-reveal]`)
    if (!targets.length) return

    let played = false
    function play(delay = 0) {
      if (played) return
      played = true
      gsap.to(targets, { y: 0, opacity: 1, duration: 0.8, delay, stagger: 0.12, ease: 'power3.out' })
    }

    gsap.set(targets, { y: 24, opacity: 0 })

    mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const isActive = () => store.sections[store.currentIndex]?.id === sectionId
      if (isActive()) return play()
      const stop = watch(isActive, (active) => {
        if (active) play(0.35)
      })
      return () => stop()
    })

    mm.add('(max-width: 767px)', () => {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          play()
          observer.disconnect()
        }
      }, { threshold: 0.6 })
      observer.observe(targets[0]!.parentElement ?? targets[0]!)
      return () => observer.disconnect()
    })
  })

  onUnmounted(() => mm?.revert())
}
