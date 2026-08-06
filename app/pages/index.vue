<template>
  <Hero />
 
  <Guide />
   <Tips />
  <FaqAccordion :faqs="[
  { question: 'How long does each interview take?', answer: 'ot mean data te' },
  { question: 'Can I use notes?', answer: 'bro som alok' },
  { question: 'What happens if I don\'t pass on my first attempt?', answer: '...' },
  { question: 'What should I bring?', answer: '...' },
  { question: 'How soon will I hear back after my interview?', answer: '...' }
]" />
  
</template>


<script setup>
import FaqAccordion from '~/components/FaqAccordion.vue'
import Hero from '~/components/Hero.vue'
import Tips from '~/components/Tips.vue'
import Guide from '~/components/Guide.vue'   
</script> 
