<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-[#111827] transition-colors duration-300">
    <Header />
    <div class="flex-1 mt-16">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header-Section.vue";
import Footer from "@/components/Footer-Section.vue";
</script>
