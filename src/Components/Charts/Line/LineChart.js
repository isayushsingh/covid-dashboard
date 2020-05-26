import React, {useEffect, useRef, useState} from 'react';
import useResizeObserver from "../../Cutom Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleLinear, scaleTime} from 'd3-scale'
import {extent, max} from 'd3-array'
import {timeFormat} from 'd3-time-format'
import {axisBottom, axisLeft} from 'd3-axis'
import {line} from 'd3-shape'
import {format} from "d3-format";

function LineChart({data,selectedStates, days, type, classes}) {
    const svgRef = useRef()
    const xAxisRef = useRef()
    const yAxisRef = useRef()
    const wrapperDivRef = useRef()
    const dimensions = useResizeObserver(wrapperDivRef)

    const [lines, setLines] = useState([])


    useEffect(() => {
        const margin = {
            top: 40,
            bottom: 20,
            left: 50,
            right: 50
        }
        if (!dimensions) return
        const {width, height} = dimensions;

        const xScale = scaleTime().range([margin.left, width - margin.right]);
        const yScale = scaleLinear().range([height - margin.top, margin.top]);
        const lineG = line()
        const lineG2 = line()
        const xAxis = axisBottom().scale(xScale).ticks(5)
            .tickFormat(timeFormat('%d %b'))
        const yAxis = axisLeft().scale(yScale).ticks(7).tickFormat(format(".2s"))

        var totalconfirmed;
        var totaldeceased;
        var totalrecovered; 
        const temp =[]

        const dateDomain = extent(data[selectedStates[0].value].slice(-days), d => d.date);
        const maxArr =[]
        
        selectedStates.forEach(state =>{

            maxArr.push(max(data[state.value].slice(-days), d => d.totalconfirmed))
        })
        
        xScale.domain(dateDomain)
        yScale.domain([0, max(maxArr)])


        selectedStates.forEach(state => {

            const lineData = data[state.value].slice(-days);
            lineG.x(d => xScale(d.date))
            lineG.y(d => yScale(d.totalconfirmed))
            totalconfirmed = (lineG(lineData))
            lineG.y(d => yScale(d.totaldeceased))
            totaldeceased = (lineG(lineData))
            lineG.y(d => yScale(d.totalrecovered))
            totalrecovered = (lineG(lineData))
            temp.push({totalconfirmed: totalconfirmed, totaldeceased: totaldeceased, totalrecovered: totalrecovered, state:state})
        })
       
        setLines(temp)
        console.log(lines)
        select(xAxisRef.current).call(xAxis).attr('transform', `translate(0,${height - margin.top})`).style('font-size', 'calc(5px + 1vmin)');
        select(yAxisRef.current).call(yAxis).attr('transform', `translate(${margin.left},0)`).style('font-size', 'calc(5px + 1vmin)');


    }, [data, type, dimensions, days,selectedStates])

    
    return (
        <div ref={wrapperDivRef} className={'dd'}>
            <svg ref={svgRef}>
                
                
                {type['totalconfirmed'] ? lines.map((line, i) =>{
            return(<path d={line['totalconfirmed']} fill='none' stroke='#FF0000' strokeWidth='0.3rem' key={i} />)
                }):''}

                {type['totaldeceased'] ? lines.map((line, i) =>{
            return(<path d={line['totaldeceased']} fill='none' stroke='#00FF00' strokeWidth='0.3rem' key={i+100}/>)
                }):''}

                {type['totalrecovered'] ? lines.map((line, i) =>{
            return(<path d={line['totalrecovered']} fill='none' stroke='#0000FF' strokeWidth='0.3rem' key={i+200}/>)
                }):''}

                {/* <path d={lines} fill='none' stroke='#FF0000' strokeWidth='0.3rem' /> */}
                <g>
                    <g ref={xAxisRef}/>
                    <g ref={yAxisRef}/>
                </g>
            </svg>
        </div>
    );
}

export default LineChart;