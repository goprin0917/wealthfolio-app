<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
}>();
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-slate-800"
      >
        <h3 class="text-xl font-semibold text-white">{{ title }}</h3>
        <button @click="onClose()" class="text-slate-400 hover:text-white">
          <svg
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
</template>
