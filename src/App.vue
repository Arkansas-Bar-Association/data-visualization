<script setup lang="ts">
import ChartOne from '../src/views/ChartOne.vue'
import ChartBar from '../src/views/ChartTwo.vue'
import ChartThree from '../src/views/ChartThree.vue'
</script>

<template>
  <header></header>
  <div class="min-h-screen flex flex-col max-w-6xl mx-auto">
    <div class="self-end py-8 px-12 gap-4 flex">
      <a
        href="https://github.com/Arkansas-Bar-Association"
        target="blank"
        class="text-zinc-400 hover:text-black transition delay-50 hover:underline"
      >
        Github
      </a>
      <a
        href="https://portfolio-arkansas-bar-association.vercel.app/"
        target="blank"
        class="text-zinc-400 hover:text-black transition delay-50 hover:underline"
      >
        Portfolio
      </a>
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
      <ChartBar />
      <ChartThree />
      <div class="p-24"></div>
    </div>
  </div>
</template>
