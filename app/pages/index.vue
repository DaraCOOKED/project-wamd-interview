<template>
  <Hero />
 <Guide />
  <Questions />
  <Tips />
  
   
  <FaqAccordion :faqs="[
  { question: 'How long does each interview take?', answer: 'Each interview takes approximately 3 hours.' },
  { question: 'Can I use notes?', answer: 'Yes, you can use but not in the interview room' },
  { question: 'What happens if I don\'t pass on my first attempt?', answer: 'You can choose another skill or maybe try again next year.' },
  { question: 'What should I bring?', answer: 'You should bring your ID card and dress properly' },
  { question: 'How soon will I hear back after my interview?', answer: 'Yes, you will hear back within a week after your interview.' },
  {question:'If im not good in English can i join WMAD?', answer:'Yes, you can join WMAD even if you are not good in English. We have a supportive community and resources to help you improve your skills.'}
]" />
  
</template>


<script setup>
import FaqAccordion from '~/components/FaqAccordion.vue'
import Hero from '~/components/Hero.vue'
import Questions from '~/components/Questions.vue';
import Tips from '~/components/Tips.vue'
import Guide from '~/components/Guide.vue'   
</script> 
