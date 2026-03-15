<script setup lang="ts">
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "lucide-vue-next";

defineProps<{
  title?: string;
  description?: string;
  maxWidthClass?: string;
}>();

const open = defineModel<boolean>("open", { required: true });
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <HeadlessDialog class="relative z-50" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              :class="[
                maxWidthClass || 'sm:max-w-lg',
                'relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 dark:bg-gray-800 dark:ring-1 dark:ring-white/10',
              ]"
            >
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-hidden dark:bg-gray-800 dark:hover:text-gray-300"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="size-6" aria-hidden="true" />
                </button>
              </div>

              <div class="mb-5">
                <slot name="header">
                  <DialogTitle
                    v-if="title"
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    {{ title }}
                  </DialogTitle>
                  <p
                    v-if="description"
                    class="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ description }}
                  </p>
                </slot>
              </div>

              <div>
                <slot />
              </div>

              <div
                v-if="$slots.footer"
                class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse sm:gap-3"
              >
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
</template>
