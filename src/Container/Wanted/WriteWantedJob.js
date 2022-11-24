import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useRef, useState } from "react";
import FileUploader from "../../Component/Editor/PdfUploader";
import ImageUploader from "../../Component/Editor/ImageUploader";
import InputTag from "../../Component/Editor/InputTag";
import { call } from "../../Hook/ApiService";
import { fileCall } from "../../Hook/FileService";
import "./WriteWantedJob.css";
import { useNavigate } from "react-router-dom";

function WriteWantedJob(props) {


    const [TapStatus, setTapStatus] = useState(0);
    const [flag, setFlag] = useState(false);
    const [nextId, setNextId] = useState(0);
    const [image, setImage] = useState([]);

    const pdfFileUploaderRef = useRef();
    const imageFileUploaderRef = useRef();

    const [wanted, setWanted] = useState({
        title: '',
        summary: '',
        content: '',
        type: "DOCUMENT",
    })

    const [questionInput, setQuestionInput] = useState([])


    const getValue = e => {
        const { name, value } = e.target;
        setWanted({
            ...wanted,
            [name]: value
        })
        console.log(wanted);
    };
    

    const getTag = (tagList) => {
        setWanted({
            ...wanted,
            tags: tagList.join(",")
        })
        console.log(wanted)
    }

    const uploadList = {
        0: <CKEditor
            editor={ClassicEditor   }
            config={{
                extraPlugins: [uploadPlugin]
            }}
            data=""
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setWanted({
                    ...wanted,
                    content: data
                })
                console.log(wanted)
            }}
            
            />,
        1: <FileUploader ref={pdfFileUploaderRef}/>
    };


    function addQuestion() {
        if (nextId !== 3) {
            setQuestionInput([...questionInput, {}])
            setNextId(nextId + 1);
        }
    }

    function changeForm(num) {
        console.log(num);
        if(num === 0){
            console.log("DocumentReady");
            setWanted({
                ...wanted,
                type : "DOCUMENT"
            })
        }else{
            console.log("PDFReady");
            setWanted({
                ...wanted,
                type : "PDF",
                content : ""
            })
        }
        setTapStatus(num);
    }

    const customUploadAdapter = (loader) => { // (2)
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then((file) => {
                        data.append("name", file.name);
                        data.append("file", file);
                        fileCall("/file/image", "POST", data)
                            .then((res) => {
                                console.log(res);
                                if (!flag) {
                                    setFlag(true);
                                    setImage(res.filename);
                                }
                                resolve({
                                    default: `http://localhost:8080/file/image/${res.filename}`
                                });
                            })
                            .catch((err) => reject(err));
                    })
                })
            }
        }
    }

    function uploadPlugin(editor) { // (3)
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }
    const navi = useNavigate();

    const sumbit = e => {
        console.log(wanted);
        call("/wanted/write", "POST", wanted)
            .then((response) =>{ 
                console.log(response.wjId)
                const viewId = response.wjId;
                imageFileUploaderRef.current.fileInfo()
                imageFileUploaderRef.current.submitFile("/file/image", viewId, "WantedJob");
                if(TapStatus === 1){
                    pdfFileUploaderRef.current.fileInfo();
                    const viewId = response.wjId;
                    pdfFileUploaderRef.current.submitFile("/file/wanted/job/pdf/upload", viewId);
                }
                navi(`/wanted/job/view/${viewId}`)

            }
        )
    }

    return (
        <div className="WriteWantedContainer">
                <div className='editorWrapper'>
                    <input type="text"
                        id="inputPortfolioTitle"
                        name="title"
                        placeholder="제목을 입력하세요"
                        autoComplete="off"
                        onChange={getValue}
                    ></input>
                </div>

                <h2>Qualifications</h2>
                <div className="ConditionInfoWrapper">
                    <div className="recruitmentConditionWrapper">
                        <table>
                            <thead>
                                <tr><th colSpan={3}>모집 조건</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>모집인원</td>
                                    <td><input type="text" name="personnel" placeholder="인원을입력해주세요" onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>분야</td>
                                    <td><input type="text" name="part" placeholder="모집분야를 입력해주세요" onChange={getValue}/></td>
                                </tr>
                                <tr>
                                    <td>학력</td>
                                    <td><input type="text" name="education" placeholder="학력을 입력해주세요" onChange={getValue}/></td>
                                </tr>
                                <tr>
                                    <td>경력</td>
                                    <td><input type="text" name="career" placeholder="경력을 입력해주세요"onChange={getValue} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="workConditionWrapper">
                        <table>
                            <thead>
                                <tr>
                                 <th colSpan={3}>근무 조건</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>급여</td>
                                    <td><input type="text" name="pay" placeholder="급여를 입력해주세요"onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>근무시간</td>
                                    <td><input type="text" name="workingTime" placeholder="근무시간을 입력해주세요"onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>고용형태</td>
                                    <td><input type="text" name="employmentType" placeholder="고용형태를 입력해주세요"onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>근무지역</td>
                                    <td><input type="text" name="area" placeholder="근무지역을 입력해주세요" onChange={getValue}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <hr></hr>

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

                <hr></hr>

                <h2>Question</h2>
                <div className="InputWrapper">
                    {
                        questionInput.map((data,idx) =>(
                            <textarea key={idx}
                            type="text"
                            id={"question" + idx}
                            name={"question" + idx}
                            placeholder="원하시는 자기소개서 항목을 입력해주세요"
                            onChange={getValue}
                        />
                        ))
                    }
                    <button type="button" onClick={addQuestion}>항목추가하기</button>
                </div>
                
                <hr></hr>

                <ImageUploader ref={imageFileUploaderRef}></ImageUploader>
                
                <hr></hr>
                
                <h2>Tag</h2>
                <InputTag getTag={getTag}></InputTag>
                <button type="button" id="submit" onClick={sumbit}>등록하기</button>
        </div>
    )
}


export default WriteWantedJob;

