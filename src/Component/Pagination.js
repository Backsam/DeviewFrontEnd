import { useEffect, useState } from "react";
import "./Pagination.css"



function Paginaiton(props){

    let [currentPage, setCurrentPage] = useState(1);    //현제 페이지를 저장하는 변수
    let [totalPages, setTotalPages] = useState();        //총 페이지를 저장하는변수
    let [postPerPage, setPostPerPages] = useState();    //페이지당 보여줄 개수를 저장하는 변수

    const [pageNumberLimit, setPageNumberLimit] = useState(10);     //페이지네이션 개수를 저장하는 변수
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);   //최대 페이지네이션 개수를 저장하는 변수
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);    //최소 페이지 네이션 저

    //페이지네이션 첫 렌더링시 총 페이지수를 저장
    useEffect(() => {
        setTotalPages(17);
    },[])

    const pageNumber = [];
    for(let i= 1; i< totalPages+1; i++){
        pageNumber.push(i);
    }

    const nextPage = (page) => {
        if(page<=totalPages){
            setCurrentPage(page)

            if(currentPage+1> maxPageNumberLimit){
                setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit)
                setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
            }
        }
    }


    const prevPage = (page) => {
        if(page>0){
            setCurrentPage(page)
            if((currentPage-1)%pageNumberLimit==0){
                setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit)
                setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit)
            }
        }
    }

    const setPage = (page) => {
        setCurrentPage(page)
    }   

    //페이지네이션을 렌더하는 함수
    const renderPaginationNumber = pageNumber.map((number) => {
        if(number < maxPageNumberLimit+1 && number >minPageNumberLimit){
            return(
                <li className={currentPage === number ? "page-item active" : null} key={number} id={number}>
                    <button className="page-link" onClick={() => setPage(number)}>{number}</button >
                </li>
            )
        }else{
            return null
        }
    })






    return(
        <nav aria-label="PageNavigation">
            <ul className="PaginationBar">
                <li className="pageNationBtn">
                    <button onClick={() => prevPage(currentPage-1)}>Previous</button>
                </li>
                {renderPaginationNumber}
                <li className="pageNationBtn">
                    <button onClick={() => nextPage(currentPage+1)}>next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginaiton;