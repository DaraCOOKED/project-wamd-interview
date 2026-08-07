// Lightweight parallax: shifts an element at a fraction of scroll speed.
// No libraries. Only moves things with `transform` (GPU-composited, cheap)
// and only runs the scroll math while the element is actually on screen —
// that second part is what keeps this fast on low-end phones.

export function useParallax(targetRef, speed = 0.3) {
  let ticking = false
  let isVisible = false
  let observer

  function updatePosition() {
    if (!targetRef.value) return
    const rect = targetRef.value.getBoundingClientRect()
    const offset = rect.top * speed
    targetRef.value.style.transform = `translate3d(0, ${offset}px, 0)`
    ticking = false
  }

  function onScroll() {
    if (!isVisible || ticking) return
    ticking = true
    requestAnimationFrame(updatePosition)
  }

  onMounted(() => {
    // Respect users who've asked their OS for less motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !targetRef.value) return

    observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) updatePosition()
    })
    observer.observe(targetRef.value)

    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    observer?.disconnect()
  })
}