import MessageModal from "./MessageMoadal";
import Modal from "../Modal/Modal";
import styled from "styled-components";
import { useState } from "react";
function MessageMoadalbtn(props){

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      setModalOpen(false);
      document.body.style.overflow = "unset"
    };


    return(
        <>
          <button onClick={openModal}><BtnImage src={process.env.PUBLIC_URL + '/img/envelope-plus-fill.svg'}></BtnImage></button>
          <Modal open={modalOpen} close={closeModal} header="Message" width="900px">
                <MessageModal></MessageModal>
            </Modal>
        </>
    )
}

export default MessageMoadalbtn;

const BtnImage = styled.img`
`;