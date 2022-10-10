import "./Search.css";
import Dropdown from "../Component/Dropdown.js";
import { useEffect, useState } from "react";
import Portfolio from "../Component/Portfolio";
import { useNavigate, useLocation } from "react-router-dom";
import Paginaiton from "../Component/Pagination";

function Search(props) {

    const location = useLocation();
    useEffect(() => {
        
        console.log(location);
      }, [ location ])

    let navigate  = useNavigate();

    
    var params = new URLSearchParams(location.search)
    var query = params.get("query");
    
    if(query === null){
        query = ""
    }
    
    const [searchWord, setSearchWord] = useState();
    const [categorydropdownVisibility, setCategorydropdownVisibility] = useState(false);
    const [tagdropdownVisibility, setTagdropdownVisibility] = useState(false);


    function handleOnKeyPress(e){
        if(e.key === 'Enter'){
            navigate(`?query=${searchWord}`)
        }
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
                    placeholder="검색어를 입력하세요" 
                    defaultValue={query ? query : ""}
                    onChange={e => setSearchWord(e.target.value)}
                    onKeyDown={handleOnKeyPress}
                    >
                </input>

                <div className="Filters">
                    <div className="FilterMenu">
                        <button onClick={e => setCategorydropdownVisibility(!categorydropdownVisibility)}>
                            {
                                categorydropdownVisibility
                                    ? 'Close'
                                    : 'Open'
                            }
                        </button>
                        <Dropdown visivility={categorydropdownVisibility}>
                            <ul>
                                <li>포트폴리오</li>
                                <li>구인공고</li>
                                <li>구직공고</li>
                            </ul>
                        </Dropdown>
                    </div>


                    <div className="FilterMenu">
                        <button onClick={e => setTagdropdownVisibility(!tagdropdownVisibility)}>
                            {
                                tagdropdownVisibility
                                    ? 'Close'
                                    : 'Open'
                            }
                        </button>
                        <Dropdown visivility={tagdropdownVisibility}>
                            <ul>
                                <li>C#</li>
                                <li>Java</li>
                                <li>Python</li>
                                <li>Kotlin</li>
                                <li>SpringBoot</li>
                                <li>PHP</li>
                                <li>React</li>
                                <li>Vue.js</li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>

            </div>

            <div className="SearchResultWrapper">
                <h5>검색결과 : 0건</h5>
                <div className="SearchResult">
                        <Portfolio title="Prototype Project PortPolio" summary="머임"></Portfolio>
                        <Portfolio></Portfolio>
                        <Portfolio></Portfolio>
                        <Portfolio></Portfolio>
                        <Portfolio></Portfolio>
                        <Portfolio></Portfolio>
                        <Portfolio></Portfolio>
                        <Portfolio></Portfolio>
                        <Portfolio></Portfolio>
                </div>
            </div>

            <div className="PaginationWrapper">
                <Paginaiton></Paginaiton>    
            </div>






        </div>
    )
}
export default Search;