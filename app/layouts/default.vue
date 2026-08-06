<template>
  <div class="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0A192F]">
    <header class="site-header sticky top-0 z-50" :class="{ scrolled: headerScrolled }">
      <div class="header-inner max-w-[1120px] mx-auto h-[62px] px-6 flex items-center justify-between">
        <a href="#top" class="logo" aria-label="WMAD Home">
          <img src="https://wmad-classroom.psewmad.org/logo-v2/wmad-bulb-horizontal-teal.svg" alt="WMAD" class="h-14 w-auto" />
        </a>
        
        <nav class="nav-links hidden md:flex gap-8" aria-label="Primary">
          <a href="#guide" class="font-medium text-base text-white hover:text-[#FF7A00] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">Guide</a>
          <a href="#questions" class="font-medium text-base text-white hover:text-[#FF7A00] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">Questions</a>
          <a href="#tips" class="font-medium text-base text-white hover:text-[#FF7A00] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">Tips</a>
          <a href="#faqs" class="font-medium text-base text-white hover:text-[#FF7A00] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">FAQs</a>
        </nav>
        
        <button 
          class="hamburger md:hidden w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer"
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
          aria-controls="mobileMenu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        >
          <!-- Hamburger icon (closed state) -->
          <svg v-if="!menuOpen" class="w-6 h-6" :class="{ 'text-white': !headerScrolled, 'text-[#0A192F]': headerScrolled }" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <!-- VS Code close icon (open state) -->
          <svg v-else class="w-6 h-6" :class="{ 'text-white': !headerScrolled, 'text-[#0A192F]': headerScrolled }" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.91 6.58L18.18.53a1.18 1.18 0 0 0-1.68.22L11 8.27 4.74 3.32a1.17 1.17 0 0 0-1.57.11L.22 6.54a1.18 1.18 0 0 0 0 1.68l4 3.78-4 3.78a1.18 1.18 0 0 0 0 1.68l2.95 3.11a1.18 1.18 0 0 0 1.57.11L11 15.73l5.5 7.52a1.18 1.18 0 0 0 1.68.22l5.73-6.05a1.18 1.18 0 0 0 0-1.68L18 12l5.91-3.74a1.18 1.18 0 0 0 0-1.68zM16.5 12L11 8.27v7.46zm-9 0L4 9.63l1.83-1.4 1.67 1.32zm9 5.86l-2-2.73 2-1.37zm0-11.72v4.1l-2-1.37z"/>
          </svg>
        </button>
      </div>
      
      <nav class="mobile-menu md:hidden overflow-hidden bg-white transition-all duration-300" :class="{ 'is-open': menuOpen }" id="mobileMenu" aria-label="Mobile">
        <a href="#guide" class="block px-6 py-4 font-medium text-[#0A192F]" @click="menuOpen = false">Guide</a>
        <a href="#questions" class="block px-6 py-4 font-medium text-[#0A192F]" @click="menuOpen = false">Questions</a>
        <a href="#tips" class="block px-6 py-4 font-medium text-[#0A192F]" @click="menuOpen = false">Tips</a>
        <a href="#faqs" class="block px-6 py-4 font-medium text-[#0A192F]" @click="menuOpen = false">FAQs</a>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-[#0A192F] text-white text-center py-10 px-6 text-base">
      <p>Built by <span class="text-[#B8C1D1]">WMAD C1</span> for WMAD Class C2.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const headerScrolled = ref(false)

const handleScroll = () => {
  headerScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.site-header {
  background: transparent;
  box-shadow: none;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.site-header.scrolled {
  background: #FFFFFF;
  box-shadow: 0 1px 0 rgba(10,25,47,0.06), 0 6px 16px rgba(10,25,47,0.05);
}

.site-header.scrolled .logo,
.site-header.scrolled .nav-links a,
.site-header.scrolled .mobile-menu a {
  color: #0A192F;
}

.site-header.scrolled .nav-links a:hover {
  color: #175CFF;
}

.site-header.scrolled .nav-links a::after {
  background: #FF7A00;
}

.site-header.scrolled .hamburger span {
  background: #0A192F;
}

.site-header.scrolled .mobile-menu {
  background: #FFFFFF;
}

@media (prefers-reduced-motion: reduce) {
    .hamburger svg,
    .nav-links a::after,
    .site-header {
      transition-duration: 0.001ms !important;
    }
  }
</style>