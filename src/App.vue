<script setup lang="ts">
import * as d3 from 'd3'
import Papa from 'papaparse'
import { ref } from 'vue'
</script>

<script lang="ts">
export default {
  mounted() {
    let aapl = []

    const response = fetch('../src/assets/aapl.csv')
      .then((csv) => csv.text())
      .then((csv) =>
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true
        })
      )
      .then((csv: any) => {
        csv.data.forEach((h: any) => {
          h.date = Date.parse(h.date)
        })
        aapl = csv.data
        console.log('aapl - ', aapl)
        DrawDaTing(aapl)
      })

    function DrawDaTing(aapl: any) {
      const width = 928
      const height = 500
      const marginTop = 20
      const marginRight = 30
      const marginBottom = 30
      const marginLeft = 40

      // Declare the x (horizontal position) scale.
      const x = d3.scaleUtc(
        d3.extent(aapl, (d) => d.date),
        [marginLeft, width - marginRight]
      )

      // Declare the y (vertical position) scale.
      const y = d3.scaleLinear(
        [0, d3.max(aapl, (d) => d.close)],
        [height - marginBottom, marginTop]
      )

      // Declare the area generator.
      const area = d3
        .area()
        .x((d) => x(d.date))
        .y0(y(0))
        .y1((d) => y(d.close))

      // Create the SVG container.
      const svg = d3
        .create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;')

      // Append a path for the area (under the axes).
      svg.append('path').attr('fill', 'steelblue').attr('d', area(aapl))

      // Add the x-axis.
      svg
        .append('g')
        .attr('transform', `translate(0,${height - marginBottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        )

      // Add the y-axis, remove the domain line, add grid lines and a label.
      svg
        .append('g')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .selectAll('.tick line')
            .clone()
            .attr('x2', width - marginLeft - marginRight)
            .attr('stroke-opacity', 0.1)
        )
        .call((g) =>
          g
            .append('text')
            .attr('x', -marginLeft)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text('↑ Daily close ($)')
        )

      return canvas.append(svg.node())
    }
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
      <svg id="svg" ref="svg" class="svg"></svg>
      <p class="self-center text-zinc-400">
        This time-series chart shows the daily close of Apple stock.
      </p>
    </div>
  </div>
</template>
