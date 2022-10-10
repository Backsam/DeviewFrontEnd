import { useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../Modal/Modal';
import Tag from '../Tag';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio';

function DevCard(props) {

    
    //인포 모달 함수
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
        <CardWrapper width={props.width} height={props.height} onClick={openModal}>
            <ImgWrapper>
                <img src={process.env.PUBLIC_URL + `${props.img}`} alt=""></img>
            </ImgWrapper>
            <h5>Dev</h5>
            <Summary>
                <span>Hello World, I intoduce mySelf, My name is hong kill dong, I am a student at Inha Technical College.</span>
            </Summary>
            <DevTags>
                <Tag content="React" fontSize="12px"/>
                <Tag content="Spring boot" fontSize="12px"/>
                <Tag content="Java" fontSize="12px"/>
                <Tag content="JavaScript"fontSize="12px" />
                <Tag content="Styled-component"fontSize="12px" />
                <span>+2</span>
            </DevTags>
            <Other>
                <span>portfolio 100</span>
                <span>Total like 100</span>
                <span>Total view 100</span>
            </Other>
        </CardWrapper>

        <Modal open={modalOpen} close={closeModal} header="DevInfo Form" width="1000px">
            <div className="AutorInfo">
                <div className="AutorImgWrapper">
                    <img src={process.env.PUBLIC_URL + "/img/letsPlay-icon.png"} alt=""></img>
                </div>
                <div className="AutorProfile">
                    <h5>작성자</h5>
                    <span>포트폴리오 8</span>
                    <span>총 좋아요 8</span>
                    <span>총 조회수 8</span>
                    <div className="AutorLinks">
                        <button><img src={process.env.PUBLIC_URL + "/img/github-icon.png"} alt=""></img></button>
                        <button><img src={process.env.PUBLIC_URL + "/img/blog-icon.png"} alt=""></img></button>
                    </div>
                </div>
            </div>
            <div className="folioContainer">
                <Link to= "/testView"><Portfolio title="PDF를 업로드한 포트폴리오" summary="내용"></Portfolio></Link>
                <Link to= "/testView"><Portfolio title="PDF를 업로드한 포트폴리오" summary="내용"></Portfolio></Link>
                <Link to= "/testView"><Portfolio title="PDF를 업로드한 포트폴리오" summary="내용"></Portfolio></Link>
            </div>
            

         </Modal>
        </>
    )
}


export default DevCard;

const CardWrapper = styled.div`
    width: ${(props) => props.width || "350px"};
    height: ${(props) => props.height || "400px"};
    text-align: center;
    overflow : hidden;
    border : 1px  solid black;
    position: relative;
    margin : 2px 5px 15px 5px;
    padding : 10px 5px 2px 5px;
    cursor: pointer;

    box-shadow: 12px 12px 2px 1px rgba(0, 0, 0, 0.1);

    p{
        margin: 0;
    }
`;

const ImgWrapper = styled.article`
    width : 125px;
    height : 125px;
    margin : 0 auto;

    background-color : #999;
    position: relative;
    border-radius : 50%;


    img{
        width : 125px;
        height : 125px;
        position: absolute;
        top : 0;
        bottom 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius : 50%;
    }
`;

const Summary = styled.div`
    width : 100%;
    height : 120px;
    overflow : hidden;
    text-align : left;

`;

const DevTags = styled.div`
    width : 100%;
    margin-top: 5px;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
`;

const Other = styled.div`
    position: absolute;
    bottom: 2px;
    width : 100%;
    font-size: 12px;
    display:flex;
    justify-content: right;
    padding-top  : 20px;
    padding-right : 12px;
    
    span:not(:last-child){
        margin-right: 12px;
        padding-right: 12px;
        text-align: center;
        border-right: 1px solid #888;
      }
`;