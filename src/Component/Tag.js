import "./Tag.css"



function Tag(props) {

    return (
        <div className="tag">
            <span>{props.content}</span>
        </div>
    )
}

export default Tag;

