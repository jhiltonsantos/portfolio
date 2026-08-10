// The page-level fullpage-scroll Observer (useFullpageScroll.ts) ignores all
// touches starting inside [data-carousel] entirely, so its own horizontal
// card-swipe isn't hijacked into a section change. That leaves a gap: a
// vertical swipe that happens to start on a card wouldn't trigger a section
// change either — it would just fall through to the browser's native scroll.
// This composable fills that gap with its own lightweight touch handling,
// scoped to the carousel element only, independent of the GSAP Observer:
// horizontal drags are left alone (native scroll-snap + touch-pan-x handle
// them, unchanged), and a vertical drag past a small threshold calls
// store.next()/prev() directly and prevents the native scroll so the page
// doesn't creep instead of snapping to the next section.
export function useCarouselSectionSwipe(carouselRef: Ref<HTMLElement | null>) {
  const store = useNavigationStore()

  onMounted(() => {
    const el = carouselRef.value
    if (!el) return

    let startX = 0
    let startY = 0
    let axis: 'x' | 'y' | null = null

    function onTouchStart(event: TouchEvent) {
      const touch = event.touches[0]
      if (!touch) return
      startX = touch.clientX
      startY = touch.clientY
      axis = null
    }

    function onTouchMove(event: TouchEvent) {
      const touch = event.touches[0]
      if (!touch) return

      if (!axis) {
        const dx = Math.abs(touch.clientX - startX)
        const dy = Math.abs(touch.clientY - startY)
        if (dx > 8 || dy > 8) axis = dx > dy ? 'x' : 'y'
      }

      if (axis === 'y' && event.cancelable) event.preventDefault()
    }

    function onTouchEnd(event: TouchEvent) {
      if (axis !== 'y' || store.isAnimating) return

      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaY = touch.clientY - startY
      if (Math.abs(deltaY) < 24) return

      if (deltaY < 0) {
        store.next()
      } else {
        store.prev()
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    onUnmounted(() => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    })
  })
}
