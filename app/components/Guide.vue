<template>
  <section id="guide" class="interview-process">
    <div class="ip-container">
      <p class="ip-eyebrow">{{ t('guide.tagline') }}</p>
      <h2 class="ip-heading">{{ t('guide.title') }}</h2>
      <p class="ip-subheading">{{ t('guide.subtitle') }}</p>

      <ol class="ip-timeline">
        <li
          v-for="(step, index) in steps"
          :key="step.number"
          class="ip-item"
        >
          <div class="ip-marker">
            <div class="ip-circle" v-html="step.icon" />
            <span v-if="index < steps.length - 1" class="ip-connector" :class="`ip-connector--${index}`" />
          </div>

          <div class="ip-content">
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
  },
]
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
}

.ip-connector {
  position: absolute;
  top: 40px;
  bottom: -40px;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
}

.ip-connector--0 {
  background: linear-gradient(to bottom, var(--ip-blue) 0%, var(--ip-blue) 45%, var(--ip-orange) 100%);
}

.ip-connector--1 {
  background: linear-gradient(to bottom, var(--ip-line-light) 0%, var(--ip-line-light) 60%, transparent 100%);
}

.ip-content {
  flex: 1;
  padding-top: 6px;
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
</style>