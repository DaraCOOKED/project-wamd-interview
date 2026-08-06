<template>
  <Hero />
  <Guide />
  <Questions />
  <Tips />
  <FaqAccordion />
  
   
 
  
</template>


<script setup>
  import FaqAccordion from '~/components/FaqAccordion.vue'
  import Hero from '~/components/Hero.vue'
  import Questions from '~/components/Questions.vue';
  import Tips from '~/components/Tips.vue'
  import Guide from '~/components/Guide.vue'   
</script> 

<style scoped >

html {
  scroll-behavior: smooth;
}
  /* Add any page-specific styles here */
</style>
