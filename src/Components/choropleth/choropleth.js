import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import LinearGradient from './LinearGradient.js';
import './mapstyle.css';

const INDIA_TOPO_JSON = require('./india.topo.json');
const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  '#FFFAFA',
  '#FFCCCC',
  '#FFC1C1',
  '#FF6A6A',
  '#FF6666',
  '#FF4040',
  '#FF3333',
  '#FF3030',
  '#FF0000',
  '#EE0000',
  '#CD0000',
  '#8B0000',
  '#800000',
  '#660000',
  '#330000'
  ];


const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
default: {
    outline: 'none'
},
hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
},
pressed: {
    outline: 'none'
}
};


let heatMapList = [{}]
let flag = false;
function Choropleth({dataset})
{
   
    
    if(dataset!= null && !flag)
    {
        dataset.forEach(element => {
            if(!(element["state" == 'Total'] || element['state' == 'State Unassigned']))
            {
                heatMapList.push({
                id: element["statecode"],
                state: element["state"],
                value: element["confirmed"]
            })
        }  
        });
        flag = true;
        heatMapList = heatMapList.slice(2);
        //console.log(heatMapList)
    }

    const getHeatMapData = () => {
        //console.log(heatMapList)
        return heatMapList;
    }

    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData());
    
    const gradientData = 
    {
      fromColor: COLOR_RANGE[0],
      toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
      min: 0,
      max: heatMapList[0].value
      
    };
    
    const colorScale = scaleQuantile()
      .domain(data.map(d => d.value))
      .range(COLOR_RANGE);
  
    const onMouseEnter = (geo, current = { value: 'NA' }) => {
      return () => {
        setTooltipContent(`${geo.properties.name}: ${current.value}`);
      };
    };
  
    const onMouseLeave = () => {
      setTooltipContent('');
    };
  
    const onChangeButtonClick = () => {
      setData(getHeatMapData());
    };
  
    return (
        <div className="full-width-height container">
        <h1 className="no-margin center">COVID-19 CHOROPLETH INDIA</h1>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
          <ComposableMap
            projectionConfig={PROJECTION_CONFIG}
            projection="geoMercator"
            width={600}
            height={220}
            data-tip=""
          >
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map(geo => {
                  //console.log(geo.id);
                  const current = data.find(s => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                      style={geographyStyle}
                      onMouseEnter={onMouseEnter(geo, current)}
                      onMouseLeave={onMouseLeave}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          <LinearGradient data={gradientData} />
          
      </div>
    );
  }

  export default Choropleth;
