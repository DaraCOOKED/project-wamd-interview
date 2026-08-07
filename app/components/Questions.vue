<template>
  <section id="questions" class="bg-white py-8 sm:py-12 lg:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Category Tagline -->
      <div class="flex items-center gap-2 font-mono text-xs sm:text-sm font-medium text-blue-600 mb-3 sm:mb-4">
        <span>//</span>
        <span>{{ t('questions.tagline') }}</span>
      </div>

      <!-- Heading -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4">
        {{ t('questions.title') }}
      </h1>

      <!-- Description -->
      <p class="text-slate-500 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
        {{ t('questions.subtitle') }}
      </p>

      <!-- Category List -->
      <div class="flex flex-col gap-3 sm:gap-4">
        <div
          v-for="cat in categories"
          :key="cat.key"
          class="rounded-xl sm:rounded-2xl border border-slate-200 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md hover:-translate-y-0.5"
        >
          <button
            type="button"
            @click="openPopup(cat.key)"
            class="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left gap-4 group"
          >
            <span class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0">
              <span class="text-base sm:text-lg font-bold text-blue-600 truncate group-hover:text-blue-700 transition-colors">
                {{ cat.name }}
              </span>
              <span class="font-mono text-xs sm:text-sm text-slate-400 whitespace-nowrap">
                {{ cat.questions.length }} {{ t('questions.question_count') }}
              </span>
            </span>
            <svg
              class="w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Popup Modal -->
      <transition name="backdrop">
        <div
          v-if="openKey"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 sm:p-6"
          @click.self="closePopup"
          @keydown.escape.window="closePopup"
          role="dialog"
          aria-modal="true"
        >
          <transition name="pop" appear>
            <div
              v-if="openKey"
              class="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 overflow-hidden modal-glow"
            >
              <!-- Modal Header -->
              <div class="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 sm:py-5 flex-shrink-0 bg-slate-50/50">
                <div class="flex items-center gap-2.5 truncate pr-2">
                  <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  <h2 class="text-lg sm:text-xl font-bold text-blue-600 truncate">{{ activeCategory?.name }}</h2>
                </div>
                <button
                  type="button"
                  @click="closePopup"
                  class="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg p-1.5 transition-all duration-200 hover:rotate-90 active:scale-95"
                  :aria-label="t('closeMenu')"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Question List with Animated Stagger -->
              <transition-group
                tag="ul"
                name="stagger"
                class="flex flex-col gap-3 px-5 sm:px-6 py-5 overflow-y-auto"
              >
                <li
                  v-for="(q, i) in activeCategory?.questions"
                  :key="q"
                  :style="{ animationDelay: `${i * 60 + 100}ms` }"
                  class="stagger-item group/item flex gap-3.5 text-sm sm:text-base text-slate-600 leading-relaxed p-3 rounded-xl hover:bg-blue-50/60 transition-all duration-200 hover:translate-x-1.5 hover:text-slate-900"
                >
                  <span class="font-mono text-xs sm:text-sm text-blue-500 font-semibold mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    {{ String(i + 1).padStart(2, '0') }}
                  </span>
                  <span>{{ q }}</span>
                </li>
              </transition-group>
            </div>
          </transition>
        </div>
      </transition>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useI18n } from '#imports'

// Destructure tm alongside t
const { t, tm, rt } = useI18n()

const openKey = ref(null)

// Helper to safely parse array messages from vue-i18n
const getQuestions = (path) => {
  const res = tm(path)
  if (!Array.isArray(res)) return []
  // rt() handles translating AST nodes if escapeParameter is active
  return res.map((item) => (typeof rt === 'function' ? rt(item) : item))
}

const categories = computed(() => [
  {
    key: 'technical',
    name: t('questions.categories.technical.name'),
    questions: getQuestions('questions.categories.technical.questions'),
  },
  {
    key: 'motivation',
    name: t('questions.categories.motivation.name'),
    questions: getQuestions('questions.categories.motivation.questions'),
  },
  {
    key: 'teamwork',
    name: t('questions.categories.teamwork.name'),
    questions: getQuestions('questions.categories.teamwork.questions'),
  },
])

const activeCategory = computed(() =>
  categories.value.find((c) => c.key === openKey.value) || null
)

function openPopup(key) {
  openKey.value = key
}

function closePopup() {
  openKey.value = null
}

watch(openKey, (val) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Backdrop Overlay Animation */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.35s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

/* Modal Window Animation (Pop + Scale + Tilt Entry) */
.pop-enter-active {
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.pop-leave-active {
  transition: all 0.25s cubic-bezier(0.7, 0, 0.84, 0);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.85) translateY(24px) rotateX(-8deg);
}
.pop-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(16px);
}

/* Stagger Animation for List Items */
.stagger-item {
  animation: questionSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes questionSlideIn {
  0% {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Visual Glow Effect for Modal Window */
.modal-glow {
  box-shadow: 0 20px 50px -12px rgba(37, 99, 235, 0.15), 0 0 0 1px rgba(226, 232, 240, 0.8);
}
</style>