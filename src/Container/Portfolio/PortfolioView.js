import "./PortfolioView.css"
import Tag from "../../Component/Tag.js";
import Comment from "../../Component/Comment.js";
import MessageMoadalbtn from "../../Component/Message/MessageModalBtn";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { call } from "../../Hook/ApiService";
import Paser from "html-react-parser"

function PortfolioView(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState();
    let {pfid} = useParams();

    useEffect(() =>{
        call(`/portfolio/${pfid}`, "GET", null)
        .then((response) =>{
            setData(response)
            setIsLoading(false);
            console.log(data)
        }).catch((error) => console.log(error))
    },[])



    return (
        <div className="ContentContainer">
            { isLoading ? <h1> 로딩중... </h1> :<>
            <h2>{data.title}</h2>
            <div className="tagWrapper">
                {
                    data.tags.split(",").map((tag, idx) =>(
                        <Tag content={tag}/>
                    ))
                }
            </div>
            <div className="ContentInfo">
                <span className="autor">Hong Kill Dong</span>
                <span className="date">2022.09.28</span>
                <span className="view">view 123456789</span>
                <span className="view">like 123456789</span>
            </div>
            <div className="summary">
                {
                    data.summary
                }
            </div>
            <div className="Content">
                {
                    Paser(data.content)
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



            <hr></hr>
            <div className="commentContainer">
                <div className="inputDiv">
                    <textarea
                        className="inputComment"
                        placeholder="코멘트를 남겨주세요">
                    </textarea>
                    <div className="btnDiv">
                        <button className="btnSubmit" type="button">등록</button>
                    </div>
                </div>
                <div className="Comments">
                    <ul style={{ paddingLeft: 0 }}>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                    </ul>
                </div>
            </div>

            <div className="floatingBtns">
                <div>
                <MessageMoadalbtn></MessageMoadalbtn>
                </div>
                <div>
                    <button><img src={process.env.PUBLIC_URL + "/img/Heart-icon.png"}></img></button>
                    <p>213123</p>
                </div>
            </div>
            </>}
        </div>
    )
}

export default PortfolioView;

