import styled, { css } from 'styled-components';

function SimpleDevCard(props) {
    return (
        <CardWrapper width={props.width} height={props.height}>
            <ImgWrapper>
                <img src={process.env.PUBLIC_URL + `${props.img}`}></img>
            </ImgWrapper>
            <p>{props.name}</p>
            <p>{props.field}</p>
        </CardWrapper>
    )
}


export default SimpleDevCard;

const CardWrapper = styled.div`
    width: ${(props) => props.width || "200px"};
    height: ${(props) => props.height || "250px"};
    text-align: center;

    border : 1px solid black;

    p{
        margin: 0;
    }
`;

const ImgWrapper = styled.article`
    width : 150px;
    height : 150px;
    margin : 0 auto;

    background-color : #999;
    position: relative;
    border-radius : 50%;


    img{
        width : 150px;
        height : 150px;
        position: absolute;
        top : 0;
        bottom 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius : 50%;
    }
`;