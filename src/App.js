import React, {useEffect, useState} from 'react';
import Charts from "./Components/Charts/Charts";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loading from "./Components/loading";
import Choropleth from "./Components/choropleth/choropleth"

import {
    parseStateTimeseries,
  
  } from './utils/commonfunctions';


function App() {

    const[countryCount, SetCountryCount] =  useState({})
    const[statesDailyResponse, SetStatesDailyResponse] = useState({})
    const[states, setStates] = useState(null);
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
        })
        
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
            <Charts latestDataset={statesDailyResponse} dataset={statesDailyResponse}/>
            <Choropleth dataset={states}/>
            <Footer/>
        </div>
    );
}

export default App;
