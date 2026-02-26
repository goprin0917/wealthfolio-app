<script setup lang="ts">
import Card from "@/components/card/v1/index.vue";
import { countries, covidData, Country, type DataRecord } from "@/covid";
import { categories } from "@/password-category";
import { CurveType, type NumericAccessor } from "@unovis/ts";
import {
  VisArea,
  VisAxis,
  VisBulletLegend,
  VisDonut,
  VisSingleContainer,
  VisXYContainer,
} from "@unovis/vue";
import { ActivityIcon, DollarSignIcon, TrendingUpIcon } from "lucide-vue-next";

const STATS = [
  {
    title: "Total Balance",
    icon: DollarSignIcon,
    totalValue: "$47,855.30",
    description: "▲ +2.4% vs last month",
  },
  {
    title: "Total Balance",
    icon: DollarSignIcon,
    totalValue: "$47,855.30",
    description: "▲ +2.4% vs last month",
  },
];

const x = (_: DataRecord, i: number) => i;
const accessors = (
  id: Country,
): { y: NumericAccessor<DataRecord>; color: string } => ({
  y: (d: DataRecord) => d.cases[id],
  color: countries[id].color,
});
const xTicks = (i: number): string =>
  `${covidData[i]?.month} ${covidData[i]?.year}`;
const yTicks = Intl.NumberFormat(navigator.language, {
  notation: "compact",
}).format;

const legendItems = Object.entries(categories).map(([_, categories]) => ({
  name: categories.key.charAt(0).toUpperCase() + categories.key.slice(1),
}));
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mb-7">
    <Card
      class="relative overflow-hidden"
      v-for="(stat, index) in STATS"
      :key="index"
    >
      <div class="absolute top-0 right-0 p-4 opacity-10">
        <DollarSignIcon :size="64" />
      </div>
      <p class="text-slate-400 text-sm font-medium mb-1">{{ stat.title }}</p>
      <h3 class="text-2xl font-bold text-white tracking-tight">
        {{ stat.totalValue }}
      </h3>
      <div class="flex items-center mt-2 text-xs text-emerald-400">
        <span
          class="bg-emerald-500/10 px-1.5 py-0.5 rounded mr-2 flex items-center"
        >
          <TrendingUpIcon :size="12" class="mr-1" /> +2.4%
        </span>
        <span class="text-slate-500">vs last month</span>
      </div>
    </Card>
  </div>

  <!-- Charts row -->
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <Card
      :title="'Performance History'"
      :icon="ActivityIcon"
      class="lg:col-span-2"
    >
      <VisXYContainer :data="covidData" :height="250">
        <VisBulletLegend :items="Object.values(countries)" />
        <VisArea
          :x="x"
          v-bind="accessors(Country.UnitedStates)"
          :opacity="0.7"
          :curveType="CurveType.Basis"
        />
        <VisArea
          :x="x"
          v-bind="accessors(Country.India)"
          :opacity="0.7"
          :curveType="CurveType.Basis"
        />
        <VisAxis type="x" :tickFormat="xTicks" />
        <VisAxis type="y" :tickFormat="yTicks" />
      </VisXYContainer>
    </Card>
    <Card>
      <VisBulletLegend :items="legendItems" />
      <VisSingleContainer :height="250">
        <VisDonut
          :value="(d) => d.value"
          :data="categories"
          :showEmptySegments="true"
          :padAngle="0.01"
          :arcWidth="100"
        />
      </VisSingleContainer>
    </Card>
  </div>
</template>
