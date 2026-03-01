<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { HomeIcon, MenuIcon, UsersIcon, XIcon } from "lucide-vue-next";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarNav from "./SidebarNav.vue";
import NavUser from "./NavUser.vue";

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  open: [];
}>();

const navigation = [
  { name: "Dashboard", to: { name: "home" }, icon: HomeIcon },
  {
    name: "Portfolio",
    to: { name: "portfolio" },
    icon: UsersIcon,
  },
];
</script>

<template>
  <!-- Mobile sidebar -->
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-50 lg:hidden" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80"></div>
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute top-0 left-full flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="emit('close')"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="size-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>

            <!-- Mobile nav panel -->
            <div
              class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-gray-900 dark:ring dark:ring-white/10 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-black/10"
            >
              <SidebarLogo />
              <SidebarNav :navigation="navigation" />
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Desktop static sidebar -->
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-white/10"
  >
    <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
      <SidebarLogo />
      <SidebarNav :navigation="navigation" />
    </div>

    <div class="mt-auto p-4">
      <NavUser />
    </div>
  </div>

  <!-- Mobile topbar -->
  <div
    class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden dark:bg-gray-900 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:border-b dark:after:border-white/10 dark:after:bg-black/10"
  >
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:text-white"
      @click="emit('open')"
    >
      <span class="sr-only">Open sidebar</span>
      <MenuIcon class="size-6" aria-hidden="true" />
    </button>
    <div class="flex-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
      Dashboard
    </div>
    <a href="#">
      <span class="sr-only">Your profile</span>
      <img
        class="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </a>
  </div>
</template>
