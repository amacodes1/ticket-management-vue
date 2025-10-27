<script setup lang="ts">
import { ref } from "vue";

import { Plus, ClipboardList, Users, ChartBarIncreasing } from "lucide-vue-next";

const refEl = ref(null);

const features = [
  { icon: Plus, title: "Easy Ticket Submission", text: "Submit new support tickets in seconds with our intuitive interface." },
  { icon: ClipboardList, title: "Streamlined Ticket Tracking", text: "Keep track of all your tickets in one place, with clear status updates." },
  { icon: Users, title: "Seamless Team Collaboration", text: "Collaborate with your team to resolve issues faster and more efficiently." },
  { icon: ChartBarIncreasing, title: "Performance Insights", text: "Analyze team performance and identify areas to improve response times." },
];
</script>

<template>
  <main ref="refEl" class="px-6 md:px-16 lg:px-20 mb-20 scroll-mt-24">
    <div class="flex flex-col gap-16">
      <div v-motion class="flex flex-col gap-4 text-center" :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600 }">
        <h2 class="text-2xl md:text-4xl font-bold tracking-tight">Why Use Ticket App</h2>
        <p class="text-sm md:text-lg text-[#111827]/70 dark:text-white/70 max-w-3xl mx-auto">Discover how TicketApp can streamline your support process.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(item, i) in features" :key="i" v-motion class="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 shadow-md hover:shadow-xl transition-shadow duration-300" :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :transition="{ delay: i * 200, duration: 600 }">
          <div class="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
            <component :is="item.icon" class="text-[#9B8AFB] w-6 h-6" />
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-lg md:text-xl font-bold">{{ item.title }}</h3>
            <p class="text-[#111827]/70 dark:text-white/70 text-sm md:text-base">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

