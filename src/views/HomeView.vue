<script setup lang="ts">
import Hero from "@/components/Landing/Hero-Section.vue";
import ChallengesSection from "@/components/Landing/Challenges-Section.vue";
import Features from "@/components/Landing/Features-Section.vue";
</script>


<template>
  <div class="text-[#111827] dark:text-white transition-colors duration-300">
    <div class="relative w-full max-w-7xl mx-auto">
      <Hero />
      <ChallengesSection />
      <Features />
    </div>
  </div>
</template>


