import React from 'react';
import {ReactComponent as ReactLogo} from "./SVG/react.svg";
import {ReactComponent as D3Logo} from "./SVG/d3.svg";

function Footer(props) {
    return (
        <footer>
            <div className={'intro'}>Powered by<a href='https://reactjs.org/'
                                                                   title={'React'}><ReactLogo/></a> & <a
                href={'https://d3js.org/'} title={'D3'}><D3Logo/></a>
            </div>
            <div className={'data'}>Data Source :
                <a href={'https://github.com/covid19india/api'}> covid19india</a> | API :
                <a href={'https://api.covid19india.org/'}> COVID19-India API</a>
            </div>
        </footer>
    )
}

export default Footer;