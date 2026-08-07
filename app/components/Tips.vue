<template>
  <section id="tips" class="bg-[#f0f4f8] py-16 px-6 md:px-12 lg:px-24 scroll-mt-10">
    <div class="w-full max-w-[1120px] mx-auto">
      <!-- Header -->
      <div class="mb-12">
        <span class="text-blue-600 font-mono text-sm tracking-wide">{{ t('tips.tagline') }}</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
          {{ t('tips.title') }}
        </h2>
        <p class="text-slate-600 text-base md:text-lg">
          {{ t('tips.subtitle') }}
        </p>
      </div>

      <!-- Grid Cards Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-slate-100 flex flex-col justify-between relative transition-all duration-300 overflow-hidden"
        >
          <div class="absolute top-6 left-6 text-blue-500 text-3xl font-serif select-none pointer-events-none">“</div>

          <!-- Arrow: hand-drawn sketch style, neutral color, from quote up to photo -->
          <svg
            viewBox="0 0 140 90"
            class="absolute pointer-events-none"
            style="top: 90px; right: 110px; width: 80px; height: 55px;"
            aria-hidden="true"
          >
            <path
              d="M100 65 C72 58, 42 42, 20 14"
              fill="none"
              stroke="#94a3b8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-dasharray="1 5"
            />
            <path
              d="M11 7 L20 14 L28 5"
              fill="none"
              stroke="#94a3b8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div class="pl-4 mb-8">
            <p class="text-slate-800 text-lg leading-relaxed" v-html="card.quote" />
          </div>

          <!-- Author row: text left, brush-stroke photo on the right, parallax on scroll -->
          <div class="pl-4 flex items-center justify-between gap-4">
            <div>
              <div class="font-medium text-sm text-slate-800">{{ card.author }}</div>
              <div class="text-slate-400 text-xs">{{ card.role }}</div>
            </div>

            <div
              class="relative w-[120px] h-20 mb-[30px]
               shrink-0 mr-2"
              :ref="el => (avatarRefs[index] = el)"
              style="will-change: transform;"
            >


           
              <img
                :src="card.image"
                :alt="card.author"
                class="absolute rounded-full object-cover w-full "
                style="top: 8px; left: 3px; ;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '#imports'
import { ref, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()

const cards = [
  { quote: t('tips.cards[0].quote'), author: t('tips.cards[0].author'), role: t('Sem Seyhaa'), image: 'images/seyha.png', color: '#EF9F27', iconBg: '#FAEEDA' },
  { quote: t('tips.cards[1].quote'), author: t('tips.cards[1].author'), role: t('Tum Dariya'), image: 'images/dariya.png', color: '#EF9F27', iconBg: '#FAEEDA' },
  { quote: t('tips.cards[2].quote'), author: t('tips.cards[2].author'), role: t('Somnang Dara'), image: 'images/dara.png', color: '#EF9F27', iconBg: '#FAEEDA' },
  { quote: t('tips.cards[3].quote'), author: t('tips.cards[3].author'), role: t('Thearith'), image: 'images/seyha.png', color: '#EF9F27', iconBg: '#FAEEDA' }
]

const avatarRefs = ref([])
let ticking = false

function updateParallax() {
  avatarRefs.value.forEach((el) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const windowH = window.innerHeight
    const elCenter = rect.top + rect.height / 2
    const progress = (elCenter - windowH / 2) / windowH
    const offset = progress * -24
    el.style.transform = `translateY(${offset}px)`
  })
  ticking = false
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax)
    ticking = true
  }
}

onMounted(() => {
  updateParallax()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>