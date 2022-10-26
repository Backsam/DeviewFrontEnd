import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";



function SelectWriteType(){
    return(
        <SelectWriteTypeContainer>
       <Link to ="/WritePortfolioPdf"><SelectMenu>Pdf</SelectMenu></Link>
            <Link to ="/WritePortfolio"><SelectMenu>document</SelectMenu></Link>
        </SelectWriteTypeContainer>
    )
}
    
export default SelectWriteType;

const SelectWriteTypeContainer = styled.div`
    width : 1200px;
    height : 800px;
    margin : 0 auto;

    display : flex;
    justify-content : center;
    align-items: center;
    gap : 70px;
`;

const SelectMenu = styled.button`
    width : 200px;
    height : 200px;
    background-color : white;
    color : black;
    border : 2px solid black;
`;