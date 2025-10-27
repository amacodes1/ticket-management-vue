<template>
  <section ref="rootRef" class="relative py-16 px-6 md:px-16 lg:px-20 text-[#111827] dark:text-white">
    <div class="max-w-6xl mx-auto text-center mb-12">
      <h2 v-motion :initial="h2Init" :enter="h2Enter" class="text-2xl md:text-4xl font-bold tracking-tight">The Challenges Companies Face</h2>
      <p v-motion :initial="pInit" :enter="pEnter" :transition="{ delay: 200 }" class="mt-3 text-[#111827]/70 dark:text-white/70 text-sm md:text-lg">Why modern teams turn to <span class="text-[#9B8AFB] font-semibold">TicketApp</span> for better support management</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
      <div v-for="(item, index) in challenges" :key="item.id">
        <div v-motion class="flex flex-col items-start text-left relative" :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 700, delay: 300 + index * 200 }">
          <div class="w-[30%] sm:w-[40%] h-1 bg-[#9B8AFB] dark:bg-[#9B8AFB]/70 mb-6"></div>
          <h3 class="text-2xl md:text-4xl font-extrabold text-[#9B8AFB] dark:text-[#B8AFFF]">
            <span class="flex" v-if="inView">
              <CountUp :end-val="item.number" :duration="2.5" />{{ item.suffix }}
            </span>
          </h3>
          <h4 class="text-lg md:text-xl font-semibold mt-3">{{ item.title }}</h4>
          <p class="mt-2 text-[#111827]/70 dark:text-white/70 text-sm leading-relaxed">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CountUp from "vue-countup-v3";
import { useIntersectionObserver } from "@vueuse/core";

const challenges = [
    {
      id: 1,
      number: 200,
      suffix: "B+",
      title: "Customer Requests Lost Yearly",
      text: "Over $200B worth of customer requests are lost yearly due to inefficient ticketing and poor support workflows.",
    },
    {
      id: 2,
      number: 25,
      suffix: "M+",
      title: "Unresolved Tickets Monthly",
      text: "More than 25 million tickets go unresolved every month, leading to customer churn and revenue loss.",
    },
    {
      id: 3,
      number: 70,
      suffix: "%",
      title: "Delayed Responses",
      text: "70% of support teams fail to respond within expected timeframes, reducing overall customer satisfaction.",
    },
    {
      id: 4,
      number: 32,
      suffix: "%",
      title: "Reduced Productivity",
      text: "Companies report a 32% drop in productivity when managing requests without a unified ticketing solution.",
    },
  ];

const rootRef = ref<HTMLElement | null>(null);
const inView = ref(false);

useIntersectionObserver(
  rootRef,
  ([entry]) => {
    if (entry?.isIntersecting) inView.value = true;
  },
  { threshold: 0.2 }
);

const h2Init = { opacity: 0, y: 30 };
const h2Enter = { opacity: 1, y: 0 };
const pInit = { opacity: 0, y: 20 };
const pEnter = { opacity: 1, y: 0 };
</script>
