import Modal from "../Modal/Modal";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from "styled-components";
import { useState } from "react";
import Tag from "../Tag";
import { Link } from "react-router-dom";

function ListApplyModal(props) {

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
            <button onClick={openModal}><BtnImage src={process.env.PUBLIC_URL + '/img/hand-index-fill.svg'}></BtnImage></button>
            <Modal open={modalOpen} close={closeModal} header="List of Apply">
                <ListGroup as="ul">
                    <Link to="/profile">
                     <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold mb-3">지원자 1</div>
                            <Tag content="React" />
                            <Tag content="Spring" />
                            <Tag content="Java" />
                        </div>
                    </ListGroup.Item></Link>

                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold mb-3">지원자 2</div>
                            <Tag content="React" />
                            <Tag content="Spring" />
                            <Tag content="Java" />
                        </div>
                    </ListGroup.Item><ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold mb-3">지원자 3</div>
                            <Tag content="React" />
                            <Tag content="Spring" />
                            <Tag content="Java" />
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Modal>
        </>
    )
}

export default ListApplyModal;

const BtnImage = styled.img`
`;