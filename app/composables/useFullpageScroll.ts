import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Desktop (md+) snaps section to section; mobile scrolls natively, because a
// section taller than the device screen can't be read when every gesture
// jumps to the next one.
const DESKTOP_QUERY = '(min-width: 768px)'
const MOBILE_QUERY = '(max-width: 767px)'

export function useFullpageScroll() {
  const store = useNavigationStore()

  onMounted(() => {
    gsap.registerPlugin(Observer, ScrollToPlugin)

    const mm = gsap.matchMedia()

    // Set when store.currentIndex changes to follow the page instead of to
    // move it; the scrollTo watcher below skips exactly one change then.
    let syncingFromScroll = false

    mm.add(DESKTOP_QUERY, () => {
      // Entering desktop (e.g. a window resized up from mobile) can leave the
      // page between sections: snap to the nearest one so next()/prev() and
      // the scroll position agree again.
      const nearest = store.sections.reduce((best, section, index) => {
        const el = document.getElementById(section.id)
        const bestEl = document.getElementById(store.sections[best]!.id)
        if (!el || !bestEl) return best
        return Math.abs(el.offsetTop - window.scrollY) < Math.abs(bestEl.offsetTop - window.scrollY) ? index : best
      }, 0)
      const nearestEl = document.getElementById(store.sections[nearest]!.id)
      if (nearest !== store.currentIndex) {
        syncingFromScroll = true
        store.currentIndex = nearest
      }
      if (nearestEl) window.scrollTo({ top: nearestEl.offsetTop })

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

      return () => {
        wheelObserver.kill()
        touchObserver.kill()
        window.removeEventListener('keydown', onKeydown)
      }
    })

    // Mobile: keep store.currentIndex following the section that crosses the
    // middle of the viewport, so section-driven effects (background glows,
    // carousel drag hint) still run. These updates must not trigger the
    // scrollTo below, or native scrolling would be yanked to section tops.
    mm.add(MOBILE_QUERY, () => {
      const sectionObserver = new IntersectionObserver((entries) => {
        if (store.isAnimating) return
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = store.sections.findIndex(section => section.id === entry.target.id)
          if (index !== -1 && index !== store.currentIndex) {
            syncingFromScroll = true
            store.currentIndex = index
          }
        }
      }, { rootMargin: '-50% 0px -50% 0px' })

      for (const section of store.sections) {
        const el = document.getElementById(section.id)
        if (el) sectionObserver.observe(el)
      }

      return () => sectionObserver.disconnect()
    })

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

    // Header/menu links (store.goToId) animate on both desktop and mobile.
    const stopWatch = watch(() => store.currentIndex, (index) => {
      if (syncingFromScroll) {
        syncingFromScroll = false
        return
      }

      const section = store.sections[index]
      const target = section && document.getElementById(section.id)
      if (!target) return

      store.isAnimating = true
      gsap.to(window, {
        duration: prefersReducedMotion() ? 0 : 1,
        ease: 'power2.inOut',
        scrollTo: { y: target, autoKill: false },
        onComplete: () => {
          store.isAnimating = false
        }
      })
    })

    onUnmounted(() => {
      mm.revert()
      stopWatch()
      stopLockWatch()
      document.documentElement.classList.remove('overflow-hidden')
      gsap.killTweensOf(window)
    })
  })
}
