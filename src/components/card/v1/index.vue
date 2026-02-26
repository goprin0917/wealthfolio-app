<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next";

defineProps<{
  class?: string;
  title?: string;
  icon?: LucideIcon;
}>();
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm',
      $props.class,
    ]"
  >
    <!-- Header: only renders if title or action slot is used -->
    <div
      v-if="$slots.action || title"
      class="flex items-center justify-between mb-4"
    >
      <div class="flex items-center gap-2">
        <component v-if="icon" :is="icon" class="w-5 h-5 text-indigo-400" />
        <h3 v-if="title" class="text-lg font-semibold text-slate-100">
          {{ title }}
        </h3>
      </div>
      <slot name="action" />
    </div>

    <!-- Content -->
    <slot />
  </div>
</template>
