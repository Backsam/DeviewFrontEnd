import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Portfolio from "../../Component/Portfolio";
import { call } from "../../Hook/ApiService";
import "./UserPortfolioList.css"

function UserPortfoiloList(props) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState([]);
    let { userId } = useParams();

    useEffect(() => {
        setIsLoading(true)
        call(`/portfolio/list/${userId}`, "GET", null)
            .then((response) => {
                setData(response.content)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(true)
            })
        call(`/profile/${userId}`, "GET", null)
            .then((res) => {
                setProfileData(profileData => res);
                console.log(profileData)
            })
    }, []);

    return (
        <div className="userPortfolioListContainer">
            <div className="listUserInfo">
                <div className="listUserImgWrapper">
                    <img src={process.env.PUBLIC_URL + "/img/letsPlay-icon.png"} alt=""></img>
                </div>
                <div className="listUserProfile">
                    <h5>{userId}</h5>
                    <label>{profileData.introduce}</label>
                    <div className="listUserLinks">
                        <button><img src={process.env.PUBLIC_URL + "/img/github-icon.png"} alt=""></img></button>
                        <button><img src={process.env.PUBLIC_URL + "/img/blog-icon.png"} alt=""></img></button>
                    </div>
                </div>
            </div>
            <hr></hr>
            {
                isLoading ? <div style={{ height: "600px" }}></div> :
                    <div className="folioContainer">
                        {
                            data?.map(pf => (
                                <Link to={`/portfolio/${pf.pfId}`} style={{ color: "black", textDecoration: "none" }}>
                                    <Portfolio Key={pf.id} boardType="Portfolio"
                                        data={pf}
                                        viewId={pf.pfId}
                                        title={pf.title}
                                        summary={pf.summary}
                                        tags={pf.tags}
                                        userId={pf.userId}
                                        like={pf.like}
                                        view={pf.view}
                                        likes={pf.likes}
                                        createDate={pf.modifiedDate}
                                    />
                                </Link>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default UserPortfoiloList;