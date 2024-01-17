<script setup lang="ts">
import * as d3 from 'd3'
</script>

<script lang="ts">
export default {
  mounted() {
    const canvas: any = d3.select('.canvas')
    const svg: any = canvas.append('svg').attr('height', 600).attr('width', 600)
    svg
      .append('rect')
      .attr('width', 200)
      .attr('height', 200)
      .attr('fill', 'blue')
      .attr('x', 20)
      .attr('y', 20)
    console.log('container', this.$refs.canvas)
  }
}
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
      <div id="canvas" ref="canvas" class="canvas"></div>
    </div>
  </div>
</template>
