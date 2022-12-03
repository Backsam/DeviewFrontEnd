import "./ApplyWrite.css"
import { useEffect, useState } from "react";
import Portfolio from "../../Component/Portfolio";
import SimplePortfolio from "../../Component/Portfolio/SimplePortfolio";
import Modal from "../../Component/Modal/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { call } from "../../Hook/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function ApplyWrite(props) {

    const location = useLocation();
    const wjId = location.state.wjId;
    const wjTitle = location.state.wjTitle;
    const questions = [location.state.question0, location.state.question1, location.state.question2]

    const notNullQuestions = questions.filter(function (item) {
        return item != null;
    })

    const [apply, setApply] = useState({
        wjId: wjId,
        part: '',
        career: '',
        pfIds: '',
        education: ''
    })

    const getValue = e => {
        const { name, value } = e.target;
        setApply({
            ...apply,
            [name]: value
        })
        console.log(apply);
    };

    //인포 모달 함수
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);

    const openModal = () => {
        if (data.length === 0) {
            call("/portfolio/list/apply", 'GET', null)
                .then((response) => {
                    console.log(response)
                    setData(response.content)
                }
                ).catch((erorr) =>
                    console.log(erorr)
                )
        }
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "unset"
    };

    const showCount = 3;
    const settings = {
        dots: false,
        infinite: data.length > showCount,
        speed: 500,
        slidesToShow: showCount,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "20px",
        nextArrow: (
            <Div>
                <img src={process.env.PUBLIC_URL + "/img/caret-right-fill.svg"}></img>
            </Div>
        ),
        prevArrow: (
            <DivPre>
                <img src={process.env.PUBLIC_URL + "/img/caret-left-fill.svg"}></img>
            </DivPre>
        ),

    };

    const [portfolio, setPortfolio] = useState([]);
    const [portfolioTitle , setPortfolioTitle] = useState([]);
    const [pfCount, setPfCount] = useState(0);
    const maxPfCount = 3;

    const selectPortfolio = (pfId, pfTitle) => {
        if (pfCount < maxPfCount) {
            const tempArray = [...portfolio, pfId];
            setPortfolio(tempArray);
            setPortfolioTitle([...portfolioTitle, pfTitle])
            setPfCount(pfCount + 1)
            closeModal();
        } else {
            closeModal();
            alert("포트폴리오는 최대 3개만 등록 가능합니다.")
        }
    }

    useEffect(() => {
        setApply({
            ...apply,
            pfIds: portfolio
        })
    }, [portfolio])

    const navi = useNavigate();
    const submit = () => {
        console.log(apply)
        call("/apply/write", "POST", apply)
            .then((response) => {
                console.log(response)
                navi(`/wanted/job/apply/view/${response.id}`)
            })
            .catch((error) =>
                console.log(error))
    }


    return (
        <div className="applyWriteContainer">
            <h2>{wjTitle}</h2>

            <div className="applyInfoInput">
                <table>
                    <tbody>
                        <tr>
                            <td>분야</td>
                            <td><input type="text" name="part" placeholder="지원분야를 입력해주세요" onChange={getValue} /></td>
                        </tr>
                        <tr>
                            <td>경력</td>
                            <td><input type="text" name="career" placeholder="경력을 입력해주세요" onChange={getValue} /></td>
                        </tr>
                        <tr>
                            <td>학력</td>
                            <td><input type="text" name="education" placeholder="학력을 입력해주세요" onChange={getValue} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="introduceMySelf">
                <h2>Introduce</h2>
                {
                    notNullQuestions?.map((q, idx) => (
                        <article key={idx}>
                            <p style={{paddingBottom : "7px"}}> {q}</p>
                            <textarea
                                type="text"
                                id={"answer" + idx}
                                name={"answer" + idx}
                                placeholder="원하시는 자기소개서 항목을 입력해주세요"
                                onChange={getValue}
                            />
                        </article>
                    ))
                }
            </div>
            <hr></hr>
            <div className="myPortfolio">
                <h2>myPortfolio</h2>
                <button onClick={openModal}>등록하기</button>
                <div className="myPortfolioList">
                    {
                        portfolio.map((pf, idx) => (
                            <SimplePortfolio title={portfolioTitle[idx]} pfId={pf}></SimplePortfolio>
                        ))
                    }
                </div>
            </div>

            <div className="btnDiv">
                <button className="btnSubmit" onClick={submit}>제출하기</button>
            </div>



            <Modal open={modalOpen} close={closeModal} header="DevInfo Form" width="1200px">
                <StyledSlider {...settings}>
                    {
                        data.empty == true ?
                            <>
                                <p>등록된 포트폴리오가 없습니다.</p>
                            </>
                            :

                            data.map((pf, idx) => (
                                <button Key={idx} onClick={() => selectPortfolio(pf.pfId, pf.title)}>
                                    <Portfolio boardType="Portfolio"
                                        data={pf}
                                        viewId={pf.pfId}
                                        title={pf.title}
                                        summary={pf.summary}
                                        tags={pf.tags}
                                        userId={pf.userId}
                                        like={pf.like}
                                        view={pf.view}
                                        likes={pf.likes}
                                        createDate={pf.createDate}></Portfolio>
                                </button>
                            ))
                    }
                </StyledSlider>
            </Modal>
        </div>
    )
}

const StyledSlider = styled(Slider)`
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;
const Div = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    transform: translate(-0%, -50%);
    top : 40%;
    right : 3%;
    z-index: 99;
    text-align: left;
    line-height: 30px;
    
    img{
        width : 100px;
        height : 100px;
    }
`;
const DivPre = styled.div`


  position: absolute;
  transform: translate(-0%, -50%);
  top : 40%;
  left : -2%;
  z-index: 99;
  text-align: left;
  line-height: 30px;

  img{
    width : 100px;
    height : 100px;
}
`;

export default ApplyWrite;