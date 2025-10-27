<script setup lang="ts">
import { loadTickets } from "@/lib/ticketStorage";
import { getSession } from "@/lib/auth";
import { Ticket, Play, Clock, CheckCircle } from "lucide-vue-next";

const tickets = loadTickets();
const session = getSession();
const total = tickets.length;
const open = tickets.filter((t) => t.status === "open").length;
const inProg = tickets.filter((t) => t.status === "in_progress").length;
const closed = tickets.filter((t) => t.status === "closed").length;
const sessionName = session?.name || session?.email || "User";
</script>


<template>
  <main class="flex-1 py-2 mt-4 px-6 md:px-16 lg:px-20 mb-20 md:mb-36">
    <div class="mx-auto max-w-7xl py-12">
      <h1 class="text-xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-2xl">Dashboard</h1>
      <h1 class="text-base font-base tracking-tight text-[#111827] dark:text-white sm:text-base">Welcome, {{ sessionName }}</h1>

      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex flex-col gap-4 rounded-xl bg-[#9B8AFB]/10 dark:bg-gray-800/50 p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#9B8AFB]/20"><Ticket class="text-[#9B8AFB] w-6 h-6" /></div>
            <p class="text-lg font-medium text-[#111827] dark:text-white">Total Tickets</p>
          </div>
          <p class="text-4xl font-bold tracking-tight text-[#9B8AFB] dark:text-white">{{ total }}</p>
        </div>

        <div class="flex flex-col gap-4 rounded-xl bg-green-50 dark:bg-green-900/20 p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20"><Play class="text-green-600 w-6 h-6" /></div>
            <p class="text-lg font-medium text-[#111827] dark:text-white">Open Tickets</p>
          </div>
          <p class="text-4xl font-bold tracking-tight text-green-600">{{ open }}</p>
        </div>

        <div class="flex flex-col gap-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20"><Clock class="text-amber-600 w-6 h-6" /></div>
            <p class="text-lg font-medium text-[#111827] dark:text-white">In Progress</p>
          </div>
          <p class="text-4xl font-bold tracking-tight text-amber-600">{{ inProg }}</p>
        </div>

        <div class="flex flex-col gap-4 rounded-xl bg-gray-100 dark:bg-gray-900/20 p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-400/20"><CheckCircle class="text-gray-600 w-6 h-6" /></div>
            <p class="text-lg font-medium text-[#111827] dark:text-white">Resolved Tickets</p>
          </div>
          <p class="text-4xl font-bold tracking-tight text-gray-600">{{ closed }}</p>
        </div>
      </div>

      <div class="mt-10 sm:mt-20">
        <RouterLink to="/tickets" class="flex w-full sm:w-56 items-center justify-center rounded-full bg-[#9B8AFB] px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#9B8AFB]/90 focus:outline-none">Manage Tickets</RouterLink>
      </div>
    </div>
  </main>
</template>