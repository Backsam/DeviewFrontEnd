import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ApplyTable from "../../Component/Table/ApplyTable"
import { call } from "../../Hook/ApiService";
import "./ApplyListView.css"

function ApplyListView(props) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let {wjid} = useParams();

    useEffect(() => {
        call(`/apply/list/${wjid}`, "GET", null)
            .then((response) => {
                setData(response)
                setIsLoading(false)
            }).catch((error) => console.log(error))
    }, [])

    return (
        <div className='applyList'>
            <h1>Wanted Job 지원자 리스트</h1>
            <ApplyTable list={data}></ApplyTable>
        </div>
    )
}

export default ApplyListView;