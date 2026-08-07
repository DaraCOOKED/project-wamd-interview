<template>
  <section id="faqs" class="faq-section px-4 py-10 sm:px-6 md:px-8 md:py-20">
    <p class="faq-eyebrow">{{ t('faqs.tagline') }}</p>
    <h2 class="faq-title">{{ t('faqs.title') }}</h2>

    <div class="faq-list max-w-6xl mx-auto w-full">
      <div
        v-for="(item, index) in resolvedFaqs"
        :key="index"
        class="faq-item"
      >
        <button
          class="faq-question"
          type="button"
          :aria-expanded="openIndex === index"
          @click="toggle(index)"
        >
          <span>{{ item.question }}</span>
          <span class="faq-icon" :class="{ open: openIndex === index }">+</span>
        </button>

        <div
          class="faq-answer-wrap"
          :class="{ open: openIndex === index }"
        >
          <p class="faq-answer">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '#imports'

const { t, tm, rt } = useI18n()

const props = defineProps({
  faqs: {
    type: Array,
    default: () => []
  }
})

const openIndex = ref(null)

const resolvedFaqs = computed(() => {
  if (props.faqs.length > 0) {
    return props.faqs
  }
  // tm() pulls the raw array of message objects from faqs.items
  // rt() resolves each nested message so it's actually translated
  const items = tm('faqs.items')
  return items.map(item => ({
    question: rt(item.question),
    answer: rt(item.answer)
  }))
})

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.faq-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px;
}

.faq-eyebrow {
  font-family: 'Roboto Mono', monospace;
  color: #175CFF;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px;
}

.faq-title {
  font-family: 'Inter', sans-serif;
  color: #0A192F;
  font-size: 40px;
  font-weight: 800;
  margin: 0 0 32px;
}

.faq-list {
  border-top: 1px solid #e5e7eb;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 20px 0;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #0A192F;
}

.faq-icon {
  flex-shrink: 0;
  color: #175CFF;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
  transition: transform 0.2s ease;
}

.faq-icon.open {
  transform: rotate(45deg);
}

.faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}

.faq-answer-wrap.open {
  grid-template-rows: 1fr;
}

.faq-answer {
  overflow: hidden;
  margin: 0;
  padding-bottom: 0;
  color: #4b5563;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  min-height: 0;
}

.faq-answer-wrap.open .faq-answer {
  padding-bottom: 20px;
}

.faq-answer-wrap:not(.open) .faq-answer {
  visibility: hidden;
}
</style>