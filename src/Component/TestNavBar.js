import Dropdown from "./Dropdown";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal.js"
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./LoginForm/SignUpForm";
import "./TestNavBar.css";
import axios from "axios";
import { getUserId, signout } from "../Hook/ApiService";


function TestNavBar() {


    const [searchKeyword, setSearchKeyword] = useState();
    const [userMenuVisibility, setUserMenuVisibility] = useState(false);
    const [modalTapStatus, setModalStatus] = useState(0);
    const [userStatus, setUserStatus] = useState(false);

    //페이지 이동을 위한 변수선언
    let navigate = useNavigate();

    //유저 메뉴 드롭다운 참조
    const dd = useRef();

    //url 변경감지
    const location = useLocation();
    useEffect(() => {
        setSearchKeyword(``);
        setUserMenuVisibility(false)
    }, [location])

    //드롭다운 외부영역 클릭감지
    useEffect(() => {
        const onClick = (e) => {
            if (dd.current !== null && !dd.current.contains(e.target)) {
                setUserMenuVisibility(!userMenuVisibility);
            }
        };

        if (userMenuVisibility) {
            window.addEventListener("click", onClick);
        }

    }, [userMenuVisibility, dd]);


    //Search 버튼을 눌렀을 경우 발생하는 이벤트 
    function handleOnClick(e) {
        if (searchKeyword === "") {
            navigate(`/search`)
            setUserMenuVisibility(false)
            setSearchKeyword("")
        } else {
            navigate(`/search/?type=0&keyword=${searchKeyword}&tags=`)
            setUserMenuVisibility(false)
            setSearchKeyword("")
        }
    }

    //검색창에서 엔터를 누를경우 이벤트
    function handleOnKeyPress(e) {
        if (e.key === 'Enter') {
            handleOnClick();
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("ACCESS_TOKEN") && sessionStorage.getItem("ACCESS_TOKEN") !== null) {
            setUserStatus(true);
        } else {
            setUserStatus(false);
        }
    }, [userStatus])



    //로그인 모달 함수
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "unset"
    };

    const modalTapList = {
        0: <LoginForm />,
        1: <SignUpForm />
    };

    function changeForm(num) {
        setModalStatus(num);
    }



    return (
        <>
            <nav className="Navbar">
                <div className="logoWrapper">
                    <h2>DeView</h2>
                </div>
                <div className="NavMenus">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/wanted/job">Wanted</NavLink>
                        </li>

                        {/* <li>
                            <NavLink to="/Community">Community</NavLink>
                        </li> */}
                    </ul>
                </div>


                <div ref={dd} className="NavUsersInfo">
                    {
                        userStatus ? <> <button ref={dd} onClick={e => setUserMenuVisibility(!userMenuVisibility)}>
                            <img src={process.env.PUBLIC_URL + '/img/letsPlay-icon.png'} alt="userIcon"></img>
                        </button>
                            <Dropdown visivility={userMenuVisibility} userMenu>
                                <ul>
                                    <div>{getUserId()}</div>
                                    <Link to="/profile"><li>내 프로필</li></Link>
                                    {
                                        sessionStorage.getItem("Role") == "DEVELOPER" ?  
                                        <Link to="/portfolio/write"><li>포트폴리오 작성</li></Link>
                                        :<Link to="/Wanted/job/Write"><li>구인 공고 작성</li></Link>
                                    }
                                   
                                    {/* <Link to="/Message"><li>쪽지함</li></Link> */}
                                    <li> <button onClick={signout}>로그아웃</button></li>
                                </ul>
                            </Dropdown></> :
                            <button className="loginBtn" onClick={openModal}>로그인</button>
                    }
                </div>



                <div className="NavSearchWrapper">
                    <img src={process.env.PUBLIC_URL + '/img/search.svg'} alt=""></img>
                    <input
                        type="text"
                        id="NavSearch"
                        placeholder="Search"
                        value={searchKeyword || ``}
                        onChange={e => setSearchKeyword(e.target.value)}
                        onKeyDown={handleOnKeyPress}
                    ></input>
                    <button className="NavSearchBtn" onClick={handleOnClick}>Search</button>
                </div>

                <>
                    <Modal open={modalOpen} close={closeModal} header="로그인">
                        <div className="orderContainer">
                            <div className="orderList">
                                <ul>
                                    <li><button className={modalTapStatus === 0 ? "is-active" : ""} type="button" onClick={() => changeForm(0)}>로그인</button></li>
                                    <li><button className={modalTapStatus === 1 ? "is-active" : ""} type="button" onClick={() => changeForm(1)}>회원가입</button></li>
                                </ul>
                            </div>
                        </div>
                        {modalTapList[modalTapStatus]}
                    </Modal>
                </>
            </nav>
        </>
    )
}

export default TestNavBar;