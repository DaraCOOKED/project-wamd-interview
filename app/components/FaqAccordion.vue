<template>
  <section class="faq-section">
    <p class="faq-eyebrow">// faqs</p>
    <h2 class="faq-title">Frequently Asked Questions</h2>

    <div class="faq-list">
      <div
        v-for="(item, index) in faqs"
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
import { ref } from 'vue'

// Pass your own list via props if you want, this is just default content
const props = defineProps({
  faqs: {
    type: Array,
    default: () => [
      {
        question: 'How long does each interview take?',
        answer: 'Each interview typically takes around 30–45 minutes, depending on the role and stage.'
      },
      {
        question: 'Can I use notes during the technical interview?',
        answer: 'Yes, you can refer to short notes, but you should be ready to explain your thinking out loud.'
      },
      {
        question: "What happens if I don't pass on my first attempt?",
        answer: 'You can request feedback and reapply after the cooldown period specified in the guide.'
      },
      {
        question: 'What should I bring?',
        answer: 'Bring a valid ID, a printed or digital copy of your resume, and a notebook if you prefer taking notes.'
      },
      {
        question: 'How soon will I hear back after my interview?',
        answer: 'Results are usually shared within 3–5 business days via email.'
      }
    ]
  }
})

const openIndex = ref(null)

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