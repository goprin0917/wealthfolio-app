<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import type { TableColumn } from "./types";

const props = defineProps<{
  title?: string;
  description?: string;
  columns: TableColumn[];
  data: T[];
  totalItems: number;
  isLoading?: boolean;
}>();

const currentPage = defineModel<number>("page", { default: 1 });
const itemsPerPage = defineModel<number>("perPage", { default: 10 });

const emit = defineEmits<{
  (e: "row-click", item: T): void;
}>();

const perPageOptions = [5, 10, 25, 50, 100];

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / itemsPerPage.value));
});

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, props.totalItems);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<template>
  <div
    class="bg-white shadow-xs rounded-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-white/10"
  >
    <div
      class="flex flex-col items-start justify-between gap-4 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:px-6 dark:border-white/10"
    >
      <div>
        <h3
          v-if="title"
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          {{ title }}
        </h3>
        <p
          v-if="description"
          class="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {{ description }}
        </p>
      </div>
      <div
        class="flex w-full sm:w-auto items-center justify-start sm:justify-end gap-x-3"
      >
        <slot name="header-actions" />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-white/10">
        <thead class="bg-gray-50 dark:bg-white/5">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              :class="[
                'px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white',
                col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                    ? 'text-center'
                    : 'text-left',
              ]"
            >
              {{ col.label }}
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-white/5">
          <tr v-if="isLoading">
            <td
              :colspan="columns.length + 1"
              class="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              Loading data...
            </td>
          </tr>

          <tr v-else-if="data.length === 0">
            <td
              :colspan="columns.length + 1"
              class="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              No records found.
            </td>
          </tr>

          <tr
            v-else
            v-for="(item, index) in data"
            :key="index"
            class="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
            @click="emit('row-click', item)"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="[
                'whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300',
                col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                    ? 'text-center'
                    : 'text-left',
              ]"
            >
              <slot :name="`cell-${col.key}`" :item="item">
                {{ item[col.key] }}
              </slot>
            </td>

            <td
              class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
            >
              <div @click.stop>
                <slot name="actions" :item="item"></slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 dark:border-white/10"
    >
      <div class="flex flex-1 justify-between sm:hidden gap-x-3">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="relative inline-flex flex-1 justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="relative inline-flex flex-1 justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
        >
          Next
        </button>
      </div>

      <div
        class="hidden sm:flex sm:flex-1 sm:flex-wrap sm:items-center sm:justify-between sm:gap-4"
      >
        <div class="flex flex-wrap items-center gap-4">
          <p class="text-sm text-gray-700 dark:text-gray-400 whitespace-nowrap">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ startItem }}
            </span>
            to
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ endItem }}
            </span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ totalItems }}
            </span>
            results
          </p>

          <div class="flex items-center gap-x-2">
            <label
              for="per-page"
              class="whitespace-nowrap text-sm text-gray-700 dark:text-gray-400"
            >
              Rows per page:
            </label>
            <select
              id="per-page"
              v-model="itemsPerPage"
              class="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-indigo-500"
            >
              <option
                v-for="option in perPageOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-xs"
            aria-label="Pagination"
          >
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 dark:ring-white/10 dark:hover:bg-white/5"
            >
              <span class="sr-only"> Previous </span>
              <ChevronLeftIcon class="size-5" aria-hidden="true" />
            </button>

            <span
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:text-gray-300 dark:ring-white/10"
            >
              Page {{ currentPage }} of {{ totalPages }}
            </span>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 dark:ring-white/10 dark:hover:bg-white/5"
            >
              <span class="sr-only"> Next </span>
              <ChevronRightIcon class="size-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
