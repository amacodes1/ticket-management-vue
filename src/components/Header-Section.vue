<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { Menu, X, Ticket } from "lucide-vue-next";
import { getSession, clearSession } from "@/lib/auth";


const router = useRouter();
const session = getSession();
const menuOpen = ref(false);

const initials = computed(() => {
  const name = session?.name || "";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return (parts[0]?.[0] ?? "").toUpperCase();
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
});

function handleLogout() {
  clearSession();
  toast.success("Logged out successfully");
  router.push("/");
}

function logoutAndClose() {
  handleLogout();
  menuOpen.value = false;
}
</script>

<template>
  <header class="w-full bg-white dark:bg-[#111827] shadow-sm fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800">
    <div class="mx-auto max-w-container-xl px-6 md:px-16 lg:px-20 py-4 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-[#9B8AFB] flex items-center justify-center">
          <Ticket class="w-6 h-6 text-white" />
        </div>
        <div class="text-lg font-semibold text-[#111827] dark:text-white">TicketApp</div>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
        <RouterLink to="/" class="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]">Home</RouterLink>
        <RouterLink to="/tickets" class="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]">Tickets</RouterLink>
        <RouterLink to="/dashboard" class="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]">Dashboard</RouterLink>
      </nav>

      <div class="hidden md:flex items-center gap-4">
        <template v-if="session">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-[#9B8AFB] text-white font-semibold flex items-center justify-center">{{ initials }}</div>
              <div class="text-sm font-medium text-[#111827] dark:text-white">{{ session.name }}</div>
            </div>
            <button @click="handleLogout" class="px-3 py-1 font-semibold cursor-pointer text-[#9B8AFB] text-base hover:text-[#9B8AFB]/80">Logout</button>
          </div>
        </template>
        <RouterLink v-else to="/auth/login" class="px-3 py-1 bg-[#9B8AFB] cursor-pointer text-white rounded text-base hover:bg-[#9B8AFB]/90">Login</RouterLink>
      </div>

      <button @click="menuOpen = !menuOpen" class="md:hidden cursor-pointer p-2 rounded-lg text-[#111827] dark:text-white hover:bg-[#9B8AFB]/10">
        <component :is="menuOpen ? X : Menu" class="w-6 h-6 cursor-pointer" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div v-if="menuOpen" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :leave="{ opacity: 0 }" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" @click="menuOpen = false" />
    <div
      v-if="menuOpen"
      v-motion
      :initial="{ x: '100%' }"
      :enter="{ x: 0 }"
      :leave="{ x: '100%' }"
      :transition="{ type: 'spring', stiffness: 100, damping: 18 }"
      class="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white dark:bg-[#111827] border-l border-gray-200 dark:border-gray-700 shadow-xl z-50 p-6 flex flex-col justify-between"
    >
      <div>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-base font-semibold text-[#111827] dark:text-white">TicketApp</h2>
          <button @click="menuOpen = false" class="p-2 text-[#111827] dark:text-white hover:bg-[#9B8AFB]/10 rounded-lg">
            <X class="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div class="flex flex-col gap-5">
          <RouterLink to="/" @click="menuOpen = false" class="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]">Home</RouterLink>
          <RouterLink to="/tickets" @click="menuOpen = false" class="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]">Tickets</RouterLink>
          <RouterLink to="/dashboard" @click="menuOpen = false" class="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]">Dashboard</RouterLink>

          <template v-if="session">
            <div class="flex flex-col border-t border-gray-200 pt-4 mt-8">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#9B8AFB] text-white font-semibold flex items-center justify-center">{{ initials }}</div>
                <span class="text-sm text-[#111827] dark:text-white">{{ session.name }}</span>
              </div>
              <button @click="logoutAndClose" class="text-[#9B8AFB] font-semibold text-sm mt-2">Logout</button>
            </div>
          </template>

          <RouterLink v-else to="/auth/login" @click="menuOpen = false" class="mt-4 px-3 py-2 bg-[#9B8AFB] text-white rounded text-center text-base hover:bg-[#9B8AFB]/90">Login</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
