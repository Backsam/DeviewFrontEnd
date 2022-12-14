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
                imageFileUploaderRef.current.submitFile("/wantedjobfile/thumbnail", "POST", viewId, "WantedJob");
                if(TapStatus === 1){
                    pdfFileUploaderRef.current.fileInfo();
                    const viewId = response.wjId;
                    pdfFileUploaderRef.current.submitFile("/wantedjobfile/pdf", "POST", viewId);
                }
                // navi(`/wanted/job/view/${viewId}`)

            }
        )
    }

    return (
        <div className="WriteWantedContainer">
                <div className='editorWrapper'>
                    <input type="text"
                        id="inputPortfolioTitle"
                        name="title"
                        placeholder="????????? ???????????????"
                        autoComplete="off"
                        onChange={getValue}
                    ></input>
                </div>

                <h2>Qualifications</h2>
                <div className="ConditionInfoWrapper">
                    <div className="recruitmentConditionWrapper">
                        <table>
                            <thead>
                                <tr><th colSpan={3}>?????? ??????</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>????????????</td>
                                    <td><input type="text" name="personnel" placeholder="???????????????????????????" onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>??????</td>
                                    <td><input type="text" name="part" placeholder="??????????????? ??????????????????" onChange={getValue}/></td>
                                </tr>
                                <tr>
                                    <td>??????</td>
                                    <td><input type="text" name="education" placeholder="????????? ??????????????????" onChange={getValue}/></td>
                                </tr>
                                <tr>
                                    <td>??????</td>
                                    <td><input type="text" name="career" placeholder="????????? ??????????????????"onChange={getValue} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="workConditionWrapper">
                        <table>
                            <thead>
                                <tr>
                                 <th colSpan={3}>?????? ??????</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>??????</td>
                                    <td><input type="text" name="pay" placeholder="????????? ??????????????????"onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>????????????</td>
                                    <td><input type="text" name="workingTime" placeholder="??????????????? ??????????????????"onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>????????????</td>
                                    <td><input type="text" name="employmentType" placeholder="??????????????? ??????????????????"onChange={getValue} /></td>
                                </tr>
                                <tr>
                                    <td>????????????</td>
                                    <td><input type="text" name="area" placeholder="??????????????? ??????????????????" onChange={getValue}/></td>
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
                            placeholder="???????????? ??????????????? ????????? ??????????????????"
                            onChange={getValue}
                        />
                        ))
                    }
                    <button type="button" onClick={addQuestion}>??????????????????</button>
                </div>
                
                <hr></hr>

                <ImageUploader ref={imageFileUploaderRef}></ImageUploader>
                
                <hr></hr>
                
                <h2>Tag</h2>
                <InputTag getTag={getTag}></InputTag>
                <button type="button" id="submit" onClick={sumbit}>????????????</button>
        </div>
    )
}


export default WriteWantedJob;

