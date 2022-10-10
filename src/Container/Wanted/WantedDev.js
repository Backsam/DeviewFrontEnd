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
                        <li><Link to="/Wanted/Competition">Competition</Link></li>
                    </ul>
                </div>
        </div>

        <div className="DevListWrapper">
            <h1>Rising Developer</h1>
            <div className="RisingDevWrapper">
                <div className="RisingDevList">
                    <SimpleDevCard name="작성자" field="Web front-end" img="/img/aggro-icon.png"/>
                    <SimpleDevCard name="작성자" field="Web back-end" img="/img/letsPlay-icon.png"/>
                    <SimpleDevCard name="작성자" field="Full-Stack" img="/img/kku-icon.png"/>
                    <SimpleDevCard name="작성자" field="front" img="/img/happy-icon.png"/>
                </div>
            </div>

            <hr></hr>

            <div className="DevList">
                <DevCard name="Dev" img="/img/letsPlay-icon.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/>
                <DevCard name="Dev" img="/img/non-image.png"/> 
            </div>
        </div>
        </>        
    )
}
export default WantedDev;