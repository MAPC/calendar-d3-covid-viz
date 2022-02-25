import * as d3 from "https://cdn.skypack.dev/d3@7";

function chart() {
    const municipality = document.getElementById('ddlMuni').selectedOptions[0].text
    const rawdata = dataset;
    const width = 954;
    const height = width;
    const margin = 10;
    const innerRadius = width / 5;
    const outerRadius = width / 2 - margin;
    const data = Array.from(
        d3
        .rollup(
            rawdata.filter(d => d.municipality === municipality)[0].case_data,
            (v) => ({
                date: v[0].date,
                avg: 0,
                min: d3.mean(v, (d) => d.case_count || 0),
                max: d3.mean(v, (d) => d.case_count || 0),
                minmin: d3.min(v, (d) => d.case_count || 0),
                maxmax: d3.max(v, (d) => d.case_count || 0),
            }),
            (d) => `${d.date}`
        )
        .values()
    ).sort((a, b) => d3.ascending(a.date, b.date));

    const x = d3
        .scaleBand()
        .domain(data.map((d) => d.date))
        .range([0, 2 * Math.PI])
        .align(0);

    const y = d3
        .scaleLinear()
        .domain([
            d3.min(data, (d) => d.minmin !== undefined ? d.minmin : 0),
            d3.max(data, (d) => d.maxmax !== undefined ? d.maxmax : 0),
        ])
        .range([innerRadius, outerRadius]);

    const xAxis = (g) => g
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .call((g) =>
            g
            .selectAll('g')
            .data(data)
            .join('g')
            .each((d, i) => d.id = { id: `O-date-${d.date}`, href: `http://127.0.0.1:8081/#O-date-${d.date}` })
            .call((g) =>
                g
                .append('text')
                .append('textPath')
                .attr('startOffset', 6)
                .attr('xlink:href', (d) => {
                    return d.id.href;
                })
                .text(d3.utcFormat("%B"))
            )
        );

    const yAxis = (g) => g
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .call((g) =>
            g
            .selectAll('g')
            .data(y.ticks().reverse())
            .join('g')
            .attr('fill', 'none')
            .call((g) =>
                g
                .append('circle')
                .attr('stroke', '#000')
                .attr('stroke-opacity', 0.2)
                .attr('r', y)
            )
            .call((g) =>
                g
                .append('text')
                .attr('y', (d) => -y(d))
                .attr('dy', '0.35em')
                .attr('stroke', '#fff')
                .attr('stroke-width', 5)
                .text((x, i) => `${Math.abs(x.toFixed(0))}${i ? '' : ' cases'}`)
                .clone(true)
                .attr('y', (d) => y(d))
                .selectAll(function() {
                    return [this, this.previousSibling];
                })
                .clone(true)
                .attr('fill', 'currentColor')
                .attr('stroke', 'none')
            )
        );

    const line = d3
        .lineRadial()
        .curve(d3.curveLinearClosed)
        .angle((d) => {
            return x(d.date)
        });

    const area = d3
        .areaRadial()
        .curve(d3.curveLinearClosed)
        .angle((d) => {
            return x(d.date)
        });

    const svg = d3
        .select('#chart')
        .append('svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round');

    svg
        .append('path')
        .attr('fill', 'crimson')
        .attr('fill-opacity', 0.4)
        .attr(
            'd',
            area.innerRadius((d) => y(0)).outerRadius((d) => y(d.max !== undefined ? d.max : 0))(data)
        );

    svg
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'indigo')
        .attr('stroke-width', 1.5)
        .attr('d', line.radius((d) => y(0))(data));

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);

};

chart();

document.getElementById('ddlMuni').addEventListener("change", function() {
    document.getElementById('chart').innerHTML = "";
    chart();
});