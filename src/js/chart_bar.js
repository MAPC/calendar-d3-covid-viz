import * as d3 from "https://cdn.skypack.dev/d3@7";

function chart() {
    console.log('muni', document.getElementById('ddlMuni').selectedOptions[0].text)
    const municipality = document.getElementById('ddlMuni').selectedOptions[0].text
    const rawdata = dataset;
    const width = 1000;
    const height = width;
    const margin = 10;
    const innerRadius = 200;
    const outerRadius = 2000 / 2 - margin;
    const data = rawdata.filter(d => d.municipality === municipality)[0];

    console.log('dataset', `translate(${(width / 2 + margin.left)},${(height / 2 + margin.top)})`);

    const svg = d3.select('#chart')
        .append('svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .append('g')
        .attr('transform', `translate(${(width / 2 + margin.left)},${(height / 2 + margin.top)})`);


    const x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0)
        .domain(data.case_data.map((d) => d.date));


    const y = d3.scaleRadial()
        .range([innerRadius, outerRadius])
        .domain([0, 13000]);


    const ybis = d3.scaleRadial()
        .range([innerRadius, 5])
        .domain([0, 13000]);


    svg.append('g')
        .selectAll('path')
        .data(data.case_data)
        .enter()
        .append('path')
        .attr('fill', 'crimson')
        .attr('fill-opacity', 0.75)
        .attr('stroke', 'crimson')
        .attr('stroke-opacity', 1.0)
        .attr('stroke-width', 1)
        .attr('class', 'yo')
        .attr('d', d3.arc()
            .innerRadius(innerRadius)
            .outerRadius((d) => y(d.case_count / data.poulation))
            .startAngle((d) => x(d.date))
            .endAngle((d) => x(d.date) + x.bandwidth())
            .padAngle(.1)
            .padRadius(innerRadius));

    //labels        
    svg.append('g')
        .selectAll('g')
        .data(data.case_data)
        .enter()
        .append('g')
        .attr('text-anchor', function(d) { return (x(d.date) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'end' : 'start'; })
        .attr('transform', function(d) { return `rotate(${((x(d.date) + x.bandwidth() / 2) * 180 / Math.PI - 90)}) translate(${(y(-250) + 30)},0)`; })
        .append('text')
        .text(function(d) { return (d.case_count) })
        .attr('transform', function(d) { return (x(d.date) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'rotate(180)' : 'rotate(0)'; })
        .style('font-size', '11px')
        .attr('alignment-baseline', 'middle');

};

chart();

document.getElementById('ddlMuni').addEventListener("change", function() {
    document.getElementById('chart').innerHTML = ``;
    chart();
});