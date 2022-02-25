import React, { useEffect } from 'react';
import Select from 'react-select';
import * as d3 from "d3";
import dataset from '../data/data'

const IndexPage = () => {

  useEffect(() => {
    chart('Acton');
    intro('Acton');
  }, []);

  const municipalities = [
    { label: 'Acton', value: 'Acton' },
    { label: 'Arlington', value: 'Arlington' },
    { label: 'Ashland', value: 'Ashland' },
    { label: 'Bedford', value: 'Bedford' },
    { label: 'Bellingham', value: 'Bellingham' },
    { label: 'Belmont', value: 'Belmont' },
    { label: 'Beverly', value: 'Beverly' },
    { label: 'Bolton', value: 'Bolton' },
    { label: 'Boston', value: 'Boston' },
    { label: 'Boxborough', value: 'Boxborough' },
    { label: 'Braintree', value: 'Braintree' },
    { label: 'Brookline', value: 'Brookline' },
    { label: 'Burlington', value: 'Burlington' },
    { label: 'Cambridge', value: 'Cambridge' },
    { label: 'Canton', value: 'Canton' },
    { label: 'Carlisle', value: 'Carlisle' },
    { label: 'Chelsea', value: 'Chelsea' },
    { label: 'Cohasset', value: 'Cohasset' },
    { label: 'Concord', value: 'Concord' },
    { label: 'Danvers', value: 'Danvers' },
    { label: 'Dedham', value: 'Dedham' },
    { label: 'Dover', value: 'Dover' },
    { label: 'Duxbury', value: 'Duxbury' },
    { label: 'Essex', value: 'Essex' },
    { label: 'Everett', value: 'Everett' },
    { label: 'Foxborough', value: 'Foxborough' },
    { label: 'Framingham', value: 'Framingham' },
    { label: 'Franklin', value: 'Franklin' },
    { label: 'Gloucester', value: 'Gloucester' },
    { label: 'Hamilton', value: 'Hamilton' },
    { label: 'Hanover', value: 'Hanover' },
    { label: 'Hingham', value: 'Hingham' },
    { label: 'Holbrook', value: 'Holbrook' },
    { label: 'Holliston', value: 'Holliston' },
    { label: 'Hopkinton', value: 'Hopkinton' },
    { label: 'Hudson', value: 'Hudson' },
    { label: 'Hull', value: 'Hull' },
    { label: 'Ipswich', value: 'Ipswich' },
    { label: 'Lexington', value: 'Lexington' },
    { label: 'Lincoln', value: 'Lincoln' },
    { label: 'Littleton', value: 'Littleton' },
    { label: 'Lynn', value: 'Lynn' },
    { label: 'Lynnfield', value: 'Lynnfield' },
    { label: 'Malden', value: 'Malden' },
    { label: 'Manchester', value: 'Manchester' },
    { label: 'Marblehead', value: 'Marblehead' },
    { label: 'Marlborough', value: 'Marlborough' },
    { label: 'Marshfield', value: 'Marshfield' },
    { label: 'Maynard', value: 'Maynard' },
    { label: 'Medfield', value: 'Medfield' },
    { label: 'Medford', value: 'Medford' },
    { label: 'Medway', value: 'Medway' },
    { label: 'Melrose', value: 'Melrose' },
    { label: 'Middleton', value: 'Middleton' },
    { label: 'Milford', value: 'Milford' },
    { label: 'Millis', value: 'Millis' },
    { label: 'Milton', value: 'Milton' },
    { label: 'Nahant', value: 'Nahant' },
    { label: 'Natick', value: 'Natick' },
    { label: 'Needham', value: 'Needham' },
    { label: 'Newton', value: 'Newton' },
    { label: 'Norfolk', value: 'Norfolk' },
    { label: 'North', value: 'North' },
    { label: 'Norwell', value: 'Norwell' },
    { label: 'Norwood', value: 'Norwood' },
    { label: 'Peabody', value: 'Peabody' },
    { label: 'Pembroke', value: 'Pembroke' },
    { label: 'Quincy', value: 'Quincy' },
    { label: 'Randolph', value: 'Randolph' },
    { label: 'Reading', value: 'Reading' },
    { label: 'Revere', value: 'Revere' },
    { label: 'Rockland', value: 'Rockland' },
    { label: 'Rockport', value: 'Rockport' },
    { label: 'Salem', value: 'Salem' },
    { label: 'Saugus', value: 'Saugus' },
    { label: 'Scituate', value: 'Scituate' },
    { label: 'Sharon', value: 'Sharon' },
    { label: 'Sherborn', value: 'Sherborn' },
    { label: 'Somerville', value: 'Somerville' },
    { label: 'Southborough', value: 'Southborough' },
    { label: 'Stoneham', value: 'Stoneham' },
    { label: 'Stoughton', value: 'Stoughton' },
    { label: 'Stow', value: 'Stow' },
    { label: 'Sudbury', value: 'Sudbury' },
    { label: 'Swampscott', value: 'Swampscott' },
    { label: 'Topsfield', value: 'Topsfield' },
    { label: 'Wakefield', value: 'Wakefield' },
    { label: 'Walpole', value: 'Walpole' },
    { label: 'Waltham', value: 'Waltham' },
    { label: 'Watertown', value: 'Watertown' },
    { label: 'Wayland', value: 'Wayland' },
    { label: 'Wellesley', value: 'Wellesley' },
    { label: 'Wenham', value: 'Wenham' },
    { label: 'Weston', value: 'Weston' },
    { label: 'Westwood', value: 'Westwood' },
    { label: 'Weymouth', value: 'Weymouth' },
    { label: 'Wilmington', value: 'Wilmington' },
    { label: 'Winchester', value: 'Winchester' },
    { label: 'Winthrop', value: 'Winthrop' },
    { label: 'Woburn', value: 'Woburn' },
    { label: 'Wrentham', value: 'Wrentham' },
    { label: 'MAPC Region', value: 'MAPC Region' },
  ]

  function chart(selectValue) {
      const municipality = selectValue;
      const width = 1000;
      const height = width;
      const margin = 10;
      const innerRadius = 200;
      const outerRadius = 2175 / 2 - margin;
      const data = dataset.filter(d => d.municipality === municipality)[0];
  
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

      console.log('percentage', data.population);
  
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
              .outerRadius((d) => y((d.case_count / data.population) * 10000))
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
          .attr('transform', function(d) { return `rotate(${((x(d.date) + x.bandwidth() / 2) * 180 / Math.PI - 90)}) translate(${(y(-400) + 30)},0)`; })
          .append('text')
          .text(function(d) { return (x(d.date) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? `${d.case_count} - ${d.date}` : `${d.date} - ${d.case_count}`; })
          .attr('transform', function(d) { return (x(d.date) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'rotate(180)' : 'rotate(0)'; })
          .style('font-size', '10px')
          .style('font-family', 'Courier New')
          .attr('alignment-baseline', 'middle');
  };

  function intro(selectValue) {
    const population = dataset.filter(d => d.municipality === selectValue)[0].population;
    d3.select('#intro')
    .append('p')
    .text(`This chart shows the percentatge of case counts by population (${population}) with weekly covid case count label by municipality.`)
  }
  
  return (
    <main>
      <h1>Covid Data by Municipality</h1>
        <div id="intro"></div>        
        <Select
          options={ municipalities }
          defaultValue={{ label: 'Acton', value: 'Acton' }}
          onChange={e => {
              document.getElementById('chart').innerHTML = '';
              document.getElementById('intro').innerHTML = '';
              chart(e.label);
              intro(e.label)
           }}
        />
        <div id="chart">
        </div>
    </main>
  )
}

export default IndexPage
