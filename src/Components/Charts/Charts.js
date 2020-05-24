import React, {useEffect, useState} from 'react';
import Race from "./Race/Race";
import Line from "./Line/Line";
import Bar from "./Bar/Bar";
//import World from "./World/World";
import Selection from "./Builder Components/Selection";
import Loading from "../loading";

function Charts({dataset, latestDataset}) {

    
    const [data, setData] = useState({})

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    
    const [state, setState] = useState(null)
    const [days, setDays] = useState(0)
    const [maxDays, setMaxDays] = useState(0)
    const [states, setStates] = useState([])
    const [types, setTypes] = useState([])
    const [classes] = useState({
        'totalconfirmed': 'blueBtn',
        'totaldeceased': 'redBtn',
        'totalrecovered': 'greenBtn'
    })

    useEffect(() => {
        const defaultState = 'MH'


        const defaultStateObj = dataset[defaultState];

        
        const totalDays = defaultStateObj.length
        
        
        const startDate = defaultStateObj[0].date

        

        const endDate = defaultStateObj[totalDays - 1].date

        
        setTypes(Object.keys(defaultStateObj[0]).slice(4,8))

        
        setStartDate(startDate)
        setEndDate(endDate)
        setData(dataset)
        setState(defaultState)
        setDays(20)
        setMaxDays(totalDays)
        setStates(Object.keys(dataset))



    }, [dataset])
    const updateState = (e) => setState(e.target.value)

    const updateDays = (e) => setDays(e.target.value)


    if (Object.keys(data).length < 1) return <Loading/>
    return (
        <div className='charts'>
            <Race inputData={data} startDate={startDate} endDate={endDate} types={types}/>
            { <div className='lbD'>
                <div className={'titleWrapper'}>
                    <div className={'title'}>
                        <div className={'text'}>Historical Data</div>
                    </div>
                    <div className={'buttonsGrp'}>
                        
                        <Selection updateState={updateState} updateDays={updateDays} state={state} days={days}
                                   states={states} maxDays={maxDays}/></div>
                </div>
                <div className='libDCharts'>
                    <Line inputData={data[state]} days={days} types={types} classes={classes}/>
                    <Bar inputData={data[state]} days={days} types={types} classes={classes}/>
                </div>
            </div> }

            
        </div>
    );
}
//<World inputData={latestDataset} types={types}/>
export default Charts;