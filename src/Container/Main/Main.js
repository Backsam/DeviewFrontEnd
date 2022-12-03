import React, { useEffect, useRef, useState } from "react";
import "./Main.css"
import Portfolio from "../../Component/Portfolio.js";
import { Link } from 'react-router-dom';
import { call } from "../../Hook/ApiService";
import SimplePorffolio from "../../Component/Portfolio/SimplePortfolio";
import { useInView } from "react-intersection-observer";



function Main() {

    // 데이터 및 페이지 렌더 관련 // 
    const [num, setNum] = useState(0);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [sortBy, setSortBy] = useState("pfId")
    var sort = "desc"
    var size = 6;

    const fetchData = async () => {
        await call(`/portfolio/list?page=${page}&size=${size}&sort=${sortBy},desc`, "GET", null)
            .then((response) => {
                setData((data) => data.concat(response.content))
                setTotalPage((totalPage) => totalPage + response.totalPages);
                setPage((page) => page + 1)
                setHasNextPage(totalPage >= page);

                setIsLoading(false)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchData(sortBy, sort);
    }, [sortBy, sort]);



    // 캐러셀 관련 //

    const CarouselRef = useRef();                                   //Carousel DOM을 접근하기 위함
    const [CarouselWidth, setCarouselWidth] = useState(0);
    const [CarouselData, setCarouselData] = useState([]);
    const [CarouselIdx, setCarouselIdx] = useState(2);
    const [CarouselCount, setCarouselCount] = useState(0);
    const [CaroselLoading, setCarouselLoading] = useState(true);
    const CarouselImgWidth = 360;
    const CarouselImgMargin = 30;

    useEffect(() => {
        call("/portfolio/list/top", "GET", null)
            .then((response) => {
                setCarouselLoading(true);
                const tempArray = [...response];
                tempArray.unshift(response[response.length - 1])
                tempArray.unshift(response[response.length - 2])
                tempArray.push(response[0])
                tempArray.push(response[1])
                setCarouselData(tempArray)
                setCarouselLoading(false);
                console.log("DATA SIZE : " + CarouselData.length);
            })
            .catch((error) => {
                console.log(error)
                setCarouselLoading(true);
            })
    }, [])


    //첫 렌더링(페이지 방문)시 Carosel 크기 지정
    useEffect(() => {
        const count = CarouselData.length;
        CarouselRef.current.style.width = (CarouselImgWidth + CarouselImgMargin) * count + "px";
        setCarouselCount(count);
    }, [CarouselData])



    //Carosel 좌우 버튼 누를 시 기능
    function moveCarousel(idx) {
        let tempIdx = CarouselIdx + idx;
        console.log("temp idx : " + tempIdx)
        setCarouselIdx(tempIdx);
    }

    useEffect(() => {
        if (CarouselIdx == CarouselCount - 3) {
            CarouselRef.current.style.transition = "0s ease-in-out"
            CarouselRef.current.style.left = 0 + "px";
            setCarouselIdx(1);
            console.log("retrun frist");
            console.log("idx : " + CarouselIdx);
        } else if (CarouselIdx < 0) {
            CarouselRef.current.style.transition = "0s ease-in-out"
            CarouselRef.current.style.left = -CarouselCount - 4 * (CarouselImgWidth + CarouselImgMargin) + "px";
            console.log("retrun last");
            console.log("idx : " + CarouselIdx);
            setCarouselIdx(10);
        } else if (CarouselIdx >= 0) {
            CarouselRef.current.style.transition = "0.5s ease-in-out"
            CarouselRef.current.style.left = -CarouselIdx * (CarouselImgWidth + CarouselImgMargin) + "px";
            console.log("count : " + CarouselCount)
        }
    }, [CarouselIdx])

    const changeState = useRef();

    function callback() {
        moveCarousel(1)
    }

    useEffect(() => {
        changeState.current = callback; // callback 함수의 count는 항상 최신 업데이트 값
    })

    useEffect(() => {

        const timer = setInterval(() => {
            changeState.current(); // useRef로 인해 setCount 함수는 항상 최신 count를 가져온다
        }, 5000)

        return () => {
            clearInterval(timer);
        };
    }, []);




    /*생성 순 정렬 handler*/
    function dateSort() {
        setIsLoading(true)
        setPage((page) => 0);
        setData(() => []);
        setSortBy("pfId")
        setNum(0);
    }


    /*조회순 정렬 handler*/
    function viewSort() {
        setIsLoading(true)
        setPage((page) => 0);
        setData(() => []);
        setSortBy("view")
        setNum(1);
    }


    /*좋아요 순 정렬 handler*/
    function likeSort() {
        setIsLoading(true)
        setPage((page) => 0);
        setData(() => []);
        setSortBy("likeCount")
        setNum(2);
    }

    const [ref, inView] = useInView();

    useEffect(() =>{
        if(inView && hasNextPage){
            fetchData()
        }
    },[fetchData, hasNextPage, inView])


    return (
        <div className='MainContainer'>
            <div className="LabelWrapper">

                <hr></hr>
                <label className="CarouselTitle">Hot Deview</label>
            </div>

            <div className="CarouselContainer">

                <button className="CarouselPrev" type="button" onClick={() => { moveCarousel(-1) }}>{'<'}</button>
                <ul ref={CarouselRef} className="Carousel">
                    {
                        CaroselLoading ?
                            <div>  로딩중...</div> :
                            (
                                CarouselData?.map((data, idx) => (
                                    <li key={idx}><Link to={`/portfolio/${data.pfId}`}><SimplePorffolio width="360px" height="300px" title={data.title} pfId={data.pfId} /></Link></li>
                                ))
                            )
                    }

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
                        <li><button className={num === 0 ? "is-active" : ""} type="button" onClick={dateSort}>New</button></li>
                        <li><button className={num === 1 ? "is-active" : ""} type="button" onClick={viewSort}>View</button></li>
                        <li><button className={num === 2 ? "is-active" : ""} type="button" onClick={likeSort}>Like</button></li>
                    </ul>
                </div>
            </div>
            {
                isLoading ? <div style={{ height: "600px" }}></div> :
                    <div className="folioContainer">
                        {
                            data.map((pf, idx) => (
                                <Link to={`portfolio/${pf.pfId}`} style={{ color: "black", textDecoration: "none" }}>
                                    <Portfolio Key={idx} boardType="Portfolio"
                                        data={pf}
                                        viewId={pf.pfId}
                                        title={pf.title}
                                        summary={pf.summary}
                                        tags={pf.tags}
                                        userId={pf.userId}
                                        like={pf.like}
                                        view={pf.view}
                                        likes={pf.likes}
                                        createDate={pf.modifiedDate}
                                    />
                                </Link>
                            ))
                        }
                        <div ref={ref}>
                        </div>
                    </div>
            }

        </div>
    );
}

export default Main;
