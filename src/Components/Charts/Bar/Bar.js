import React, {useEffect, useState} from 'react';
import BarChart from "./BarChart";
import ChildSelection from "../Builder Components/ChildSelection";
import Loading from "../../loading";

function Bar({inputData, days,type, types, classes,selectedStates}) {

    const [data, setData] = useState({})
    
    useEffect(() => {
        setData(inputData)
        
    }, [type, inputData])


    if (Object.keys(inputData).length < 1) return <Loading/>
    return (
        <div className='barD'>
            <div className={'buttonsGrp'}>
                <h6>Legends</h6>
                
            </div>
            <BarChart data={data} type={type} selectedStates={selectedStates} days={days} selectedClass={classes[type]}/>

        </div>
    );
}

export default Bar;