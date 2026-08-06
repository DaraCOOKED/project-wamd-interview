<template>
  <div class="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0A192F]">
    <header class="site-header sticky top-0 z-50" :class="{ scrolled: headerScrolled }">
      <div class="header-inner max-w-[1120px] mx-auto h-[72px] px-6 flex items-center justify-between">
        <a href="#top" class="logo font-black text-xl tracking-tight text-[#0A192F] text-decoration-none">
          WMAD<span class="text-[#FF7A00]">.</span>
        </a>
        
        <nav class="nav-links hidden md:flex gap-8" aria-label="Primary">
          <a href="#guide" class="font-medium text-base text-[#0A192F] hover:text-[#175CFF] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">Guide</a>
          <a href="#questions" class="font-medium text-base text-[#0A192F] hover:text-[#175CFF] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">Questions</a>
          <a href="#tips" class="font-medium text-base text-[#0A192F] hover:text-[#175CFF] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">Tips</a>
          <a href="#faqs" class="font-medium text-base text-[#0A192F] hover:text-[#175CFF] transition-colors relative pb-1 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#FF7A00] after:w-0 after:transition-all hover:after:w-full">FAQs</a>
        </nav>
        
        <button 
          class="hamburger md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none cursor-pointer"
          @click="menuOpen = !menuOpen"
          :class="{ 'is-open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="mobileMenu"
          aria-label="Toggle menu"
        >
          <span class="w-[22px] h-[2px] rounded transition-all duration-250" :class="{ 'bg-white': !headerScrolled, 'bg-[#0A192F]': headerScrolled }" :style="{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : '', opacity: menuOpen ? (index === 1 ? 0 : 1) : 1 }"></span>
          <span class="w-[22px] h-[2px] rounded transition-all duration-250" :class="{ 'bg-white': !headerScrolled, 'bg-[#0A192F]': headerScrolled }" :style="{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : '', opacity: menuOpen ? (index === 1 ? 0 : 1) : 1 }"></span>
          <span class="w-[22px] h-[2px] rounded transition-all duration-250" :class="{ 'bg-white': !headerScrolled, 'bg-[#0A192F]': headerScrolled }" v-if="false"></span>
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

.mobile-menu {
  max-height: 0;
}

.mobile-menu.is-open {
  max-height: 320px;
}

.hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.is-open span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (prefers-reduced-motion: reduce) {
  .hamburger span,
  .nav-links a::after,
  .site-header {
    transition-duration: 0.001ms !important;
  }
}
</style>