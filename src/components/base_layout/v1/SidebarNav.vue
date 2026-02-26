<script setup lang="ts">
import type { Component } from "vue";
import { useRoute } from "vue-router";

interface NavItem {
  name: string;
  to: { name: string };
  icon: Component;
}

interface Team {
  id: number;
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

defineProps<{
  navigation: NavItem[];
  teams: Team[];
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
      <li>
        <div class="text-xs/6 font-semibold text-gray-400">Your teams</div>
        <ul role="list" class="-mx-2 mt-2 space-y-1">
          <li v-for="team in teams" :key="team.name">
            <a
              :href="team.href"
              :class="[
                team.current
                  ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
              ]"
            >
              <span
                :class="[
                  team.current
                    ? 'border-indigo-600 text-indigo-600 dark:border-white/20 dark:text-white'
                    : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600 dark:border-white/10 dark:group-hover:border-white/20 dark:group-hover:text-white',
                  'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium dark:bg-white/5',
                ]"
                >{{ team.initial }}</span
              >
              <span class="truncate">{{ team.name }}</span>
            </a>
          </li>
        </ul>
      </li>

      <!-- Profile link, only shown in desktop sidebar -->
      <li v-if="showProfile" class="-mx-6 mt-auto">
        <a
          href="#"
          class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
        >
          <img
            class="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span class="sr-only">Your profile</span>
          <span aria-hidden="true">Tom Cook</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
