import "./WantedDev.css"
import { Link } from "react-router-dom";

import Portfolio from "../../Component/Portfolio";
import SimpleDevCard from "../../Component/Developers/SimpleDevCard";
import DevCard from "../../Component/Developers/DevCard";
import styled from "styled-components";

function WantedDev(props){

    return(
        <>
        <div className="orderContainer">
                <div className="orderList">
                    <ul>
                        <li><Link to="/Wanted/dev">Developer</Link></li>
                        <li><Link to="/Wanted/job">job</Link></li>
                    </ul>
                </div>
        </div>

        <div className="DevListWrapper">
            <h1>C#</h1>
            <div className="DevList">
                <DevCard name="Dev" img="/img/letsPlay-icon.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>      
            </div>
            <hr></hr>
            <h1>JAVA</h1>
            <div className="DevList">
                <DevCard name="Dev" img="/img/letsPlay-icon.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
            </div>
            <hr></hr>   
            <h1>React</h1>
            <div className="DevList">
                <DevCard name="Dev" img="/img/letsPlay-icon.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
            </div>
            <hr></hr>
            <h1>Spring</h1>
            <div className="DevList">
                <DevCard name="Dev" img="/img/letsPlay-icon.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
            </div>


            <hr></hr>
            <div className="DevList">
                <DevCard name="Dev" img="/img/letsPlay-icon.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
            </div>
        </div>
        </>        
    )
}
export default WantedDev;