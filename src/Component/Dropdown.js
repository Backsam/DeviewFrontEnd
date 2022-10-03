import "./Dropdown.css"
import styled, { css } from 'styled-components';

function Dropdown(props){

    return (
        <Article className="DropdownComponent" top={props.top} left={props.left} bottom ={props.bottom} right={props.right} userMenu = {props.userMenu}>
            { props.visivility && props.children }
        </Article>
        
    )

    
};

export default Dropdown;

const Article = styled.article`
    top : ${(props) =>props.top};
    left : ${(props) => props.left};
    bottom : ${(props) => props.bottom};
    right : ${(props) => props.right};

    ${(props) => props.userMenu && css`

    ul {
        &:first-child{
            width: 200px;
            max-height: none;
            top : 40px;
            right : 30px;
            overflow-y: auto;

            li{
                padding-top : 10px;
                padding-bottom : 10px;
                padding-left : 5px;

                &:hover{
                    background-color : lightgray;
                }
            }
        }
    }

    
    `};
`;
