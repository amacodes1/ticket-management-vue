<template>
  <div class="flex flex-col gap-4 bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold text-[#111827] dark:text-white">{{ ticket.title }}</p>
      <div class="flex items-center gap-2">
        <button @click="$emit('edit')" class="p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          <Edit class="w-4 h-4" />
        </button>
        <button @click="$emit('delete')" class="p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
    <p class="text-gray-600 dark:text-gray-400 text-sm">{{ ticket.description }}</p>
    <div class="flex items-center justify-between mt-2">
      <span :class="statusBadgeClass" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
        {{ formatStatus(ticket.status) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from "@/types";
import { Edit, Trash2 } from "lucide-vue-next";
const props = defineProps<{ ticket: Ticket }>();

const statusClass = (status: Ticket["status"]) => {
  if (status === "open") return "bg-green-500/10 text-green-600";
  if (status === "in_progress") return "bg-amber-500/10 text-amber-600";
  return "bg-gray-500/20 text-gray-600";
};

const formatStatus = (status: Ticket["status"]) => {
  if (status === "in_progress") return "In Progress";
  if (status === "open") return "Open";
  return "Closed";
};

const statusBadgeClass = statusClass(props.ticket.status);
</script>
