import React, {useEffect, useState} from 'react';
import Charts from "./Components/Charts/Charts";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loading from "./Components/loading";
import Choropleth from "./Components/choropleth/choropleth"
import Sunburst from "./Components/Charts/Sunburst/Sunburst"

import {
    parseStateTimeseries,
  } from './utils/commonfunctions';


function App() {
    
    let temp = []
        let districts = []
        let final = {}
    const[countryCount, SetCountryCount] =  useState({})
    const[statesDailyResponse, SetStatesDailyResponse] = useState({})
    const[states, setStates] = useState(null);

    const [sunburstData, setSunburstData] = useState({})
    const[testedData, setTestedData] = useState(null);
    const[stateDistrictsWise, SetStateDistrictWise] = useState({})
    useEffect(() => {
            
        //States Daily Data and Cumulative Data
        fetch('https://api.covid19india.org/states_daily.json')
        .then((response) => response.json())
        .then(data => {
             const statesDailyResponse = parseStateTimeseries(data);
            SetStatesDailyResponse(statesDailyResponse)
            //console.log(statesDailyResponse)
        })

        
        //District Wise Data
        fetch('https://api.covid19india.org/state_district_wise.json')
        .then((response) => response.json())
        .then(data => {
            const stateDistrictsWise = data
            
            SetStateDistrictWise(stateDistrictsWise)
            //console.log(stateDistrictsWise)
           
            for (const property in stateDistrictsWise) 
            {
                districts = Object.getOwnPropertyNames(stateDistrictsWise[property]["districtData"])
                //console.log(districts);
                let cases = [];
                for (const district in districts)
                {
                    //console.log(stateDistrictsWise[property]["districtData"][districts[district]])
                    cases.push({
                        name: districts[district],
                        size: stateDistrictsWise[property]["districtData"][districts[district]]["confirmed"]
                    })
                    //console.log(districts[district]);                                        
                }
                temp.push({
                    name: property,
                    children: cases
                })    
            }
            temp = temp.slice(1)
            final = {
                name: "India",
                children: temp
            }
            setSunburstData(final)
            console.log(final)
        })

        // //Raw Data = Patients information
        // fetch('https://api.covid19india.org/raw_data.json')
        // .then((response) => response.json())
        // .then(data => {
        //     const rawData = data
        //     setRawData(rawData)
        // })

        
        //total cases
        fetch('https://api.covid19india.org/data.json')
        .then((response) => response.json())
        .then(dataset => {
            let countryCount = {
                active: 0,
                confirmed: 0,
                deaths: 0,
                recovered: 0
            }
            
            //Data of Cases in entire country and states till data
            setStates(dataset.statewise);
            //console.log(dataset.statewise)
            
            setTestedData(dataset.tested)
            //console.log(testedData)
           
            //Stats of the conutry wide cases
            let countryTotalStats = dataset.statewise.slice(0,1)

            countryCount.active =  countryTotalStats[0].active;
            countryCount.confirmed =  countryTotalStats[0].confirmed;
            countryCount.deaths =  countryTotalStats[0].deaths;
            countryCount.recovered =  countryTotalStats[0].recovered;

            SetCountryCount(countryCount)
            })
        }, [])

    if (Object.keys(statesDailyResponse).length < 1) return <Loading/>
    
    return (
        <div className="App">
            <Header count={countryCount}/>
            <Charts dataset={statesDailyResponse} latestDataset={states} />
            <Sunburst
                data={sunburstData}
                scale="linear"
                tooltipContent={ <div class="sunburstTooltip" style="position:absolute; color:'black'; z-index:10; background: #000000; padding: 5px; text-align: center;" /> }
                tooltip
                tooltipPosition="right"
                keyId="anagraph"
                width="480"
                height="400"
            />
            <Choropleth dataset={states}/>
           
            

            <Footer/>
            
            
        </div>
    );
}

export default App;
