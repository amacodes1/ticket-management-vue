<template>
  <div class="space-y-2">
    <div class="flex flex-col min-w-20 flex-1">
      <label for="title" class="text-zinc-800 dark:text-zinc-200 text-base font-medium leading-normal pb-2">Title</label>
      <input id="title" v-model="title" placeholder="e.g., Fix login button on mobile" class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#9B8AFB]/50 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 h-14 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 p-4 text-base font-normal leading-normal" />
      <p class="text-red-500 text-sm mt-1 h-4">{{ errors.title || '' }}</p>
    </div>

    <div class="flex flex-col min-w-40 flex-1">
      <label for="description" class="text-zinc-800 dark:text-zinc-200 text-base font-medium leading-normal pb-2">Description</label>
      <textarea id="description" v-model="description" placeholder="Provide a detailed description of the issue..." class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#9B8AFB]/50 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 min-h-36 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 p-4 text-base font-normal leading-normal"></textarea>
      <p class="text-red-500 text-sm mt-1 h-4">{{ errors.description || '' }}</p>
    </div>

    <div class="flex flex-col min-w-40 flex-1 relative">
      <label for="status" class="text-zinc-800 dark:text-zinc-200 text-base font-medium leading-normal pb-2">Status</label>
      <div class="relative flex items-center">
        <span class="absolute left-4 w-2 h-2 rounded-full" :style="{ backgroundColor: statusColors[status] }"></span>
        <select id="status" v-model="status" class="flex w-full min-w-0 flex-1 cursor-pointer resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#9B8AFB]/50 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 h-14 pl-10 pr-12 text-base font-normal leading-normal">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <p class="text-red-500 text-sm mt-1 h-4">{{ errors.status || '' }}</p>
    </div>

    <div class="flex justify-end pt-8">
      <div class="flex flex-col sm:flex-row flex-1 gap-3 justify-end">
        <button @click="onCancel" type="button" class="flex min-w-[84px] max-w-full sm:max-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-zinc-100 text-zinc-800 dark:text-zinc-200 text-base font-bold leading-normal tracking-[0.015em] hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
        <button @click="handleSubmit" type="button" class="flex min-w-[84px] max-w-full sm:max-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#9B8AFB] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#9B8AFB]/90 transition-colors"> {{ editing ? 'Save Changes' : 'Create Ticket' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { validateTitle, validateStatus, validateDescription } from "@/utils/validators";
import type { Ticket } from "@/types";
import { toast } from "vue3-toastify";

const props = defineProps<{
  initial: Ticket | null;
}>();

const emits = defineEmits<{
  (e: "onSubmit", payload: Omit<Ticket, "id" | "createdAt" | "updatedAt">): void;
  (e: "onCancel"): void;
}>();

const editing = computed(() => !!props.initial);
const title = ref(props.initial?.title || "");
const status = ref<Ticket["status"]>(props.initial?.status || "open");
const description = ref(props.initial?.description || "");
const priority = ref<number>(props.initial?.priority ?? 3);

const errors = ref<{ title?: string; status?: string; description?: string }>({});

const statusColors = {
  open: "#22C55E",
  in_progress: "#F59E0B",
  closed: "#9CA3AF",
};

watch([title, status, description], () => {
  errors.value = {};
});

function runValidation() {
  const t = validateTitle(title.value);
  const s = validateStatus(status.value);
  const d = validateDescription(description.value);
  const errs: { title?: string; status?: string; description?: string } = {};
  if (t) errs.title = t;
  if (s) errs.status = s;
  if (d) errs.description = d;
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

function handleSubmit() {
  if (!runValidation()) {
    toast.error("Please enter the required fields correctly.");
    return;
  }
  emits("onSubmit", {
    title: title.value.trim(),
    status: status.value,
    description: description.value.trim(),
    priority: priority.value,
  });
}

function onCancel() {
  emits("onCancel");
}
</script>
