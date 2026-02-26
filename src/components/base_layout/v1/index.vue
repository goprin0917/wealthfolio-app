<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";

const sidebarOpen = ref(false);
</script>

<template>
  <div>
    <Sidebar
      :open="sidebarOpen"
      @close="sidebarOpen = false"
      @open="sidebarOpen = true"
    />

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="mb-7">
          <h1 class="text-2xl font-bold text-white mb-1">
            Welcome back, Investor
          </h1>
          <p class="text-slate-400 text-sm">
            Here's what's happening with your wealth today.
          </p>
        </div>
        <RouterView />
      </div>
    </main>
  </div>
</template>
