<template>
  <div class="text-[#111827] dark:text-white py-16 mb-20 md:mb-26">
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <main class="w-full max-w-md mx-auto">
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-[#111827] dark:text-white">Create an Account</h1>
          <p class="mt-2 text-base text-gray-600 dark:text-gray-400">Welcome to TicketApp</p>
        </div>
        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#111827] dark:text-white" for="name">Name</label>
              <div class="mt-1">
                <input v-model="name" id="name" type="text" placeholder="Enter your name" required autocomplete="name" class="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#111827] dark:text-white" for="email">Email</label>
              <div class="mt-1">
                <input v-model="email" id="email" type="email" placeholder="Enter your email" required autocomplete="email" class="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#111827] dark:text-white" for="password">Password</label>
              <div class="mt-1 relative">
                <input v-model="password" id="password" type="password" placeholder="Enter your password" required autocomplete="new-password" class="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white" />
              </div>
            </div>
          </div>

          <div v-if="err" class="text-sm text-red-600">{{ err }}</div>

          <div>
            <button type="submit" :disabled="loading" class="w-full flex justify-center py-3 px-4 border border-transparent cursor-pointer rounded-xl shadow-sm text-base font-medium text-white bg-[#9B8AFB] hover:bg-[#9B8AFB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9B8AFB]">
              {{ loading ? "Creating account..." : "Create Account" }}
            </button>
          </div>

          <p class="text-sm text-center text-gray-500 dark:text-gray-400">Already have an account? <RouterLink to="/auth/login" class="font-medium text-[#9B8AFB] hover:text-[#9B8AFB]/70">Login</RouterLink></p>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { mockRegister } from "@/lib/auth";

const router = useRouter();
const email = ref("");
const name = ref("");
const password = ref("");
const err = ref<string | null>(null);
const loading = ref(false);

async function handleSubmit() {
  err.value = null;
  if (!name.value || !email.value || !password.value) {
    err.value = "Name, email and password are required";
    return;
  }
  loading.value = true;
  try {
    await mockRegister(email.value, password.value, name.value);
    toast.success("Account created");
    router.push("/dashboard");
  } catch (e: unknown) {
    err.value = e instanceof Error ? e.message : "Signup failed";
    toast.error("Signup failed");
  } finally {
    loading.value = false;
  }
}
</script>
