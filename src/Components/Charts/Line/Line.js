import React, {useEffect, useRef, useState} from 'react';
import LineChart from "./LineChart";
import Loading from "../../loading";

function Line({inputData, selectedStates,days, types,type, updateTypes,classes}) {
    const lineDRef = useRef()
    
    useEffect(() => {
        
    }, [inputData, types])

    if (Object.keys(inputData).length < 1) return <Loading/>
    return (
        <div className='lineD' ref={lineDRef}>
            <div className={'buttonsGrp'}>
                <h6>Select one of the options to view trends</h6>
                <div className={'buttons'}>
                    {Object.keys(type).map(b => (
                            <button className={type[b] ? classes[b] : 'A'} onClick={updateTypes} value={b}
                                    key={b}>{b}</button>
                        )
                    )}
                </div>
            </div>
            <LineChart data={inputData} selectedStates={selectedStates} days={days} type={type} classes={classes}/>

        </div>
    );
}

export default Line;