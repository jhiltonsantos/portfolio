import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export function useFullpageScroll() {
  const store = useNavigationStore()

  onMounted(() => {
    gsap.registerPlugin(Observer, ScrollToPlugin)

    // Wheel: deltaY > 0 (scrolling down) means the content should move up
    // to reveal what's below, so it maps to next().
    const wheelObserver = Observer.create({
      target: window,
      type: 'wheel',
      preventDefault: true,
      tolerance: 10,
      ignore: '[data-carousel]',
      onDown: () => store.next(),
      onUp: () => store.prev()
    })

    // Touch: GSAP reports the raw finger-movement delta, which is the
    // opposite convention of wheel — dragging the finger down (deltaY > 0)
    // is the "pull earlier content into view" gesture (previous section),
    // same as swiping/scrolling up. So onDown/onUp are swapped relative to
    // the wheel observer above.
    const touchObserver = Observer.create({
      target: window,
      type: 'touch',
      preventDefault: true,
      tolerance: 10,
      ignore: '[data-carousel]',
      onDown: () => store.prev(),
      onUp: () => store.next()
    })

    function onKeydown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        store.next()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        store.prev()
      }
    }

    window.addEventListener('keydown', onKeydown)

    // Reka UI's dialog scroll lock sets `overflow: hidden` on <body>, but this
    // page's scrolling element is <html> (document.scrollingElement), which it
    // never touches — so native wheel/touch scrolling of the page keeps working
    // underneath an open modal even though our own Observers above never see
    // those events (Reka stops their propagation before they reach window).
    // Lock the actual scrolling element ourselves, driven by the same
    // store.isLocked flag that guards goTo().
    const stopLockWatch = watch(() => store.isLocked, (locked) => {
      document.documentElement.classList.toggle('overflow-hidden', locked)
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
      wheelObserver.kill()
      touchObserver.kill()
      window.removeEventListener('keydown', onKeydown)
      stopWatch()
      stopLockWatch()
      document.documentElement.classList.remove('overflow-hidden')
      gsap.killTweensOf(window)
    })
  })
}
