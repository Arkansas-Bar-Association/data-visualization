<script setup lang="ts">
import * as d3 from 'd3'
import Papa from 'papaparse'
</script>

<script lang="ts">
export default {
  mounted() {
    let barchart = []

    fetch('/data.csv')
      .then((csv) => csv.text())
      .then((csv) =>
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true
        })
      )
      .then((csv: any) => {
        barchart = csv.data
        console.log('barchart - ', barchart)
        DrawDaBar(barchart)
      })

    function DrawDaBar(data: any) {
      // Declare the chart dimensions and margins.
      const width = 928
      const height = 500
      const marginTop = 30
      const marginRight = 0
      const marginBottom = 30
      const marginLeft = 40

      // Declare the x (horizontal position) scale.
      const x = d3
        .scaleBand()
        .domain(
          d3.groupSort(
            data,
            ([d]: any) => -d.frequency,
            (d: any) => d.letter
          )
        ) // descending frequency
        .range([marginLeft, width - marginRight])
        .padding(0.1)

      // Declare the y (vertical position) scale.
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d: any) => d.frequency) as unknown as number])
        .range([height - marginBottom, marginTop])

      // Create the SVG container.
      const svg = d3
        .create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;')

      //tooltip, god i hate this part.
      var tooltip = d3
        .select('#canvasBar')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')

      // Add a rect for each bar.
      svg
        .append('g')
        .attr('fill', 'green')
        .selectAll()
        .data(data)

        .join('rect')
        .attr('x', (d: any) => x(d.letter) as any)
        .attr('y', (d: any) => y(d.frequency))
        .attr('height', (d: any) => y(0) - y(d.frequency))
        .attr('width', x.bandwidth())
        .attr('class', 'bar hover:fill-green-500')
        .on('mouseover', function (event: any, d: any) {
          var rect = d3.select(this)
          rect.attr('class', 'moused-over hover:fill-green-500')
          console.log('Letter = ' + d.letter + ' Frequency = ' + d.frequency)
          console.log(event)
          tooltip.transition().duration(100).style('opacity', 0.9)
          tooltip
            .html(
              '<span>' +
                d.letter +
                ' Letter </span><br><span>' +
                'Frequency ' +
                d.frequency +
                '</span>'
            )
            .style('top', event.offsetY - 100 + 'px')
            .style('left', event.offsetX - 100 + 'px')
            .style('width', '100px')
            .style('background-color', 'gray')
            .style('padding', '8px')
            .style('font-weight', 'bold')
            .attr('class', 'hover:fill-green-500')
        })
        .on('mouseout', function () {
          var rect = d3.select(this)
          rect.attr('class', 'bar hover:fill-green-500')
          tooltip.transition().duration(400).style('opacity', 0)
        })

      // Add the x-axis and label.
      svg
        .append('g')
        .attr('transform', `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))

      // Add the y-axis and label, and remove the domain line.
      svg
        .append('g')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y: any) => (y * 100).toFixed()))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .append('text')
            .attr('x', -marginLeft)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text('↑ Frequency (%)')
        )

      // Return the SVG element.
      var element: any = document.getElementById('canvasBar')
      return element.append(svg.node())
    }
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div id="canvasBar" ref="canvasBar" class="canvasBar relative"></div>
    <p class="self-center text-zinc-400">
      This chart shows the relative frequency of letters in the English language.
    </p>
  </div>
</template>
