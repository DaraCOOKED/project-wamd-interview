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
          class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-slate-100 flex flex-col justify-between relative transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="absolute top-6 left-6 text-blue-500 text-3xl font-serif select-none pointer-events-none">“</div>
          <div class="pl-4 mb-8">
            <p class="text-slate-800 text-lg leading-relaxed" v-html="card.quote" />
          </div>
          <div class="pl-4 text-blue-600 font-medium text-sm">
            {{ card.author }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useI18n } from '#imports'

const { t } = useI18n()

const cards = [
  { quote: t('tips.cards[0].quote'), author: t('tips.cards[0].author') },
  { quote: t('tips.cards[1].quote'), author: t('tips.cards[1].author') },
  { quote: t('tips.cards[2].quote'), author: t('tips.cards[2].author') },
  { quote: t('tips.cards[3].quote'), author: t('tips.cards[3].author') },
  { quote: t('tips.cards[4].quote'), author: t('tips.cards[4].author') },
]
</script>