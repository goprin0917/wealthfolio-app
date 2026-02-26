<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import {
  CheckCircleIcon,
  InfoIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from "lucide-vue-next";

const { toasts, remove } = useToast();
</script>

<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed top-0 inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-999"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <TransitionGroup
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class=""
        leave-to-class="opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg outline-1 outline-black/5 dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10"
        >
          <div class="p-4">
            <div class="flex items-center relative">
              <div class="shrink-0">
                <component
                  :is="
                    toast.type === 'success'
                      ? CheckCircleIcon
                      : toast.type === 'error'
                        ? XCircleIcon
                        : toast.type === 'warning'
                          ? TriangleAlertIcon
                          : InfoIcon
                  "
                  :class="[
                    'size-6',
                    toast.type === 'success'
                      ? 'text-green-500'
                      : toast.type === 'error'
                        ? 'text-red-500'
                        : toast.type === 'warning'
                          ? 'text-orange-500'
                          : 'text-blue-400',
                  ]"
                  aria-hidden="true"
                />
              </div>

              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p
                  v-if="toast.title"
                  class="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ toast.title }}
                </p>
                <p
                  v-if="toast.message"
                  class="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ toast.message }}
                </p>
              </div>

              <div class="absolute right-0 top-0 ml-4 flex shrink-0">
                <button
                  type="button"
                  @click="remove(toast.id)"
                  class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:hover:text-white dark:focus:outline-indigo-500"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
