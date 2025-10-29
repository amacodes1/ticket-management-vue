<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthState } from '@/composables/useAuthState'
import WavyBg from '../../../public/images/tsxsvgs/WavyBg'
const { session } = useAuthState()
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="absolute w-96 h-96 bg-[#9B8AFB]/20 rounded-full -top-32 -left-32 z-0"></div>
    <div
      class="absolute hidden sm:block w-56 h-56 bg-[#9B8AFB]/20 rounded-full -top-32 -right-12 z-0"
    ></div>

    <!-- Wavy background -->
    <div class="absolute bottom-5 rotate-180 left-0 w-full text-[#9B8AFB] z-0">
      <WavyBg />
    </div>

    <!-- Floating circle -->
    <div class="hidden md:block absolute top-1/2 right-8 transform -translate-y-1/2 w-80 h-80 text-[#9B8AFB] z-0">
      <img src="/src/assets/circle.svg" alt="" class="w-full h-full opacity-80" />
    </div>

    <div
      class="relative min-h-[95vh] md:h-[520px] flex flex-col justify-center px-6 md:px-16 lg:px-20 z-10"
    >
      <div class="flex flex-col gap-4 max-w-lg md:-mt-10">
        <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-left text-[#111827] dark:text-white">
          TicketApp
        </h1>

        <p class="text-sm sm:text-base md:text-xl text-[#111827]/80 dark:text-white/80 text-left leading-relaxed">
          Streamline your customer support experience.
          <span class="block">
            Track, manage, and resolve tickets effortlessly with a beautiful, intuitive
            interface.
          </span>
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mt-3">
          <RouterLink
            v-if="session"
            to="/dashboard"
            class="flex items-center justify-center rounded-full h-12 px-8 bg-[#9B8AFB] text-white font-semibold shadow-lg shadow-[#9B8AFB]/30 hover:bg-[#9B8AFB]/90 transition-all"
          >
            Go to Dashboard
          </RouterLink>

          <template v-else>
            <RouterLink
              to="/auth/login"
              class="flex items-center justify-center rounded-full h-12 px-4 md:px-8 bg-[#9B8AFB] text-white font-semibold shadow-lg shadow-[#9B8AFB]/30 hover:bg-[#9B8AFB]/90 transition-all"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/auth/signup"
              class="flex items-center justify-center rounded-full h-12 px-8 bg-[#9B8AFB]/10 text-[#9B8AFB] font-semibold hover:bg-[#9B8AFB]/20 transition-all"
            >
              Get Started
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
