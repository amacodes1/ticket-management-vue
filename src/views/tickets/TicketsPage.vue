<template>
  <div class="bg-white dark:bg-[#111827] text-[#111827] px-6 md:px-16 lg:px-20 dark:text-white font-display py-10 mt-4 mb-20 md:mb-26">
    <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div class="mx-auto max-w-7xl w-full">
        <header class="flex items-center bg-white dark:bg-[#111827] justify-between sticky top-0 z-10">
          <div class="flex items-center gap-3">
            <h1 class="text-xl font-bold leading-tight tracking-[-0.015em]">Manage your Tickets</h1>
          </div>
          <button @click="openCreate" class="bg-[#9B8AFB] text-white cursor-pointer font-medium py-3 px-3 sm:px-5 rounded-full hover:bg-opacity-90 focus:outline-none transition-all flex items-center gap-2">
            <Plus class="w-5 h-5" />
            <span class="hidden sm:inline">Create New Ticket</span>
          </button>
        </header>

        <main class="mt-8">
          <div class="mb-8 md:flex md:justify-center">
            <div class="relative">
              <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input v-model="searchTerm" placeholder="Search tickets by title, description..." class="w-full sm:w-[600px] md:w-[800px] pl-12 pr-4 py-3 items-center justify-center rounded-full focus:outline-0 focus:ring-2 focus:ring-[#9B8AFB]/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-shadow text-xs sm:text-base text-[#111827] dark:text-white" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-if="filteredTickets.length === 0" class="flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-800/50 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-700">
              <Plus class="text-gray-400 dark:text-gray-500 w-12 h-12" />
              <p class="text-gray-500 dark:text-gray-400">You have no more tickets.</p>
              <button @click="openCreate" class="bg-[#9B8AFB] text-white font-medium py-2 px-4 cursor-pointer rounded-lg hover:bg-opacity-90 focus:outline-none transition-all">Create New Ticket</button>
            </div>

            <TicketCard v-for="t in filteredTickets" :key="t.id" :ticket="t" @edit="onEdit(t)" @delete="confirmDelete(t.id)" />
          </div>
        </main>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showForm" class="fixed inset-0 bg-white/2 dark:bg-[#111827]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-4 md:p-6 font-display max-h-[90vh] overflow-y-auto">
        <div class="relative flex w-full flex-col">
          <h1 class="text-zinc-900 dark:text-white tracking-light text-lg md:text-xl font-bold leading-tight text-left pb-4">
            {{ editing ? `Edit Ticket #${editing.id.slice(0,8).toUpperCase()}` : 'Create New Ticket' }}
          </h1>
        </div>
        <TicketForm :initial="editing" @onCancel="closeForm" @onSubmit="submitForm" />
      </div>
    </div>

    <!-- Delete confirm -->
    <div v-if="deleteConfirm" class="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-2 md:p-4 z-50">
      <div class="bg-white dark:bg-[#111827] rounded-xl shadow-lg w-full max-w-sm p-6 flex flex-col items-center text-center animate-fade-in-scale">
        <div class="mb-4">
          <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle class="text-[#EF4444] w-8 h-8" />
          </div>
        </div>
        <h1 class="text-[#111827] dark:text-white tracking-tight text-[24px] font-bold leading-tight pb-2">Delete Ticket?</h1>
        <p class="text-[#111827] dark:text-gray-300 text-base font-normal leading-normal pb-6">You are about to permanently delete this ticket. This action cannot be undone.</p>
        <div class="flex flex-col sm:flex-row justify-stretch w-full gap-3">
          <button @click="handleDelete(deleteConfirm)" class="flex-1 flex min-w-[84px] max-w-[480px] py-2 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#EF4444] text-white text-base font-bold leading-normal tracking-[0.015em]">Delete</button>
          <button @click="deleteConfirm = null" class="flex-1 flex min-w-[84px] max-w-[480px] py-2 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-gray-200 dark:bg-gray-700 text-[#111827] dark:text-white text-base font-bold leading-normal tracking-[0.015em]">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Search, Plus, AlertTriangle } from "lucide-vue-next";
import TicketCard from "@/views/tickets/TicketCard.vue";
import TicketForm from "@/views/tickets/TicketForm.vue";
import { loadTickets, createTicket, updateTicket, deleteTicket } from "@/lib/ticketStorage";
import type { Ticket } from "@/types";
import { toast } from "vue3-toastify";

const tickets = ref<Ticket[]>([]);
const editing = ref<Ticket | null>(null);
const showForm = ref(false);
const searchTerm = ref("");
const deleteConfirm = ref<string | null>(null);

onMounted(() => {
  tickets.value = loadTickets();
});

const filteredTickets = computed(() =>
  tickets.value.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    (ticket.description || "").toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

function openCreate() {
  editing.value = null;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  editing.value = null;
}

function submitForm(payload: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
  if (editing.value) {
    try {
      const updated = { ...editing.value, ...payload };
      updateTicket(updated);
      tickets.value = tickets.value.map((t) => (t.id === updated.id ? updated : t));
      editing.value = null;
      showForm.value = false;
      toast.success("Ticket updated");
    } catch {
      toast.error("Failed to update ticket");
    }
  } else {
    try {
      const t = createTicket(payload);
      tickets.value = [t, ...tickets.value];
      showForm.value = false;
      toast.success("Ticket created");
    } catch {
      toast.error("Failed to create ticket");
    }
  }
}

function onEdit(t: Ticket) {
  editing.value = t;
  showForm.value = true;
}

function confirmDelete(id: string) {
  deleteConfirm.value = id;
}

function handleDelete(id: string | null) {
  if (!id) return;
  try {
    deleteTicket(id);
    tickets.value = tickets.value.filter((t) => t.id !== id);
    deleteConfirm.value = null;
    toast.success("Ticket deleted");
  } catch {
    toast.error("Failed to delete ticket");
  }
}
</script>
