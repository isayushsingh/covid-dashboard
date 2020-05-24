import React, {useEffect, useState} from 'react';
import Charts from "./Components/Charts/Charts";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loading from "./Components/loading";

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
           // console.log(statesDailyResponse)
        })

        //District Wise Data
        fetch('https://api.covid19india.org/state_district_wise.json')
        .then((response) => response.json())
        .then(data => {
            const stateDistrictsWise = data
            SetStateDistrictWise(stateDistrictsWise)
           // console.log(stateDistrictsWise)
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
            setStates(dataset.statewise);

            countryCount.active =  dataset["statewise"][0]["active"];
            countryCount.confirmed =  dataset["statewise"][0]["confirmed"];
            countryCount.deaths =  dataset["statewise"][0]["deaths"];
            countryCount.recovered =  dataset["statewise"][0]["recovered"];

            countryCount.active = parseInt(countryCount.active,10)
            countryCount.confirmed = parseInt(countryCount.confirmed,10)
            countryCount.deaths = parseInt(countryCount.deaths,10)
            countryCount.recovered = parseInt(countryCount.recovered,10)

            SetCountryCount(countryCount)
            })
        }, [])

    if (Object.keys(statesDailyResponse).length < 1) return <Loading/>
    return (
        <div className="App">
            <Header count={countryCount}/>
            <Charts latestDataset={statesDailyResponse} dataset={statesDailyResponse}/>
            <Footer/>
        </div>
    );
}

export default App;
