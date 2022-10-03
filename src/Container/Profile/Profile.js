import "./Profile.css";
import Portfolio from "../../Component/Portfolio";
import { Link } from "react-router-dom";

function Profile(props){
    return(
        <div className="ProfileContainer">
            <div className="ProfileWrapper">
                <div className="ProfileImgWarpper">
                    <img src="img/letsPlay-icon.png" alt=""></img>
                </div>
                <div className="NameAndIntro">
                    <h2>작성자</h2>
                    <span>
                    When I wrote this code, only the two of us in the world, me and God, knew what this code was doing.<p/>
                    Now only God knows.
                    </span>
                </div>
                
                <div className="UserDetail">
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
                </div>
            </div>
            <div> 
            <div className="ViewMoreWrapper">
                <Link to="morePortfilos" id="moreViewLink">더보기</Link>
            </div>
            <div className="Portfolios">
                <Portfolio title="Prototype Project Portfolio" summary="머임"></Portfolio>
                <Portfolio></Portfolio>
                <Portfolio></Portfolio>
                <Portfolio></Portfolio>
            </div>
            </div>
            <div className="UserPost">자유 게시판 글 목록</div>
        </div>
    )   
}

export default Profile;