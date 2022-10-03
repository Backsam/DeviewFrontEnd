import React, { useEffect, useRef, useState } from "react";
import "./Main.css"
import Portfolio from "../../Component/Portfolio.js";
import {Link} from 'react-router-dom';



function Main() {

    const portfolioData = 
    {
        "title": "portfolio",
        "content": "포트폴리오 목록",
        "portfolios": [
            {"idx" : 1, "portfolioTitle": "프로젝트1 ", "summary": "프로젝트 1에 대한 설명", "writer": "개발자1", "views": 1, "like": 6 },
            {"idx" : 2, "portfolioTitle": "프로젝트2 ", "summary": "프로젝트 2에 대한 설명", "writer": "개발자2", "views": 2, "like": 5 },
            {"idx" : 3, "portfolioTitle": "프로젝트3 ", "summary": "프로젝트 3에 대한 설명", "writer": "개발자3", "views": 3, "like": 4 },
            {"idx" : 4, "portfolioTitle": "프로젝트4 ", "summary": "프로젝트 4에 대한 설명", "writer": "개발자4", "views": 4, "like": 3 },
            {"idx" : 5, "portfolioTitle": "프로젝트5 ", "summary": "프로젝트 5에 대한 설명", "writer": "개발자5", "views": 5, "like": 2 },
            {"idx" : 6, "portfolioTitle": "프로젝트6 ", "summary": "프로젝트 6에 대한 설명", "writer": "개발자6", "views": 6, "like": 1 }
        ]
    }
    const [num, setNum] = useState(0);                              //카테고리 상태 useState
    const [data, setData] = useState(portfolioData.portfolios);     //

    const CarouselRef = useRef();                                   //Carousel DOM을 접근하기 위함
    const [CarouselWidth, setCarouselWidth] = useState(0);
    const [CarouselIdx, setCarouselIdx] = useState(null);
    const [CarouselCount, setCarouselCount] = useState(0);
    const CarouselImgWidth = 360;
    const CarouselImgMargin = 30;




    //첫 렌더링(페이지 방문)시 Carosel 크기 지정
    useEffect(() =>{
        const count = CarouselRef.current.childNodes.length;
        CarouselRef.current.style.width= (CarouselImgWidth + CarouselImgMargin) * count +"px";
        setCarouselCount(count);
    },[CarouselIdx])



    //Carosel 좌우 버튼 누를 시 기능
    function moveCarousel(idx){
        console.log("moveCarousel")
        let tempIdx = CarouselIdx + idx;
        console.log(tempIdx);

        if(tempIdx<0){
            tempIdx = CarouselCount -1;
            console.log(tempIdx);
        }else if(tempIdx >= CarouselCount){
            tempIdx = 0;
            console.log(tempIdx);
        }
        setCarouselIdx(tempIdx);
    }

    //Carosel 버튼 누른 후 재 렌더링
    const mounted = useRef(false);
    useEffect(() =>{
        if(!mounted.current){
            mounted.current = true;
        }else{
            CarouselRef.current.style.transition = "all 0.5s ease-in-out"
            var mv = CarouselRef.current.style.left = -CarouselIdx * (CarouselImgWidth + CarouselImgMargin) +"px";
            console.log("move" + mv);
        }
    }, [CarouselIdx])


    /*좋아요 순 정렬 handler*/
    function likeSort(){
        var newArray =[...data]
        newArray.sort((a, b) => b.like - a.like);
        setData(newArray);
        setNum(0);
    }

     /*조회순 정렬 handler*/
    function viewSort(){
        var newArray =[...data]
        newArray.sort((a, b) => b.views - a.views);
        setData(newArray);
        setNum(1);
    }


    return (
        <div className='MainContainer'>
            <div className="LabelWrapper">
                
            <hr></hr>
                <label>Admin's Pick</label>
            </div>

            <div className="CarouselContainer">
                <button className="CarouselPrev" type="button" onClick={() =>{moveCarousel(-1)}}>{'<'}</button>
                <ul ref={CarouselRef} className="Carousel">
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                    <li><img src="https://via.placeholder.com/360x300" alt=""></img></li>
                </ul>
                <button className="CarouselNext" type="button" onClick={() =>{moveCarousel(1)}}>{'>'}</button>
            </div>






            <div className="LabelWrapper">
                <hr></hr>
                <label>Portfolios</label>
            </div>
            <div className="orderContainer">
                <div className="orderList">
                    <ul>
                        <li><button className={num===0 ? "is-active" : ""} type="button" onClick={likeSort}>Like</button></li>
                        <li><button className={num===1 ? "is-active" : ""} type="button" onClick={viewSort}>View</button></li>
                        <li><button className={num===2 ? "is-active" : ""} type="button">New</button></li>
                        <li><button className={num===2 ? "is-active" : ""} type="button">구직</button></li>
                    </ul>
                </div>
            </div>
            <div className="folioContainer">
                <Portfolio title="제목" summary="내용"></Portfolio>
                {
                    data.map( (pf, idx) => (
                    <Link to ="/portfolioView" style={{ color:"black", textDecoration: "none" }}>
                        <Portfolio title={pf.portfolioTitle} summary={pf.summary}></Portfolio>
                    </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Main;
