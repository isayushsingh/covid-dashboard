import React from 'react';
import MultiSelect from "react-multi-select-component";

function Selection({updateState, updateDays, state, days, states, maxDays, selected, setSelected}) {
    
    const options = [];
    states.forEach(c => {
        return (options.push({label: c, value: c}));
    })
    //console.log(options)
    return (
        <div className='sel'>
            <h6>Change State</h6>
            <MultiSelect
                options={options}
                value={selected}
                onChange={updateState}
                labelledBy={"Select"}
            />
            {/* <select onChange={updateState} value={state}>
                {
                    states.map(c => {
                        return (<option key={c} value={c}>{c}</option>);
                    })
                }
            </select> */}
            <h6>Change Duration</h6>
            <select onChange={updateDays} value={days}>
                {
                    [...Array(maxDays + 1).keys()].map((i) => {
                        return (<option key={i + 1} value={i + 1}>{i + 1} Days</option>);
                    })
                }
            </select>
        </div>
    );
}

export default Selection;