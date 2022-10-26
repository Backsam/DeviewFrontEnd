import { useState } from "react";
import LoginForm from "../../Component/LoginForm/LoginForm";
import Modal from "../../Component/Modal/Modal";
import SignUpForm from "../../Component/LoginForm/SignUpForm";
import "./NotFound.css";

function NotFound(props) {
    const [modalOpen, setModalOpen] = useState(true);
    const [modalTapStatus, setModalStatus] = useState(0);

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
            <div className="NotFoundText">
                404
                NotFound
            </div>
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


    )
}

export default NotFound;