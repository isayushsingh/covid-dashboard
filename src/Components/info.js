import React from 'react';
import {ReactComponent as Confirmed} from "./SVG/virus.svg";
import {ReactComponent as Fight} from "./SVG/fight.svg";
import {ReactComponent as Recovered} from "./SVG/medical.svg";
import {ReactComponent as Death} from "./SVG/death.svg";

function Info({count}) 
{
    return (
        <div className="info">
            <div className='c out'>
                <Confirmed/>
                    <p>{count.confirmed}</p>
                    <p>Confirmed</p>
                <div className='c box'></div>
            </div>

            <div className='r out'>
                <Recovered/> 
                    <p>{count.recovered}</p>
                    <p>Recovered</p>
                <div className='r box'></div>
            </div>

            <div className='d out'>
                <Death/> 
                    <p>{count.deaths}</p> 
                    <p> Deceased</p>
                <div className='d box'>
                </div>
            </div>

            <div className='c out'>
                <Fight/>
                    <p>{count.active}</p>
                    <p>Active</p>
                <div className='box f'>
                    <div className='box r'></div>
                    <div className='box c'></div>
                    <div className='box d'></div>
                </div>
            </div>
        </div>
    );
}

export default Info;