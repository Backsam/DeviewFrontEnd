import React, { useEffect, useRef, useState } from "react";
import "./Main.css"
import Portfolio from "../../Component/Portfolio.js";
import { Link } from 'react-router-dom';
import axios from "axios";
import { call } from "../../Hook/ApiService";
import { pdfjs } from "react-pdf";



function Main() {

    const [num, setNum] = useState(0);                              //카테고리 상태 useState
    const [data, setData] = useState([]);     //
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/portfolio/list`)
    //         .then((response) => {
    //             console.log(response)
    //             setData(response.data.content);
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    useEffect(() => {
        call("/portfolio/list", "GET", null)
            .then((response) => {
                setData(response.content)
                setIsLoading(false)
            })
            .catch((error) => console.log(error))
    }, []);
    console.log(data);

    const CarouselRef = useRef();                                   //Carousel DOM을 접근하기 위함
    const [CarouselWidth, setCarouselWidth] = useState(0);
    const [CarouselIdx, setCarouselIdx] = useState(null);
    const [CarouselCount, setCarouselCount] = useState(0);
    const CarouselImgWidth = 360;
    const CarouselImgMargin = 30;




    //첫 렌더링(페이지 방문)시 Carosel 크기 지정
    useEffect(() => {
        const count = CarouselRef.current.childNodes.length;
        CarouselRef.current.style.width = (CarouselImgWidth + CarouselImgMargin) * count + "px";
        setCarouselCount(count);
    }, [CarouselIdx])



    //Carosel 좌우 버튼 누를 시 기능
    function moveCarousel(idx) {
        console.log("moveCarousel")
        let tempIdx = CarouselIdx + idx;
        console.log(tempIdx);

        if (tempIdx < 0) {
            tempIdx = CarouselCount - 1;
            console.log(tempIdx);
        } else if (tempIdx >= CarouselCount) {
            tempIdx = 0;
            console.log(tempIdx);
        }
        setCarouselIdx(tempIdx);
    }

    //Carosel 버튼 누른 후 재 렌더링
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            CarouselRef.current.style.transition = "all 0.5s ease-in-out"
            var mv = CarouselRef.current.style.left = -CarouselIdx * (CarouselImgWidth + CarouselImgMargin) + "px";
            console.log("move" + mv);
        }
    }, [CarouselIdx])


    /*좋아요 순 정렬 handler*/
    function likeSort() {
        var newArray = [...data]
        newArray.sort((a, b) => b.like - a.like);
        setData(newArray);
        setNum(0);
    }

    /*조회순 정렬 handler*/
    function viewSort() {
        var newArray = [...data]
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
                <button className="CarouselPrev" type="button" onClick={() => { moveCarousel(-1) }}>{'<'}</button>
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
                <button className="CarouselNext" type="button" onClick={() => { moveCarousel(1) }}>{'>'}</button>
            </div>






            <div className="LabelWrapper">
                <hr></hr>
                <label>Portfolios</label>
            </div>
            <div className="orderContainer">
                <div className="orderList">
                    <ul>
                        <li><button className={num === 0 ? "is-active" : ""} type="button" onClick={likeSort}>Like</button></li>
                        <li><button className={num === 1 ? "is-active" : ""} type="button" onClick={viewSort}>View</button></li>
                        <li><button className={num === 2 ? "is-active" : ""} type="button">New</button></li>
                        <li><button className={num === 2 ? "is-active" : ""} type="button">구직</button></li>
                    </ul>
                </div>
            </div>
            {
                isLoading ? <h1> 로딩중 </h1>:
                <div className="folioContainer">
                    <Link to="/testView"><Portfolio title="PDF를 업로드한 포트폴리오" summary="내용"></Portfolio></Link>
                    {
                        data.map((pf, idx) => (
                            <Link to={`portfolio/${pf.pfId}`} style={{ color: "black", textDecoration: "none" }}>
                                <Portfolio title={pf.title} summary={pf.summary} tags={pf.tags} userId={pf.userId} like={pf.like} view={pf.view}img=""></Portfolio>
                            </Link>
                        ))
                    }
                </div>
            }

        </div>
    );
}

export default Main;
