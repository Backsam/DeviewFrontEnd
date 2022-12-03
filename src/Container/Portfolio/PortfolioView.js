import "./PortfolioView.css"
import Tag from "../../Component/Tag.js";
import Comment from "../../Component/Comment.js";
import MessageMoadalbtn from "../../Component/Message/MessageModalBtn";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { call, getUserId } from "../../Hook/ApiService";
import Paser from "html-react-parser"
import PdfViewer from "../../Component/PdfViewer/PdfViewer";
import Dialog from "../../Component/Message/Dialog";

function PortfolioView(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dialog, setDialog] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [alreadyHeart, setAlreadyHeart] = useState(false);
    const [commentData, setCommentData] = useState([]);

    let { pfid } = useParams();
    const navi = useNavigate();

    useEffect(() => {
        call(`/portfolio/${pfid}`, "GET", null)
            .then((response) => {
                setData(response)
                setIsLoading(false);
                console.log(data)

                call(`/comment/list/${pfid}`, "GET", null)
                    .then((response) => {
                        setCommentData(response.content)
                        console.log(commentData)
                    }).catch((error) => console.log(error))
            }).catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        setHeartCount(data.likes)
        setAlreadyHeart(data.alreadyLike)
    }, [data])

    const viewType = {
        "DOCUMENT": <View content={data.content} />,
        "PDF": <PdfViewer api="/newfile/pdf/" viewId={data.pfId} />
    }

    const tagView = (tags) => {
        if (tags != null) {
            return (
                data.tags.split(",").map((tag, idx) => (
                    <Tag content={tag} />
                ))
            )
        }
    }

    const modifyPortfolio = () => {
        console.log("수정")
        navi(`/portfolio/modify/${pfid}`)
    }

    const deleteConfirm = () => {
        console.log("삭제")
        call("/portfolio", "DELETE", { pfId: data.pfId })
            .then(() => {
                alert(data.title + " 포트폴리오가 삭제 되었습니다.")
                navi('/')
            }
            )
        setDialog(false)
    }

    const deleteCancle = () => {
        setDialog(false)
    }

    const clickHeart = e => {

        if (getUserId() == null) {
            alert("로그인이 필요합니다.")
        } else {
            if (alreadyHeart) {
                call("/portfolio/likes", "DELETE", {
                    pfId: data.pfId,
                    userId: getUserId()
                })
                    .then((response) => {
                        setHeartCount(heartCount - 1)
                    })
            } else {
                call("/portfolio/likes", "POST", {
                    pfId: data.pfId,
                    userId: getUserId()
                })
                    .then((response) => {
                        setHeartCount(heartCount + 1)
                    })
            }
            setAlreadyHeart(!alreadyHeart)
        }
    }
    const commentInput = useRef();

    const submitComment = () => {
        const content = commentInput.current;

        if (content.value == null || content.value == "" || content.value == undefined) {
            alert("코멘트 내용을 입력해 주세요.")
        } else {
            call(`/comment/write/${pfid}`, "POST", { "content": content.value })
                .then((response) => {
                    setCommentData((commentData) => commentData.concat(response))
                    content.value = '';
                })
        }
    }

    const needLogin = () => {
        alert("로그인한 사용자만 코멘트를 작성할 수 있습니다.");
    }

    const deleteComment = (commentId) => {
        call(`/comment/delete/${pfid}/${commentId}`, "DELETE", null)
            .then(() => {
                setCommentData(commentData.filter(comment => comment.id !== commentId))
            })
    }

    return (
        <div className="ContentContainer">
            {isLoading ? <h1> 로딩중.... </h1> : <>
                <h2>{data.title}</h2>
                <div className="tagWrapper">
                    {
                        tagView(data.tags)
                    }
                </div>
                <div className="ContentInfo">
                    <span className="autor">{data.userId}</span>
                    <span className="date">{data.modifiedDate.substring(0, 10)}</span>
                    <span className="view">view {data.view}</span>
                    <span className="view">like {data.likes}</span>
                    <div className="ModifyAndDeleteBtn">
                        {
                            data.userId === getUserId() ?
                                <>
                                    <button onClick={modifyPortfolio}>수정</button>
                                    <button onClick={() => setDialog(true)}>삭제</button>
                                    <Dialog
                                        title="포트폴리오삭제"
                                        confirmText={"확인"}
                                        cancelText={"취소"}
                                        onConfirm={deleteConfirm}
                                        onCancel={deleteCancle}
                                        open={dialog}
                                    >
                                        포트폴리오를 정말 삭제할까요?
                                    </Dialog>
                                </> : null

                        }

                    </div>
                </div>

                <div className="summary">
                    {
                        data.summary
                    }
                </div>
                <div className="Content">
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
                        <h5>{data.userId}</h5>
                        <div className="AutorLinks">
                            <button><img src={process.env.PUBLIC_URL + "/img/github-icon.png"} alt=""></img></button>
                            <button><img src={process.env.PUBLIC_URL + "/img/blog-icon.png"} alt=""></img></button>
                        </div>
                    </div>
                </div>



                <hr></hr>
                <div className="commentContainer">
                    <h2>Comment</h2>
                    <div className="Comments">

                        {
                            commentData ?
                                <ul style={{ paddingLeft: 0 }}>
                                    {
                                        commentData.map((comment, idx) => (
                                            <li key={idx} style={{ position: "relative" }}>
                                                <Comment
                                                    userId={comment.userId}
                                                    content={comment.content}
                                                    createDate={comment.createDate} />
                                                {comment.written ?
                                                    <div style={{ position: "absolute", bottom: 0, right: 10, textAlign: "right" }}>
                                                        <button onClick={() => deleteComment(comment.id)}>삭제</button>
                                                    </div>
                                                    : <></>
                                                }
                                            </li>

                                        ))
                                    }
                                </ul>
                                : <p>댓글이 없습니다.</p>
                        }

                    </div>
                    <div className="inputDiv">
                        <textarea
                            className="inputComment"
                            placeholder="코멘트를 남겨주세요"
                            ref={commentInput}
                            onClick={getUserId() == null ? needLogin : null}
                        >
                        </textarea>
                        <div className="btnDiv">
                            <button className="btnSubmit" type="button" onClick={submitComment}>등록</button>
                        </div>
                    </div>
                </div>

                <div className="floatingBtns">
                    <div>
                        <MessageMoadalbtn></MessageMoadalbtn>
                    </div>
                    <div>
                        <button onClick={clickHeart}>
                            {
                                alreadyHeart ?
                                    <img src={process.env.PUBLIC_URL + "/img/Heart-icon.png"}></img>
                                    : <img src={process.env.PUBLIC_URL + "/img/BlackHeart-icon.png"}></img>
                            }

                        </button>
                        <p>{heartCount}</p>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default PortfolioView;


function View(props) {
    return (
        <>
            {Paser(props.content)}
        </>
    )
}

