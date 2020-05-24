import React, {useEffect, useState} from 'react';
import Charts from "./Components/Charts/Charts";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loading from "./Components/loading";


function App() {

    const[countryCount, SetCountryCount] =  useState({})
    useEffect(() => {

        fetch('https://api.covid19india.org/data.json')
            .then((response) => response.json())
            .then(dataset => {
                let countryCount = {
                    active: 0,
                    confirmed: 0,
                    deaths: 0,
                    recovered: 0
                }

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

    // const [count, setCount] = useState({})
    // const [latestDataset, setLatestDataset] = useState({})
    // const [source, setSource] = useState({})
    // useEffect(() => {

    //     fetch('https://pomber.github.io/covid19/timeseries.json')
    //         .then((response) => response.json())
    //         .then(dataset => {
    //             const latestDataset = {}
    //             let count = {
    //                 confirmed: 0,
    //                 deaths: 0,
    //                 recovered: 0
    //             }

    //             for (const key in dataset) 
    //             {
    //                 if (dataset.hasOwnProperty(key)) 
    //                 {
    //                     latestDataset[key] = dataset[key].filter((d, i, arr) => {
    //                         if ((i === arr.length - 1)) Object.keys(d).slice(1).forEach(a => count[a] += d[a])
    //                         let date = d.date.split("-");
    //                         d.date = new Date(date[0], date[1] - 1, date[2]);
    //                         return (i === arr.length - 1)
    //                     })
    //                 }

    //             }
    //             setCount(count)
    //             setLatestDataset(latestDataset)
    //             setSource(dataset)
    //         })
    // }, [])
    // if (Object.keys(source).length < 1) return <Loading/>
    //<Charts latestDataset={latestDataset} dataset={source}/>
    return (
        <div className="App">
            <Header count={countryCount}/>
            
            <Footer/>
        </div>
    );
}

export default App;
