import styled, { css } from 'styled-components';

function SimplePortfolio(props) {

    const onErrorImg = (e) => {
        e.target.src = process.env.PUBLIC_URL + "/img/non-image.png";
    }

    return (
        <CardWrapper width={props.width} height={props.height}>
            <ImgWrapper  width={props.width} height={props.height}>
                <img src={`http://localhost:8080/file/image/Portfolio${props.pfId}_thumbnail`} alt="non-image" onError={onErrorImg}></img>
            </ImgWrapper>
            <Text>{props.title}</Text>
        </CardWrapper>
    )
}


export default SimplePortfolio;

const CardWrapper = styled.div`
    width: ${(props) => props.width || "250px"};
    height: ${(props) => props.height || "170px"};
    text-align: center;
    position : relative;

    p{
        position : absolute;
        bottom : 0;
        right : 0;
        margin: 0;
    }
`;

const ImgWrapper = styled.article`
    width : 100%;
    height : 100%;
    margin : 0 auto;

    background-color : #999;
    position: relative;


    img{
        width : 100%;
        height : 100%;
        position: absolute;
        top : 0;
        bottom 0;
        left: 0;
        right: 0;
        margin: auto;
    }
`;

const Text = styled.p`
    color : white;
    font-size : 18px;
    font-waight : bold;
    text-shadow: -1.5px 0px black, 0px 1.5px black, 1.5px 0px black, 0px -1.5px black;
`;