import React, {useEffect, useRef} from 'react';
import useResizeObserver from "../../Cutom Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleLinear, scaleTime} from 'd3-scale'
import {extent, max} from 'd3-array'
import {timeFormat} from 'd3-time-format'
import {axisBottom, axisLeft} from 'd3-axis'
import {format} from "d3-format";


function BarChart({data, days, type, selectedClass,selectedStates}) {
    const svgRef = useRef()
    const wrapperDivRef = useRef()
    const xAxisRef = useRef()
    const yAxisRef = useRef()
    const dimensions = useResizeObserver(wrapperDivRef)
    //const [lines, setLines] = useState([])
    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    useEffect(() => {
        const margin = {
            top: 40,
            bottom: 20,
            left: 50,
            right: 50
        }
        const svg = select(svgRef.current)
        if (!dimensions) return
        const {width, height} = dimensions;

        const barData = data.slice(-days).map(d => {
            return {
                date: d.date,
                input: d[type]
            }
        });
        const gap = 1.15;
        const bar = (width - margin.left - margin.right) / barData.length / gap;
        const xScale = scaleTime().range([margin.left, width - margin.right]);
        const yScale = scaleLinear().range([height - margin.top, margin.top]);
        const xAxis = axisBottom().scale(xScale).ticks(5)
            .tickFormat(timeFormat('%d %b'))


        const yAxis = axisLeft().scale(yScale).ticks(7).tickFormat(format(".2s"))
        ;
        const dateDomain = extent(barData, d => d.date);
        const inputMax = max(barData, d => d.input);
        xScale.domain(dateDomain)
        yScale.domain([0, inputMax])

        select(xAxisRef.current)
            .call(xAxis)
            .style('font-size', 'calc(5px + 1vmin)')
            .attr('transform', `translate(0,${height - margin.top + 1})`);

        select(yAxisRef.current)
            .call(yAxis)
            .style('font-size', 'calc(5px + 1vmin)')
            .attr('transform', `translate(${margin.left},1)`);

        // svg
        //     .selectAll('.rect')
        //     .data(barData)
        //     .join(enter => enter.append('rect'))
        //     .attr('class', `rect ${selectedClass}`)
        //     .attr('x', (d, i) => margin.left + 2 + +(i * bar * gap))
        //     .attr('y', d => {
        //         return yScale(d.input)
        //     })
        //     .attr('height', d => {
        //         return height - yScale(d.input) - margin.top
        //     })
        //     .attr('width', bar)

        //     var svg = d3.select("#my_dataviz")

        // Handmade legend
        svg.selectAll("*").remove();
        console.log(selectedStates)

        
        if(type['totalconfirmed']){
            selectedStates.forEach((state,i) => {
                svg.append("circle").attr("cx",10).attr("cy",50 + 30 *i).attr("r", 6).style("fill", colorArray[i])
                svg.append("text").attr("x", 30).attr("y", 50 + 30*i).text(state.value+'confirmed').style("font-size", "15px").attr('fill','white').attr("alignment-baseline","middle")})
        }
        if(type['totaldeceased']){
            selectedStates.forEach((state,i) => {
                svg.append("circle").attr("cx",200).attr("cy",50 + 30 *i).attr("r", 6).style("fill", colorArray[selectedStates.length+i])
                svg.append("text").attr("x", 220).attr("y", 50 + 30*i).text(state.value+'deceased').style("font-size", "15px").attr('fill','white').attr("alignment-baseline","middle")})
        }
        if(type['totalrecovered']){
            selectedStates.forEach((state,i) => {
                svg.append("circle").attr("cx",390).attr("cy",50 + 30 *i).attr("r", 6).style("fill", colorArray[2*selectedStates.length+i])
                svg.append("text").attr("x", 410).attr("y", 50 + 30*i).text(state.value+'recovered').style("font-size", "15px").attr('fill','white').attr("alignment-baseline","middle")})
        }

        

        console.log(type)

    }, [selectedClass, data, days, dimensions, type,selectedStates])
    return (
        
        <div ref={wrapperDivRef} className={'dd'}>
            <svg ref={svgRef}>
                
            </svg>
        </div>
    );
}

export default BarChart;