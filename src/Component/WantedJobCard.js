import { useState } from "react";
import "./Portfolio.css"
import Tag from "./Tag";


function WantedJobCard(props) {

    const onErrorImg = (e) => {
        e.target.src = process.env.PUBLIC_URL + "/img/non-image.png";
    }

    var originCreateDate =  props.createDate + "";
    var CreateDate = originCreateDate.substring(0, 10);
    

    
    return (
        <div className="portfolio_container">
            <div className="thumnail-box">
                <img className="thumnail"  src={`http://localhost:8080/wantedjobfile/thumbnail/${props.viewId}`} alt="non-image" onError={onErrorImg}></img>
            </div>
            <div className="content-box">
                <div className="portfolio_title">
                    {props.title}
                </div>
                <div className="portfolio_summary">
                    <p>{props.summary}</p>
                </div>
                <div className="Tags">
                {
                    props.tags?.split(",").map((tag, idx)=>(
                        <Tag content={tag}/>
                    ))
                }
                </div>
            </div>
            <div className="footer-box">
                <span>{props.userId}</span>
                <span>Like {props.likes}</span>
                <span>View {props.view}</span>
                <span>{CreateDate}</span>
            </div>
        </div> 
    )
}

export default WantedJobCard;

