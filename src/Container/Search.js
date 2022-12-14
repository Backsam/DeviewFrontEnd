import "./Search.css";
import Dropdown from "../Component/Dropdown.js";
import { useEffect, useState } from "react";
import Portfolio from "../Component/Portfolio";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { call } from "../Hook/ApiService";
import InputTag from "../Component/Editor/InputTag";

function Search(props) {

    const location = useLocation();
    let navigate = useNavigate();


    var params = new URLSearchParams(location.search)

    var type = params.get("type");
    var keyword = params.get("keyword");
    var tags = params.get("tags");


    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalElements, settotalElements] = useState(0);
    const [searchWord, setSearchWord] = useState(keyword);
    const [searchTag, setSearchTag] = useState(tags?[...tags]:[]);
    const [searchType, setType] = useState(type || 0);
    const [categorydropdownVisibility, setCategorydropdownVisibility] = useState(false);


    useEffect(() => {
        call(`/search/?type=${type}&keyword=${keyword}&tags=${tags}`, "GET", null)
            .then((response) => {
                console.log(response.content)
                settotalElements(response.totalElements)
                setData(response.content);
                setIsLoading(false);
            })
    }, [location])


    function sumbitSearch(type, keyword, tags){
        console.log("type : " + type + " keyword : " + keyword + " tags :" + tags)
        navigate(`?type=${type}&keyword=${keyword}&tags=${tags}`)

    }

    function handleOnKeyPress(e) {
        if (e.key === 'Enter') {
            sumbitSearch(searchType, searchWord, searchTag)
        }
    }

    const selectType = (num) => {
        if(num !== searchType){
            setType(num)
            sumbitSearch(num, searchWord, searchTag);
        }
        setCategorydropdownVisibility(false);
    }

    const getTag = (tagList) => {
        setSearchTag(tagList)
        sumbitSearch(searchType, searchWord, tagList);
        console.log(searchTag)
    }

    return (
        <div className="SearchContainer">
            <div className="SearchWrapper">
                <div className="iconWrapper">
                    <img id="SearchIcon" src={process.env.PUBLIC_URL + '/img/search.svg'}></img>
                </div>
                <input
                    id="Search"
                    type="text"
                    placeholder="???????????? ???????????????"
                    defaultValue={searchWord ? searchWord : ""}
                    onChange={e => setSearchWord(e.target.value)}
                    onKeyDown={handleOnKeyPress}
                >
                </input>
                <div className="Filters">         
                    <div className="FilterMenu">
                        <button onClick={e => setCategorydropdownVisibility(!categorydropdownVisibility)}>
                            {
                                categorydropdownVisibility
                                    ? '????????????'
                                    : type == 0? "???????????????":
                                         type  == 1? "?????? ??????":
                                         type  == 2? "??????":
                                        "undefined"

                            }
                        </button>
                        <Dropdown visivility={categorydropdownVisibility}>
                            <ul>
                                <li><button onClick={() =>selectType(0)}>???????????????</button></li>
                                <li><button onClick={() =>selectType(1)}>?????? ??????</button></li>
                                <li><button onClick={() =>selectType(2)}>??????</button></li>
                            </ul>
                        </Dropdown>
                    </div>
                    <div style={{width : "1100px"}}>
                    <InputTag getTag={getTag}></InputTag>
                    </div>
                </div>

            </div>

            <div className="SearchResultWrapper">
                <h5>???????????? : {totalElements}???</h5>
                <div className="SearchResult">
                    {isLoading ? <p>?????????</p> :
                        data.length > 0?
                        data?.map((pf, idx) => (
                            <Link key={idx} to={`/portfolio/${pf.pfId}`} style={{ color: "black", textDecoration: "none" }}>
                                <Portfolio boardType="Portfolio"
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
                        :<p>"{keyword}"??? ?????? ??????????????? ????????????.</p>
                    }
                </div>
            </div>
        </div>
    )
}
export default Search;