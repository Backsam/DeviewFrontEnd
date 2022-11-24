import "./ViewWantedJob.css"
import Tag from "../../Component/Tag.js";
import ListApplyModal from "../../Component/ListApply/ListApplyModal";
import PdfViewer from "../../Component/PdfViewer/PdfViewer";
import Paser from "html-react-parser"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { call, getRole } from "../../Hook/ApiService";
import userEvent from "@testing-library/user-event";


function ViewWantedJob(props) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let { wjid } = useParams();

    useEffect(() => {
        call(`/wanted/job/${wjid}`, "GET", null)
            .then((response) => {
                setData(response)
                setIsLoading(false);
                console.log(data)
            }).catch((error) => console.log(error))
    }, [])

    const viewType = {
        "DOCUMENT": <View content={data.content} />,
        "PDF": <PdfViewer api="/file/wanted/job/pdf/read/" viewId={data.wjId} />
    }

    const Role = getRole();



    return (
        <div className="ContentContainer">
            {isLoading ? <h1> 로딩중... </h1> : <>
                <h2>{data.title}</h2>
                <div className="tagWrapper">
                    {
                        data.tags?.split(",").map((tag, idx) => (
                            <Tag content={tag} />
                        ))
                    }
                </div>
                <div className="ContentInfo">
                    <span className="autor">{data.userId}</span>
                    <span className="date">{data.modifiedDate.substring(0, 10)}</span>
                    <span className="view">view {data.view}</span>
                </div>
                <div className="ConditionInfoWrapper">
                    <div className="recruitmentConditionWrapper">
                        <table>
                            <thead>
                                <th colSpan={3}>모집 조건</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>모집인원</td>
                                    <td>{data.personnel}</td>
                                </tr>
                                <tr>
                                    <td>분야</td>
                                    <td>{data.part}</td>
                                </tr>
                                <tr>
                                    <td>연령</td>
                                    <td>{data.education}</td>
                                </tr>
                                <tr>
                                    <td>학력/경력</td>
                                    <td>{data.career}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="workConditionWrapper">
                        <table>
                            <thead>
                                <th colSpan={3}>근무 조건</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>급여</td>
                                    <td>{data.pay}</td>
                                </tr>
                                <tr>
                                    <td>근무시간</td>
                                    <td>{data.workingTime}</td>
                                </tr>
                                <tr>
                                    <td>고용형태</td>
                                    <td>{data.employmentType}</td>
                                </tr>
                                <tr>
                                    <td>근무지역</td>
                                    <td>{data.area}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="Content">
                    <h1>상세 모집정보 </h1>
                    {
                        viewType[data.type]
                    }
                </div>
                <hr></hr>

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

                <div className="floatingBtns">

                    {data.written ?
                        <div>
                            <Link to={`/wanted/job/apply/list/${data.wjId}`}>
                                <img src={process.env.PUBLIC_URL + "/img/Heart-icon.png"}></img>
                            </Link>
                        </div>
                        : (
                            Role === "DEVELOPER" ?
                                <div>
                                    <Link to="/wanted/job/apply/write"
                                        state={{
                                            wjId: data.wjId,
                                            wjTitle: data.title,
                                            question0: data.question0,
                                            question1: data.question1,
                                            question2: data.question2
                                        }}>
                                        <img src={process.env.PUBLIC_URL + "/img/file-earmark-text-fill.svg"}></img>
                                    </Link>
                                </div>
                                :
                                <></>
                        )
                    }

                </div>
            </>}
        </div>
    )
}

export default ViewWantedJob;

function View(props) {
    return (
        <>
            {Paser(props.content)}
        </>
    )
}
