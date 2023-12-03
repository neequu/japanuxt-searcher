<script setup lang="ts">
import { BarChart, useBarChart } from 'vue-chart-3'
import type { ChartOptions } from 'chart.js'
import { Chart, registerables } from 'chart.js'

const { data: userWords } = await getUserWords()

Chart.register(...registerables)

const levels = userWords.value.map(w => w.strength).toSorted()
const data = computed(() => {
  const lengthsMap: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 }

  for (const num of levels) {
    if (lengthsMap[num] !== undefined)
      lengthsMap[num]++
  }

  const lengths: number[] = Object.values(lengthsMap)
  return lengths
})

const chartData = computed(() => ({
  labels: ['New', 'Failed', 'Known', 'Never forget'],

  datasets: [
    {
      data: data.value,
      backgroundColor: [
        '#4b8dffaa',
        '#a94002aa',
        '#60ee90aa',
        '#078001aa',
      ],
    },
  ],
}))

const options = computed<ChartOptions<'doughnut'>>(() => ({
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Amount of words in each category',
    },
  },
  maintainAspectRatio: false,
}))

const { barChartProps } = useBarChart({
  chartData,
  options,
})
</script>

<template>
  <section class="mt-8">
    <h1 class="mb-4 text-xl md:text-3xl">
      Your stats
    </h1>
    <BarChart v-bind="barChartProps" class="w-full" />
  </section>
  <section class="mt-8">
    <h1 class="mb-4 text-xl md:text-3xl">
      Review more words
    </h1>
    <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/review">
      <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
        Review Words
      </span>
    </NuxtLink>
  </section>
</template>
