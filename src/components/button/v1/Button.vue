<script setup lang="ts">
import type { ButtonProps } from "./types";

withDefaults(defineProps<ButtonProps & { class?: string }>(), {
  variant: "primary",
  size: "md",
});

const BASE_STYLE =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";

const VARIANTS = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
  secondary:
    "bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500",
  danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
  ghost: "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};
</script>

<template>
  <button :class="[BASE_STYLE, VARIANTS[variant], SIZES[size], $props.class]">
    <component
      :is="icon"
      :class="['w-4 h-4', { 'mr-2': $slots.default?.() }]"
    />
    <slot />
  </button>
</template>
