import "./Portfolio.css"



function Portfolio(props) {

    return (
        <div className="portfolio_container">
            <div className="thumnail-box">
                <img className="thumnail" alt="non-image" src="img/non-image.png"></img>
            </div>
            <div className="content-box">
                <div className="portfolio_title">
                    <h3>{props.title}</h3>
                </div>
                <div className="portfolio_summary">
                    <p>{props.summary}</p>
                </div>
            </div>
            <div className="footer-box">
                <p>작성자 좋아요 123 조회수 123</p>
            </div>
        </div> 
    )
}

export default Portfolio;

