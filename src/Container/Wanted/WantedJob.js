import "./WantedJob.css"
import { Link } from "react-router-dom";

import Portfolio from "../../Component/Portfolio";

function WantedJob(props){

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
            <div className="JobList">
                <Link to="view"><Portfolio title="I want you" img="/img/iwantyou.jpg"/></Link>
                <Portfolio title="구인글"/>
                <Portfolio title="구인글"/>
                <Portfolio title="구인글"/>
                <Portfolio title="구인글"/>
                <Portfolio title="구인글"/>
                <Portfolio title="구인글"/>
                <Portfolio title="구인글"/>
                <Portfolio title="구인글"/>
            </div>

        </>        
    )
}
export default WantedJob;