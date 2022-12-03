import "./Profile.css";
import Portfolio from "../../Component/Portfolio";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import InputTag from "../../Component/Editor/InputTag";
import Modal from "../../Component/Modal/Modal";
import MessageModal from "../../Component/Message/MessageMoadal";
import { call, getUserId } from "../../Hook/ApiService";


function Profile(props) {

    const [status, setStatus] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [profileData, setProfileData] = useState([]);
    const [portfolioData, setPortfolioData] = useState([]);

    const location = useLocation();
    var params = new URLSearchParams(location.search);
    var userId = params.get("userId");

    useEffect(() => {
        if (userId != null || userId == '' || userId != undefined) {
            call(`/profile/${userId}`, "GET", null)
                .then((res) => {
                    setProfileData(profileData => res);
                    console.log(profileData)
                })
            call(`/portfolio/list/${userId}?size=4`)
                .then((res) => {
                    setPortfolioData(res.content);
                })
        }
    }, [])

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "unset"
    };





    return (
        <div className="ProfileContainer">
            <div className="ProfileWrapper">
                <div className="ProfileImgWarpper">
                    <img src={process.env.PUBLIC_URL + '/img/letsPlay-icon.png'} alt=""></img>
                </div>
                <div className="NameAndIntro">
                    <h2>{userId}</h2>
                    <div className="btnWrapper">
                        {/* <button onClick={openModal}><img src={process.env.PUBLIC_URL + '/img/envelope-plus-fill.svg'}></img></b
                        utton>
                        <Link to="/message"><img src={process.env.PUBLIC_URL + '/img/envelope-plus-fill.svg'}></img></Link> */}
                        {
                            userId == getUserId() ?
                                <button className="LetterBtn" onClick={() => setStatus(!status)}><img src={process.env.PUBLIC_URL + '/img/pencil-fill.svg'}></img></button>
                                : null
                        }

                    </div>
                </div>
                <div className="UserDetail">
                    <ProfileDetailView status={status} data={profileData} userId={userId} />
                </div>

            </div>
            <div>
                <div className="ViewMoreWrapper">
                    <Link to={`/portfolio/list/${userId}`} id="moreViewLink">더보기</Link>
                </div>
                <div className="Portfolios">
                    {
                        portfolioData?.map(pf => (
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
            </div>
            {/* <div className="UserPost">자유 게시판 글 목록</div> */}

            {/* <Modal open={modalOpen} close={closeModal} header="Message" width="900px">
                <MessageModal></MessageModal>
            </Modal> */}
        </div>
    )
}

export default Profile;

function ProfileDetailView(props) {

    const [profile, setProfile] = useState({});

    const getValue = e => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        })
        console.log(profile);
    };

    const submitProfile = () => {
        call("/profile/update", "PUT", profile)
        window.location.replace(`/profile?userId=${props.userId}`)
    }

    if (props.status === false) {
        return (
            <>
                <span>
                    {props.data.introduce}
                </span>
                <dl>
                    <dt>활동분야</dt>
                    <dd>{props.data.field}</dd>
                    <dt>기술스택</dt>
                    <dd>{props.data.techStack}</dd>
                    <dt>웹사이트</dt>
                    <dd>{props.data.website}</dd>
                </dl>
            </>
        )
    } else {
        return (
            <>
                <dt>
                    소개
                </dt>
                <span>
                    <textarea defaultValue={props.data.introduce} name="introduce" onChange={getValue} style={{ width: "100%" }}></textarea>
                </span>
                <dl>
                    <dt>활동분야</dt>
                    <dd><input type="text" name="field" onChange={getValue} defaultValue={props.data.field} style={{ width: "100%" }}></input></dd>
                    <dt>기술스택</dt>
                    <dd><input type="text" name="techStack" onChange={getValue} defaultValue={props.data.techStack} style={{ width: "100%" }}></input></dd>
                    <dt>웹사이트</dt>
                    <dd><input type="text" name="website" onChange={getValue} defaultValue={props.data.website} style={{ width: "100%" }}></input>
                    </dd>
                </dl>
                <button className="test" onClick={submitProfile}>Submit </button>
            </>
        )
    }
}

