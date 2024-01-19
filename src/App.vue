<script setup lang="ts">
import ChartOne from '../src/views/ChartOne.vue'
</script>

<template>
  <header></header>
  <div class="min-h-screen flex flex-col max-w-6xl mx-auto">
    <div class="self-end py-8 px-12 gap-4 flex">
      <button class="text-zinc-400 hover:text-black transition delay-50 hover:underline">
        Github
      </button>
      <button class="text-zinc-400 hover:text-black transition delay-50 hover:underline">
        Portfolio
      </button>
    </div>
    <div class="flex flex-col self-center h-[20vh]">
      <div class="my-auto">
        <p class="text-zinc-600 font-semibold text-center text-lg animate-fade">
          Data visualization
        </p>
        <p class="text-zinc-400 text-center py-4 animate-fade">
          Made with <a target="blank" href="https://d3js.org/">D3.js</a>
        </p>
      </div>
      <ChartOne />
    </div>
  </div>
</template>
