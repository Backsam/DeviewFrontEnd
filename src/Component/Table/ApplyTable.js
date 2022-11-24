import { Link } from "react-router-dom";
import "./ApplyTable.css"


function ApplyTable({ list }) {

    const openBrowser = (id) => {
        window.open(`http://localhost:3000/wanted/job/apply/view/${id}`, `apply`, 'width=1200, height=900, location=no, status=no, scrollbars=yes')
    }

    return (
        <table className="applyTable">
            <thead>
                <tr>
                    <th className="applicant">지원자</th>
                    <th className="part">지원분야</th>
                    <th className="career">경력</th>
                    <th className="education">학력</th>
                    <th className="applyDate">지원일</th>
                </tr>
            </thead>
            <tbody>
                {
                    list?.map((ap, idx) => {

                        var originDate = ap.modifiedDate+"";
                        var date = originDate?.substring(0, 10);

                        return (
                            <tr className="applyView" onClick={() => openBrowser(ap.id)}>
                                <td>
                                    <div className="apply">
                                        <div className="applyImgWrapper">
                                            <img src={process.env.PUBLIC_URL + "/img/letsPlay-icon.png"} alt=""></img>
                                        </div>
                                        <div className="applyProfile">
                                            <h5>{ap.userId}</h5>
                                        </div>
                                    </div>
                                </td>
                                <td>{ap.part}</td>
                                <td>{ap.carrer}</td>
                                <td>{ap.education}</td>
                                <td>{date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ApplyTable;