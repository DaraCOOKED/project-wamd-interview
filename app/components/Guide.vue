<template>
  <section
    id="guide"
    class="interview-process px-4 py-10 sm:px-6 md:px-8 md:py-20"
    :class="{ 'ip-js': jsReady }"
    ref="sectionRef" 
  >
    <div class="ip-container max-w-6xl mx-auto w-full">
      <p class="ip-eyebrow">{{ t('guide.tagline') }}</p>
      <h2 class="ip-heading">{{ t('guide.title') }}</h2>
      <p class="ip-subheading">{{ t('guide.subtitle') }}</p>

      <ol class="ip-timeline">
        <li
          v-for="(step, index) in steps"
          :key="step.number"
          class="ip-item"
          :ref="el => setItemRef(el, index)"
        >
          <div class="ip-marker">
            <div class="ip-circle" :ref="el => setCircleRef(el, index)" v-html="step.icon" />
            <span
              v-if="index < steps.length - 1"
              class="ip-connector"
              :class="`ip-connector--${index}`"
            >
              <span class="ip-connector-fill" :ref="el => setFillRef(el, index)" />
            </span>
          </div>

          <div class="ip-content" :ref="el => setContentRef(el, index)">
            <span class="ip-number">{{ step.number }}</span>
            <h3 class="ip-title">{{ step.title }}</h3>
            <p class="ip-description">{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '#imports'
import { ref, onMounted, onUnmounted } from 'vue'

const { t, locale } = useI18n()

const steps = [
  {
    number: '01',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    get title() { return t('guide.steps[0].title') },
    get description() { return t('guide.steps[0].description') }
  },
  {
    number: '02',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`,
    get title() { return t('guide.steps[1].title') },
    get description() { return t('guide.steps[1].description') }
  },
  {
    number: '03',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    get title() { return t('guide.steps[2].title') },
    get description() { return t('guide.steps[2].description') }
  }
]

// True only once mounted client-side. Until then (or if JS never runs),
// .ip-js is absent and CSS keeps everything visible by default — this is
// the no-JS / pre-hydration safety net, done without any literal <style>
// tag inside <template> (Vue's SFC parser can't handle that).
const jsReady = ref(false)

// ---- refs collected from the v-for (function refs run on every mount) ----
const sectionRef = ref(null)
const itemRefs = ref([])
const circleRefs = ref([])
const contentRefs = ref([])
const fillRefs = ref([])

function setItemRef(el, i) { if (el) itemRefs.value[i] = el }
function setCircleRef(el, i) { if (el) circleRefs.value[i] = el }
function setContentRef(el, i) { if (el) contentRefs.value[i] = el }
function setFillRef(el, i) { if (el) fillRefs.value[i] = el }

// ---- scroll-linked parallax + reveal, tuned to stay smooth on mobile ----
let ticking = false
let reduceMotion = false
let revealObserver = null

function updateParallax() {
  ticking = false
  const viewportH = window.innerHeight

  itemRefs.value.forEach((el, i) => {
    if (!el) return
    const rect = el.getBoundingClientRect()

    // 0 → item just entering from the bottom, 1 → item has reached the top
    const progress = Math.min(Math.max(1 - rect.top / viewportH, 0), 1)

    if (!reduceMotion) {
      const circle = circleRefs.value[i]
      const content = contentRefs.value[i]
      // content drifts a bit more than the circle for a real parallax depth cue
      if (circle) circle.style.transform = `translate3d(0, ${(1 - progress) * 22}px, 0)`
      if (content) content.style.transform = `translate3d(0, ${(1 - progress) * 34}px, 0)`
    }

    // connector line "fills in" as the step above scrolls past center
    const fill = fillRefs.value[i]
    if (fill) {
      const fillProgress = Math.min(
        Math.max((viewportH * 0.75 - rect.top) / (viewportH * 0.5), 0),
        1
      )
      fill.style.transform = `scaleY(${fillProgress})`
    }
  })
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateParallax)
}

onMounted(() => {
  jsReady.value = true
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ip-item--visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  )
  itemRefs.value.forEach((el) => el && revealObserver.observe(el))

  // passive listeners so the browser never blocks the scroll thread on mobile
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateParallax()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  revealObserver?.disconnect()
})
</script>

<style scoped>
.interview-process {
  --ip-bg: #f7f8fa;
  --ip-blue: #3d5afe;
  --ip-orange: #ff7a45;
  --ip-dark: #0f1629;
  --ip-gray: #5b6472;
  --ip-line-light: #c7d2fe;

  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;

  background: var(--ip-bg);
  font-family: var(--font-sans);
  padding: 64px 24px;
  overflow: hidden; /* keeps parallax offsets from ever causing horizontal scroll */
}

/* Site-wide smooth scroll for anchor jumps (e.g. a nav link to #guide) */
:global(html) {
  scroll-behavior: smooth;
}

.ip-container {
  max-width: 640px;
  margin: 0 auto;
}

.ip-eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--ip-blue);
  letter-spacing: 0.02em;
  margin: 0 0 16px;
}

.ip-heading {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--ip-dark);
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}

.ip-subheading {
  font-size: 16px;
  line-height: 1.6;
  color: var(--ip-gray);
  max-width: 460px;
  margin: 0 0 48px;
}

.ip-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ip-item {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

/* Hidden-until-revealed state only applies once JS has hydrated (.ip-js).
   Without JS, or before hydration, items are simply visible. */
.ip-js .ip-item {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.ip-js .ip-item--visible {
  opacity: 1;
  transform: translateY(0);
}

.ip-item:last-child {
  margin-bottom: 0;
}

.ip-marker {
  position: relative;
  width: 40px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.ip-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--ip-blue);
  background: var(--ip-bg);
  color: var(--ip-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.ip-connector {
  position: absolute;
  top: 40px;
  bottom: -40px;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: var(--ip-line-light);
  overflow: hidden;
}

.ip-connector-fill {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, var(--ip-blue), var(--ip-orange));
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.2s linear;
  will-change: transform;
}

.ip-content {
  flex: 1;
  padding-top: 6px;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.ip-number {
  display: block;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--ip-blue);
  margin-bottom: 6px;
}

.ip-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--ip-dark);
  margin: 0 0 8px;
}

.ip-description {
  font-size: 15px;
  line-height: 1.65;
  color: var(--ip-gray);
  max-width: 420px;
  margin: 0;
}

@media (max-width: 480px) {
  .ip-heading {
    font-size: 26px;
  }
}

/* Respect accessibility preference: kill motion, keep content visible */
@media (prefers-reduced-motion: reduce) {
  .ip-item,
  .ip-circle,
  .ip-content,
  .ip-connector-fill {
    transition: none !important;
  }
  .ip-js .ip-item {
    opacity: 1 !important;
    transform: none !important;
  }
  :global(html) {
    scroll-behavior: auto;
  }
}
</style>