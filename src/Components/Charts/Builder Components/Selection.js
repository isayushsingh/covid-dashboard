import React from 'react';

function Selection({updateState, updateDays, state, days, states, maxDays}) {
    return (
        <div className='sel'>
            <select onChange={updateState} value={state}>
                {
                    states.map(c => {
                        return (<option key={c} value={c}>{c}</option>);
                    })
                }
            </select>

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