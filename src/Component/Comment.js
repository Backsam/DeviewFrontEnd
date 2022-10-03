import "./Comment.css"

function Comment(props){

    return(
        <div className="CommentWarpper" style={{width:"100%", minHeight:"100px"}}>
            <div className="CommentAutor">댓글 작성자</div>
            <div className="CommentDetail">댓글 내용 입니다.</div>
            <div className="CommentInfo">
                <span className="CommentDate">2022-09-28</span>
            </div>
        </div>
    )
}

export default Comment;