<script setup lang="ts">
import { DataTable, type TableColumn } from "@/components/datatable/v1";

import { ref } from "vue";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DownloadIcon,
  ArrowRightLeftIcon,
} from "lucide-vue-next";
import { Dialog } from "@/components/dialog/v1";

const page = ref(1);
const perPage = ref(10);
const isLoading = ref(false);

const activeCurrency = ref<"USD" | "PHP">("USD");
const showDualCurrency = ref(false);
const isAddAssetModalOpen = ref(false);

const columns: TableColumn[] = [
  { key: "asset", label: "Asset Name" },
  { key: "type", label: "Type" },
  { key: "shares", label: "Shares", align: "right" },
  { key: "currentValue", label: "Current Value", align: "right" },
];

const mockData = [
  {
    id: 1,
    asset: "Apple Inc.",
    type: "Stock",
    shares: 50,
    currentValue: "$7,500.00",
  },
  {
    id: 2,
    asset: "Vanguard S&P 500",
    type: "Fund",
    shares: 120,
    currentValue: "$45,200.00",
  },
];
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-end gap-4">
      <div
        class="flex flex-wrap items-center justify-start sm:justify-end gap-3"
      >
        <button
          type="button"
          @click="showDualCurrency = !showDualCurrency"
          :class="[
            showDualCurrency
              ? 'bg-gray-100 dark:bg-white/20'
              : 'bg-white dark:bg-white/5',
            'rounded-md p-2 text-gray-500 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-400 dark:ring-white/10 dark:hover:bg-white/10 transition-colors',
          ]"
          title="Toggle Dual Currency Display"
        >
          <ArrowRightLeftIcon class="size-5" aria-hidden="true" />
        </button>

        <div
          class="flex items-center rounded-md bg-gray-100 p-0.5 shadow-xs ring-1 ring-inset ring-gray-300 dark:bg-gray-900/50 dark:ring-white/10"
        >
          <button
            type="button"
            @click="activeCurrency = 'USD'"
            :class="[
              activeCurrency === 'USD'
                ? 'bg-white text-gray-900 shadow-sm dark:bg-white/10 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white',
              'rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
            ]"
          >
            USD
          </button>
          <button
            type="button"
            @click="activeCurrency = 'PHP'"
            :class="[
              activeCurrency === 'PHP'
                ? 'bg-white text-gray-900 shadow-sm dark:bg-white/10 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white',
              'rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
            ]"
          >
            PHP
          </button>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:bg-white/10"
        >
          <DownloadIcon
            class="-ml-0.5 size-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
          Report
        </button>

        <button
          @click="isAddAssetModalOpen = true"
          type="button"
          class="inline-flex w-full sm:w-auto justify-center items-center gap-x-2 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PlusIcon class="-ml-0.5 size-5" aria-hidden="true" />
          Add Asset
        </button>
      </div>

      <Dialog
        v-model:open="isAddAssetModalOpen"
        title="Add New Asset"
        description="Enter the details of your new investment holding."
      >
        <form class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Asset Name
            </label>
            <input
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-white/5 dark:border-white/10 dark:text-white"
            />
          </div>
        </form>

        <template #footer>
          <button
            @click="isAddAssetModalOpen = false"
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:w-auto"
          >
            Save Asset
          </button>
          <button
            @click="isAddAssetModalOpen = false"
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20"
          >
            Cancel
          </button>
        </template>
      </Dialog>
    </div>

    <DataTable
      title="My Holdings"
      description="A list of all your current investments and their performance."
      :columns="columns"
      :data="mockData"
      :total-items="150"
      :is-loading="isLoading"
      v-model:page="page"
      v-model:perPage="perPage"
    >
      <template #header-actions>
        <button
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:bg-white/10"
        >
          <DownloadIcon
            class="-ml-0.5 size-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
          Export CSV
        </button>
      </template>

      <template #cell-type="{ item }">
        <span
          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30"
        >
          {{ item.type }}
        </span>
      </template>

      <template #actions="{ item }">
        <div class="flex items-center justify-end gap-x-3">
          <button
            @click="console.log('Edit', item.id)"
            class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <PencilIcon class="size-4" />
          </button>
          <button
            @click="console.log('Delete', item.id)"
            class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
          >
            <TrashIcon class="size-4" />
          </button>
        </div>
      </template>
    </DataTable>
  </div>
</template>
