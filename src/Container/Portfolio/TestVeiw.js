import "./PortfolioView.css"
import Tag from "../../Component/Tag.js";
import Comment from "../../Component/Comment.js";
import PdfViewer from "../../Component/PdfViewer/PdfViewer";
import MessageMoadalbtn from "../../Component/Message/MessageModalBtn";

function PortfolioView(props) {

    return (
        <div className="ContentContainer">
            <h2>ProtoType Project Portfolio</h2>
            <div className="tagWrapper">
                <Tag content="React" />
                <Tag content="Spring boot" />
                <Tag content="Java" />
                <Tag content="JavaScript" />
                <Tag content="MySQL" />
                <Tag content="JPA" />
                <Tag content="React" />
                <Tag content="Spring boot" />
                <Tag content="Java" />
                <Tag content="JavaScript" />
                <Tag content="MySQL" />
                <Tag content="JPA" />
                <Tag content="React" />
                <Tag content="Spring boot" />
                <Tag content="Java" />
                <Tag content="JavaScript" />
                <Tag content="MySQL" />
                <Tag content="JPA" />
            </div>
            <div className="ContentInfo">
                <span className="autor">Hong Kill Dong</span>
                <span className="date">2022.09.28</span>
                <span className="view">view 123456789</span>
                <span className="view">like 123456789</span>
            </div>

            <div className="Content">
                포트폴리오 PDF Viewer Test 입니다.
            </div>


            <div className="PdfWrapper">
                <PdfViewer></PdfViewer>
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
                    <ul style={{paddingLeft : 0}}>
                        <li><Comment/></li>
                        <li><Comment/></li>
                        <li><Comment/></li>
                        <li><Comment/></li>
                        <li><Comment/></li>
                        <li><Comment/></li>
                    </ul>
                 </div>
            </div>

            <div className="floatingBtns">
                <div>
                   <MessageMoadalbtn></MessageMoadalbtn>
                </div>
                <div>
                    <button><img src={process.env.PUBLIC_URL + "/img/Heart-icon.png"}></img></button>           
                </div>
            </div>

        </div>
    )
}

export default PortfolioView;

