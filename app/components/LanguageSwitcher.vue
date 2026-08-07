<template>
  <div class="flex items-center gap-2">
    <button
      @click="switchLocale('en')"
      :class="[
        'px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
        locale === 'en'
          ? 'bg-[#FF7A00] text-white'
          : isMobile
            ? 'bg-transparent text-[#0A192F] hover:bg-[#0A192F]/10'
            : isScrolled
              ? 'bg-transparent text-[#0A192F] hover:bg-[#0A192F]/10'
              : 'bg-transparent text-white hover:bg-white/20'
      ]"
      :aria-pressed="locale === 'en'"
    >
      EN
    </button>
    <button
      @click="switchLocale('km')"
      :class="[
        'px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
        locale === 'km'
          ? 'bg-[#FF7A00] text-white'
          : isMobile
            ? 'bg-transparent text-[#0A192F] hover:bg-[#0A192F]/10'
            : isScrolled
              ? 'bg-transparent text-[#0A192F] hover:bg-[#0A192F]/10'
              : 'bg-transparent text-white hover:bg-white/20'
      ]"
      :aria-pressed="locale === 'km'"
    >
      ខ្មែរ
    </button>
  </div>
</template>

<script setup>
import { useI18n } from '#imports'

const props = defineProps({
  isScrolled: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false }
})

const { locale, setLocale } = useI18n()

function switchLocale(code) {
  setLocale(code)
}
</script>