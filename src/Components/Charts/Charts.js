import React, {useEffect, useState} from 'react';
import Race from "./Race/Race";
import Line from "./Line/Line";
import Bar from "./Bar/Bar";
import Selection from "./Builder Components/Selection";
import Loading from "../loading";
import Sunburst from 'react-sunburst-d3-v4';


function Charts({dataset, latestDataset,sunburst}) {

    
    const [data, setData] = useState({})    
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    
    const [state, setState] = useState(null)
    const [selected, setSelected] = useState(null)
    const [days, setDays] = useState(0)
    const [maxDays, setMaxDays] = useState(0)
    const [states, setStates] = useState([])
    const [types, setTypes] = useState([])
    const [type, setType] = useState({})
    const [classes] = useState({
        'totalconfirmed': 'blueBtn',
        'totaldeceased': 'redBtn',
        'totalrecovered': 'greenBtn'
    })
    
    //console.log(latestDataset)
    useEffect(() => {
        const defaultState = "MH"

       
        const defaultStateObj = dataset[defaultState];

        
        const totalDays = defaultStateObj.length
        
        
        const startDate = defaultStateObj[0].date

        

        const endDate = defaultStateObj[totalDays - 1].date

        
        setTypes(Object.keys(defaultStateObj[0]).slice(4,8))

        
        setStartDate(startDate)
        setEndDate(endDate)
        setData(dataset)
        setState(defaultState)
        setSelected([{label:"MH", value: "MH"},{lable:"DL",value:"DL"}])
        setDays(20)
        setMaxDays(totalDays)
        setStates(Object.keys(dataset))
        console.log(types)
        setType({
            totalconfirmed : true,
            totaldeceased : false,
            totalrecovered : false
        })
        


    }, [dataset])
    const updateState = (e) => setSelected(e)

    const updateDays = (e) => setDays(e.target.value)

    const updateType = (e) => {
        e.preventDefault()
        setType(p => ({
            ...p,
            [e.target.value]: !p[e.target.value]
        }))}

    if (Object.keys(data).length < 1) return <Loading/>
    return (
        <div className='charts'>
            <Race inputData={data} startDate={startDate} endDate={endDate} types={types}/>
            { <div className='lbD'>
                <div className={'titleWrapper'}>
                    <div className={'title'}>
                        <div className={'text'}>Compare Progress</div>
                    </div>
                    <div className={'buttonsGrp'}>
                        
                        <Selection updateState={updateState} updateDays={updateDays} state={state} days={days}
                                   states={states} maxDays={maxDays} selected={selected} setSelected={setSelected}/></div>
                </div>
                <div className='libDCharts'>
                    <Line inputData={data} selectedStates = {selected} days={days} type={type} types={types} updateTypes = {updateType} classes={classes}/>
                    <Bar inputData={data[state]} selectedStates = {selected} days={days} type={type} types={types} classes={classes}/>
                </div>
            </div> }
        
            <Sunburst
            
                data={sunburst}
                scale="linear"
                tooltipContent={ <div class="sunburstTooltip" style="position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;" /> }
                tooltip
                tooltipPosition="right"
                keyId="anagraph"
                width="800 "
                height="800"
            />
            </div>
        
        
);
}

export default Charts;