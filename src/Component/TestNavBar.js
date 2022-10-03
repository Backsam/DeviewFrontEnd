import Dropdown from "./Dropdown";
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal.js"
import "./TestNavBar.css";


function TestNavBar() {


    const [searchKeyword, setSearchKeyword] = useState();
    const [userMenuVisibility, setUserMenuVisibility] = useState(false);

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
        if (searchKeyword == "") {
            navigate(`/search`)
            setUserMenuVisibility(false)
            setSearchKeyword("")
        } else {
            navigate(`/search/?query=${searchKeyword}`)
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
    return (


        <>
            <nav className="Navbar">
                <h2>Protofolio</h2>
                <div className="NavMenus">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/wanted">Wanted</NavLink>
                        </li>

                        <li>
                            <NavLink to="/Community">Community</NavLink>
                        </li>
                    </ul>
                </div>


                <div ref={dd} className="NavUsersInfo">
                    <button ref={dd} onClick={e => setUserMenuVisibility(!userMenuVisibility)}>
                        <img src="img/letsPlay-icon.png"></img>
                    </button>
                    <Dropdown visivility={userMenuVisibility} userMenu>
                        <ul>
                            <div>작성자</div>
                            <Link to="/profile"><li>내 프로필</li></Link>
                            <Link to="/WritePortfolio"><li>포트폴리오 작성</li></Link>
                            <Link to="/Message"><li>쪽지함</li></Link>
                            <Link to="/logout"><li>로그아웃</li></Link>
                        </ul>
                    </Dropdown>
                </div>

                <div className="test">
                    <button onClick={openModal}>로그인</button>
                </div>

                <div className="NavSearchWrapper">
                    <img src="img/search.svg"></img>
                    <input
                        type="text"
                        id="NavSearch"
                        placeholder="Search"
                        value={searchKeyword}
                        onChange={e => setSearchKeyword(e.target.value)}
                        onKeyDown={handleOnKeyPress}
                    ></input>
                    <button className="NavSearchBtn" onClick={handleOnClick}>Search</button>
                </div>

            <>
            <Modal open={modalOpen} close={closeModal} header="Login Form">
                id : <input type="text"></input><p> </p>
                pw : <input type="password"></input>
            </Modal>
            </>
            </nav>
        </>
    )
}

export default TestNavBar;