<script setup lang="ts">
import type { Component } from "vue";
import { useRoute } from "vue-router";

interface NavItem {
  name: string;
  to: { name: string };
  icon: Component;
}

defineProps<{
  navigation: NavItem[];
  showProfile?: boolean;
}>();

const route = useRoute();
</script>

<template>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <li v-for="item in navigation" :key="item.name">
            <RouterLink
              :to="item.to"
              :class="[
                route.name === item.to.name
                  ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  route.name === item.to.name
                    ? 'text-indigo-600 dark:text-white'
                    : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white',
                  'size-6 shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
