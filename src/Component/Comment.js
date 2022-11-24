import "./Comment.css"

function Comment(props){

    var originCreateDate =  props.createDate + "";
    var createDate = originCreateDate.substring(0, 10) +"  "+originCreateDate.substring(11, 19);

    return(
        <div className="CommentWarpper" style={{width:"100%", minHeight:"100px"}}>
            <div className="CommentAutor">{props.userId}
            </div>
            <div className="CommentDetail">{props.content}</div>
            <div className="CommentInfo">
                <span className="CommentDate">{createDate}</span>
            </div>
        </div>
    )
}

export default Comment;