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

    var color =['#FF0000', '#00FF00', '#EE82EE']

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
        if (!dimensions) return
        const {width, height} = dimensions;

        const xScale = scaleTime().range([margin.left, width - margin.right]);
        const yScale = scaleLinear().range([height - margin.top, margin.top]);
        const lineG = line()
        const xAxis = axisBottom().scale(xScale).ticks(5)
            .tickFormat(timeFormat('%d %b'))
        const yAxis = axisLeft().scale(yScale).ticks(7).tickFormat(format(".2s"))

        const len = selectedStates.length
        var totalconfirmed;
        var totaldeceased;
        var totalrecovered; 
        const temp =[]

        const dateDomain = extent(data[selectedStates[0].value].slice(-days), d => d.date);
        const maxArr =[]
        
        if(type['totalconfirmed']){
            selectedStates.forEach(state =>{

                maxArr.push(max(data[state.value].slice(-days), d => d.totalconfirmed))
            })
        }
        else if(type['totalrecovered']){

            selectedStates.forEach(state =>{

                maxArr.push(max(data[state.value].slice(-days), d => d.totalrecovered))
            })
        }
        else{
            selectedStates.forEach(state =>{

                maxArr.push(max(data[state.value].slice(-days), d => d.totaldeceased))
            })
            
        }
        
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
            
            <svg ref={svgRef} >
                
                {type['totalconfirmed'] ? lines.map((line, i) =>{
            return(<path id={"C"+line.state.value} d={line['totalconfirmed']} fill='none' stroke={color[0]} strokeWidth='0.1rem' key={i} />
            )
                }):''}

             {
                lines.map((line, i) => {
                    return(
                  
                    <text x="10" y="100" class="small" style={{fill : 'white', font: 'italic bold 12px sans-serif'}}>
                    <textPath href={"#C"+line.state.value}>
                        {line.state.value}
                    </textPath>
                    </text>)

                 })
             }   
            
            
                

                {type['totaldeceased'] ? lines.map((line, i) =>{
            return(<path id={"D"+line.state.value} d={line['totaldeceased']} fill='none' stroke={color[2]} strokeWidth='0.1rem' key={i+100}/>)
                }):''}

{
                lines.map((line, i) => {
                    return(
                  
                    <text x="400" y="100" class="small" style={{fill : 'white', font: 'italic bold 12px sans-serif'}}>
                    <textPath href={"#D"+line.state.value}>
                        {line.state.value}
                    </textPath>
                    </text>)

                 })
             }  

                {type['totalrecovered'] ? lines.map((line, i) =>{
            return(<path  id={"R"+line.state.value} d={line['totalrecovered']} fill='none' stroke={color[1]} strokeWidth='0.1rem' key={i+200}/>)
                }):''}

{
                lines.map((line, i) => {
                    return(
                  
                    <text x="100" y="100" class="small" style={{fill : 'white', font: 'italic bold 12px sans-serif'}}>
                    <textPath href={"#R"+line.state.value}>
                        {line.state.value}
                    </textPath>
                    </text>)

                 })
             }  

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