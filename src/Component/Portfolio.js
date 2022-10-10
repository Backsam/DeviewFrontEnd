import { useState } from "react";
import "./Portfolio.css"
import Tag from "./Tag";


function Portfolio(props) {

    const onErrorImg = (e) => {
        e.target.src = process.env.PUBLIC_URL + "/img/non-image.png";
    }

    return (
        <div className="portfolio_container">
            <div className="thumnail-box">
                <img className="thumnail"  src={process.env.PUBLIC_URL + `${props.img}`} alt="non-image" onError={onErrorImg}></img>
            </div>
            <div className="content-box">
                <div className="portfolio_title">
                    <h4>{props.title}</h4>
                </div>
                <div className="portfolio_summary">
                    <p>{props.summary}</p>
                </div>
                <div className="Tags">
                    <Tag content="react"  fontSize="12px"/>
                    <Tag content="JavaScript" fontSize="12px"/>
                    <Tag content="Html" fontSize="12px"/>
                    <Tag content="CSS" fontSize="12px"/>
                    
                </div>
            </div>
            <div className="footer-box">
                <p>작성자 좋아요 123 조회수 123</p>
            </div>
        </div> 
    )
}

export default Portfolio;

