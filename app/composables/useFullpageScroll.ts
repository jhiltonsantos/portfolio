import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export function useFullpageScroll() {
  const store = useNavigationStore()

  onMounted(() => {
    gsap.registerPlugin(Observer, ScrollToPlugin)

    const observer = Observer.create({
      target: window,
      type: 'wheel,touch',
      preventDefault: true,
      tolerance: 10,
      onDown: () => store.next(),
      onUp: () => store.prev()
    })

    const stopWatch = watch(() => store.currentIndex, (index) => {
      const section = store.sections[index]
      const target = section && document.getElementById(section.id)
      if (!target) return

      store.isAnimating = true
      gsap.to(window, {
        duration: 1,
        ease: 'power2.inOut',
        scrollTo: { y: target, autoKill: false },
        onComplete: () => {
          store.isAnimating = false
        }
      })
    })

    onUnmounted(() => {
      observer.kill()
      stopWatch()
      gsap.killTweensOf(window)
    })
  })
}
