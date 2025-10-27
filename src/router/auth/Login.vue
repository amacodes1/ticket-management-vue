<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { mockLogin } from "@/lib/auth";

defineOptions({
  name: "LoginPage"
});

const email = ref("");
const password = ref("");
const err = ref<string | null>(null);
const loading = ref(false);
const router = useRouter();

async function handleSubmit() {
  err.value = null;
  if (!email.value || !password.value) {
    err.value = "Email and password are required.";
    return;
  }
  loading.value = true;
  try {
    await mockLogin(email.value, password.value);
    toast.success("Login successful");
    router.push("/dashboard");
  } catch (e: unknown) {
    err.value = e instanceof Error ? e.message : "Login failed";
    toast.error("Failed to login");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="text-[#111827] dark:text-white py-16 mb-20 md:mb-26">
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <main class="w-full max-w-md mx-auto">
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-[#111827] dark:text-white">Welcome back</h1>
          <p class="mt-2 text-base text-gray-600 dark:text-gray-400">Log in to TicketApp</p>
        </div>
        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#111827] dark:text-white" for="email">Email</label>
              <div class="mt-1">
                <input v-model="email" type="email" id="email" required autocomplete="email" placeholder="Enter your email" class="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#111827] dark:text-white" for="password">Password</label>
              <div class="mt-1 relative">
                <input v-model="password" type="password" id="password" required autocomplete="current-password" placeholder="Enter your password" class="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white" />
              </div>
            </div>
          </div>

          <div v-if="err" class="text-sm text-red-600">{{ err }}</div>

          <div>
            <button :disabled="loading" type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent cursor-pointer rounded-xl shadow-sm text-base font-medium text-white bg-[#9B8AFB] hover:bg-[#9B8AFB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9B8AFB]">
              {{ loading ? "Signing in..." : "Log in" }}
            </button>
          </div>
          <div class="text-sm text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Don't have an account?
              <RouterLink to="/auth/signup" class="font-medium text-[#9B8AFB] hover:text-[#9B8AFB]/70"> Sign up</RouterLink>
            </p>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>


