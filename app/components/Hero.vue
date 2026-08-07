<template>
  <section
    ref="heroRef"
    class="relative overflow-hidden  bg-[#0A192F] min-h-screen pt-[calc(62px+40px)] pb-20 -mt-[62px]"
    id="top"
  >
    <!-- Glows -->
    <div
      class="absolute rounded-full blur-[70px] w-[440px] h-[440px] bg-blue-500/35 -top-[140px] -left-[100px] pointer-events-none select-none will-change-transform"
      :style="{ transform: `translateY(${offsets['glow-blue']}px)` }"
      aria-hidden="true"
    />
    <div
      class="absolute rounded-full blur-[70px] w-[380px] h-[380px] bg-orange-500/20 -bottom-[160px] -right-[80px] pointer-events-none select-none will-change-transform"
      :style="{ transform: `translateY(${offsets['glow-orange']}px)` }"
      aria-hidden="true"
    />

    <!-- Glyphs -->
    <span
      class="absolute top-[16%] left-[5%] font-mono font-semibold leading-none text-white/7 text-8xl pointer-events-none select-none will-change-transform"
      :style="{ transform: `translateY(${offsets['glyph-1']}px)` }"
      aria-hidden="true"
    >{ }</span>
    <span
      class="absolute bottom-[10%] left-[16%] font-mono font-semibold leading-none text-white/7 text-6xl pointer-events-none select-none will-change-transform"
      :style="{ transform: `translateY(${offsets['glyph-2']}px)` }"
      aria-hidden="true"
    ></span>
    <span
      class="absolute top-[26%] right-[7%] font-mono font-semibold leading-none text-white/7 text-9xl pointer-events-none select-none will-change-transform"
      :style="{ transform: `translateY(${offsets['glyph-3']}px)` }"
      aria-hidden="true"
    >;</span>

    <div class="relative z-10 max-w-[1120px] mt-20 mx-auto px-6 grid grid-cols-1 gap-13 items-center lg:grid-cols-[1.05fr_1fr]">
      <!-- Left column -->
      <div class="text-center lg:text-left">
        <div class="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-full mb-7"
             :class="isScrolled 
               ? 'text-[#175CFF] bg-blue-500/15 border-blue-500/45' 
               : 'text-[#9DBBFF] bg-blue-500/25 border-blue-500/45'">
          <span>{{ t('hero.tagline') }}</span>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight mb-5"
            :class="isScrolled ? 'text-[#0A192F]' : 'text-white'">
          {{ t('hero.title') }}<span class="text-[#FF7A00]">.</span>
        </h1>
        <p class="text-lg max-w-xl mx-auto lg:mx-0 mb-9"
           :class="isScrolled ? 'text-[#0A192F]' : 'text-[#B8C1D1]'">
          {{ t('hero.subtitle') }}
        </p>
        <a
          href="#guide"
          class="inline-block bg-[#FF7A00] text-white font-semibold text-base px-8 py-4 rounded-lg shadow-[0_10px_24px_rgba(255,122,0,0.28),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,122,0,0.36),inset_0_1px_0_rgba(255,255,255,0.3)]"
        >
          {{ t('hero.cta') }}
        </a>
      </div>

      <!-- Right column: code editor -->
      <div class="flex justify-center lg:justify-end" aria-hidden="true">
        <div class="w-full max-w-[420px] bg-[#0D2340] border border-white/10 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(23,92,255,0.15)] overflow-hidden -rotate-[1.4deg]">
          <div class="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <span class="w-[11px] h-[11px] rounded-full bg-[#FF5F57]"></span>
            <span class="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]"></span>
            <span class="w-[11px] h-[11px] rounded-full bg-[#28C840]"></span>
            <span class="ml-2 font-mono text-xs text-[#8492A6]">applicant.js</span>
          </div>
          <pre class="m-0 p-5 pb-6 font-mono text-[0.85rem] leading-[1.9] text-[#C5D1E8] overflow-x-auto"><code><span class="text-[#5C7599]">{{ t('hero.code_comment') }}</span>
<span class="text-[#7AA2FF]">{{ t('hero.code_const') }}</span>
  <span class="text-[#FFA25E]">{{ t('hero.code_cohort') }}</span>,
  <span class="text-[#FFA25E]">{{ t('hero.code_status') }}</span>,
  <span class="text-[#5FE3A1]">{{ t('hero.code_ready') }}</span>
};

<span class="text-[#7AA2FF]">{{ t('hero.code_prepare') }}</span>(applicant)<span class="text-[#FF7A00] animate-blink">|</span></code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from '#imports'

const { t } = useI18n()

const props = defineProps({
  isScrolled: { type: Boolean, default: false }
})

const isScrolled = props.isScrolled

const heroRef = ref(null)
const offsets = ref({
  'glow-blue': 0,
  'glow-orange': 0,
  'glyph-1': 0,
  'glyph-2': 0,
  'glyph-3': 0,
})
const speeds = {
  'glow-blue': 0.14,
  'glow-orange': 0.20,
  'glyph-1': 0.16,
  'glyph-2': 0.24,
  'glyph-3': 0.10,
}
const keys = Object.keys(speeds)

let ticking = false
let rafId = null

function updateParallax() {
  if (!heroRef.value) return
  const vh = window.innerHeight
  const els = heroRef.value.querySelectorAll('.will-change-transform')
  const newOffsets = {}
  els.forEach((el, i) => {
    if (i >= keys.length) return
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    const delta = (vh / 2 - center) * speeds[keys[i]]
    newOffsets[keys[i]] = delta
  })
  offsets.value = newOffsets
}

function onScroll() {
  if (ticking) return
  ticking = true
  rafId = requestAnimationFrame(() => {
    updateParallax()
    ticking = false
  })
}

onMounted(() => {
  nextTick(updateParallax)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})
</script>

<style scoped>
/* Only the blink animation – everything else is Tailwind */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.animate-blink {
  animation: blink 1.1s steps(1) infinite;
}
</style>