import React from 'react';
import Info from "./info";
import {ReactComponent as Bat} from "./SVG/bat.svg";

function Header({count}) {
    return (
        <header>
            <a href="https://github.com/AyushSingh098/covid-dashboard" className='icon'></a>
            
            <div className='heading'>
                <Bat className="bat"/>
                COVID-19 INDIA DASHBOARD

                <blockquote>
                    We stand with everyone fighting on the frontlines
                </blockquote>
            </div>
            <Info count={count}/>
        </header>
    );
}

export default Header;