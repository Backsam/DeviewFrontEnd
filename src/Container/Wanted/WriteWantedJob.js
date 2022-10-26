import { useRef, useState } from "react";
import Editor from "../../Component/Editor/Editor";
import InputTag from "../../Component/Editor/InputTag";
import "./WriteWantedJob.css";

function WriteWantedJob(props) {


    const [TapStatus, setTapStatus] = useState(0);

    const [nextId,setNextId] = useState(0);
    const [QuestionItems, setQuestionItem] = useState([]);

    const uploadList = {
        0: <Editor />,
        1: <div className="FileUploadContainer">
            파일 업로드
        </div>
    };

    
    function addQuestion(){
        if(nextId <3){
            setQuestionItem(QuestionItems.concat(<QuestionItem key={"question"+ nextId} num={nextId}/>))
            setNextId(nextId +1);
        }
    }

    function changeForm(num) {
        setTapStatus(num);
    }


    return (
        <div className="WriteWantedContainer">
            <form>
                <div className='editorWrapper'>
                    <input type="text"
                        id="inputPortfolioTitle"
                        placeholder="제목을 입력하세요"
                        autocomplete="off"
                    ></input>
                </div>

                <h2>Qualifications</h2>
                <div className="ConditionInfoWrapper">
                    <div className="recruitmentConditionWrapper">

                        <table>
                            <thead>
                                <th colSpan={3}>모집 조건</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>모집인원</td>
                                    <td><input type="text" name="personnel" placeholder="인원을입력해주세요" /></td>
                                </tr>
                                <tr>
                                    <td>분야</td>
                                    <td><input type="text" name="part" placeholder="모집분야를 입력해주세요" /></td>
                                </tr>
                                <tr>
                                    <td>학력</td>
                                    <td><input type="text" name="Education" placeholder="학력을 입력해주세요" /></td>
                                </tr>
                                <tr>
                                    <td>경력</td>
                                    <td><input type="text" name="career" placeholder="경력을 입력해주세요" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="workConditionWrapper">
                        <table>
                            <thead>
                                <th colSpan={3}>근무 조건</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>급여</td>
                                    <td><input type="text" name="pay" placeholder="급여를 입력해주세요" /></td>
                                </tr>
                                <tr>
                                    <td>근무시간</td>
                                    <td><input type="text" name="workingtime" placeholder="근무시간을 입력해주세요" /></td>
                                </tr>
                                <tr>
                                    <td>고용형태</td>
                                    <td><input type="text" name="type" placeholder="고용형태를 입력해주세요" /></td>
                                </tr>
                                <tr>
                                    <td>근무지역</td>
                                    <td><input type="text" name="area" placeholder="근무지역을 입력해주세요" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <h2>Detail</h2>
                <div className="orderContainer">
                    <div className="orderList">
                        <ul>
                            <li><button className={TapStatus === 0 ? "is-active" : ""} type="button" onClick={() => changeForm(0)}>WriteDocument</button></li>
                            <li><button className={TapStatus === 1 ? "is-active" : ""} type="button" onClick={() => changeForm(1)}>UploadPDF</button></li>
                        </ul>
                    </div>
                </div>
                {uploadList[TapStatus]}
                
                <h2>Question</h2>
                <div className="InputWrapper">
                    {QuestionItems}
                    <button type="button" onClick={addQuestion}>항목추가하기</button>
                </div>

                <h2>Tag</h2>
                <InputTag></InputTag>
                <button type="submit" id="submit">등록하기</button>
            </form>
        </div>
    )
    
    function QuestionItem(props) {
    return (
        <>  
            <textarea
                type="text"
                name={"question"+ props.num}
                placeholder="원하시는 자기소개서 항목을 입력해주세요"
            />
        </>
    )
}
}


export default WriteWantedJob;

