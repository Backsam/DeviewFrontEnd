import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SimplePortfolio from "../../Component/Portfolio/SimplePortfolio";
import { call } from "../../Hook/ApiService";


function ApplyView(props) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let { apid } = useParams();

    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        call(`/apply/view/${apid}`, "GET", null)
            .then((response) => {
                setData(response)
                setQuestion([response.question0, response.question1, response.question2])
                setAnswer([response.answer0 ,response.answer1,response.answer2,])
                setIsLoading(false)
                console.log(response);
            }).catch((error) => console.log(error))
    }, [])

    return (
        <div className="ContentContainer">
            {
                isLoading ? <></> :
                    <>
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

                        <div className="applyInfoInput">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>분야</td>
                                        <td>{data.part}</td>
                                    </tr>
                                    <tr>
                                        <td>경력</td>
                                        <td>{data.career}</td>
                                    </tr>
                                    <tr>
                                        <td>학력</td>
                                        <td>{data.education}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className="introduceMySelf">
                            <h2>Introduce</h2>
                            {
                                question.map((q, idx) =>(
                                    <article key={idx} style={{minHeight: "100px"}}>
                                    <p>{q}</p>
                                    <span>
                                        {answer[idx]}
                                    </span>
                                </article>
                                ))
                            }
                        </div>

                        <div className="myPortfolio">
                            <h2>myPortfolio</h2>
                            <div className="myPortfolioList">
                                {
                                    data.pfIds.map((pfId, idx) =>(
                                        <Link to={`/portfolio/${pfId}`}>
                                            <SimplePortfolio pfId={pfId} title={data.pfTitles[idx]}/>
                                        </Link> 
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }

        </div>

    )
}

export default ApplyView;