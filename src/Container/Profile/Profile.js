import "./Profile.css";
import Portfolio from "../../Component/Portfolio";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputTag from "../../Component/Editor/InputTag";
import Modal from "../../Component/Modal/Modal";
import MessageModal from "../../Component/Message/MessageMoadal";


function Profile(props) {

    const [status, setStatus] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

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
                    <h2>작성자</h2>
                    <div className="btnWrapper">
                        <button onClick={openModal}><img src={process.env.PUBLIC_URL + '/img/envelope-plus-fill.svg'}></img></button>
                        <Link to="/message"><img src={process.env.PUBLIC_URL + '/img/envelope-plus-fill.svg'}></img></Link>
                        <button className="LetterBtn" onClick={() => setStatus(!status)}><img src={process.env.PUBLIC_URL + '/img/pencil-fill.svg'}></img></button>
                    </div>
                </div>
                <div className="UserDetail">
                    <ProfileDetailView status={status} />
                </div>

            </div>
            <div>
                <div className="ViewMoreWrapper">
                    <Link to="morePortfilos" id="moreViewLink">더보기</Link>
                </div>
                <div className="Portfolios">
                    <Portfolio title="Prototype Project Portfolio" summary="개요"></Portfolio>
                    <Portfolio></Portfolio>
                    <Portfolio></Portfolio>
                    <Portfolio></Portfolio>
                    
                </div>
            </div>
            <div className="UserPost">자유 게시판 글 목록</div>

            <Modal open={modalOpen} close={closeModal} header="Message" width="900px">
                <MessageModal></MessageModal>
            </Modal>
        </div>
    )
}

export default Profile;

function ProfileDetailView(props) {
    if (props.status === false) {
        return (
            <>
                <span>
                    When I wrote this code, only the two of us in the world, me and God, knew what this code was doing.<p />
                    Now only God knows.
                </span>
                <dl>
                    <dt>활동분야</dt>
                    <dd>웹사이트 개발</dd>
                    <dt>기술스택</dt>
                    <dd>React, Spring boot, Java, MySQL</dd>
                    <dt>웹사이트</dt>
                    <dd>Naver.com
                        <p></p>
                        inhatc.ac.kr

                    </dd>
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
                    <textarea style={{width:"100%"}}></textarea>
                </span>
                <dl>
                    <dt>활동분야</dt>
                    <dd><input type="text" style={{width:"100%"}}></input></dd>
                    <dt>기술스택</dt>
                    <dd><InputTag></InputTag></dd>
                    <dt>웹사이트</dt>
                    <dd><input type="text" style={{width:"100%"}}></input>
                    </dd>
                    <dt>기타설정</dt>
                    <input type="checkbox"></input> <span>구직중</span><p></p>
                </dl>
                <button className="test">Submit </button>
                <button className="test">cancle </button>
            </>
        )
    }
}

