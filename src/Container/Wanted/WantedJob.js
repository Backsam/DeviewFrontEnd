import "./WantedJob.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { call } from "../../Hook/ApiService";
import WantedJobCard from "../../Component/WantedJobCard";

function WantedJob(props) {

    const [data, setData] = useState([]);     //
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        call("/wanted/list?sort=wjId,desc", "GET", null)
            .then((response) => {
                setData(response.content)
                setIsLoading(false)
            })
            .catch((error) => console.log(error))
    }, []);

    return (
        <>
            {/* <div className="orderContainer">
                <div className="orderList">
                    <ul>
                        <li><Link to="/Wanted/dev">Developer</Link></li>
                        <li><Link to="/Wanted/job">job</Link></li>
                    </ul>
                </div>
            </div> */}
            <div className="wantedJobBanner">
                <h1>기업들은 무슨 개발자를 원할까?</h1>
                <br></br>
                <br></br>
                <h5>Deview 구직 서비스 </h5>
                <br></br>
                <h5>자신이 업로드한 포트폴리오와 함께 간단하게 이력서를 작성해보세요!</h5>
                <img src={process.env.PUBLIC_URL + '/img/ipsa.png'}></img>
            </div>
            <hr></hr>
            <div className="JobList">
                {
                    data.map((wj, idx) => (
                        <Link to={`view/${wj.wjId}`} style={{ color: "black", textDecoration: "none" }}>
                            <WantedJobCard 
                            Key={idx} 
                            boardType="WantedJob" 
                            viewId={wj.wjId} 
                            title={wj.title} 
                            summary={wj.summary} 
                            tags={wj.tags} 
                            userId={wj.userId} 
                            like={wj.like} 
                            view={wj.view}
                            createDate={wj.modifiedDate}
                            ></WantedJobCard>
                        </Link>
                    ))
                }
            </div>

        </>
    )
}
export default WantedJob;