<script setup lang="ts">
import { useAuthStore } from "@/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";

defineProps<{
  isMobile?: boolean;
}>();

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <Menu as="div" class="relative" v-slot="{ open }">
    <MenuButton
      :class="[
        isMobile
          ? 'flex rounded-full'
          : 'inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2',
        open && !isMobile ? 'bg-gray-50 dark:bg-white/20' : '',
        'text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20',
      ]"
    >
      <img
        class="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="User Avatar"
      />
      <span class="sr-only">Your profile</span>

      <template v-if="!isMobile">
        <span aria-hidden="true" class="my-auto">{{
          authStore.authUser?.name
        }}</span>
        <EllipsisVerticalIcon
          class="-mr-1 ml-auto my-auto size-5 text-gray-400"
          aria-hidden="true"
        />
      </template>
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="transform opacity-0 scale-95 -translate-x-2"
      enter-to-class="transform opacity-100 scale-100 translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 scale-100 translate-x-0"
      leave-to-class="transform opacity-0 scale-95 -translate-x-2"
    >
      <MenuItems
        :class="[
          isMobile
            ? 'right-0 top-full mt-2 origin-top-right'
            : 'absolute bottom-0 left-full ml-2 origin-bottom-left',
          'absolute z-100 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5 dark:divide-white/10 dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10',
        ]"
      >
        <div class="px-4 py-3">
          <p class="text-sm text-gray-700 dark:text-gray-400">Signed in as</p>
          <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
            {{ authStore.authUser?.name || "Loading..." }}
          </p>
        </div>

        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button @click.prevent="handleLogout" class="w-full">
              <div
                :class="[
                  active
                    ? 'bg-gray-100 text-gray-900 outline-hidden dark:bg-white/5 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300',
                  'block w-full px-4 py-2 text-left text-sm',
                ]"
              >
                Sign out
              </div>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
