import "./Tag.css"
import styled from "styled-components";



function Tag(props) {

    return (
        <TagWrap className="tag" fontSize={props.fontSize}>
            <span>{props.content}</span>
        </TagWrap>
    )
}

export default Tag;


const TagWrap = styled.div`
    font-size : ${(props) => props.fontSize || "15px"};
`;