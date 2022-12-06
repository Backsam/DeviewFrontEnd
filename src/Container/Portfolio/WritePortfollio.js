import "./WritePortfolio.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef, useState } from "react";
import InputTag from "../../Component/Editor/InputTag";
import { call } from "../../Hook/ApiService";
import { useNavigate } from "react-router-dom";
import { fileCall } from "../../Hook/FileService";
import FileUploader from "../../Component/Editor/PdfUploader";
import ImageUploader from "../../Component/Editor/ImageUploader";


function WritePortfolio({ props, setDesc, desc}) {
    const imgLink = "E:/project/Deview/images"

    const [flag, setFlag] = useState(false);
    const [TapStatus, setTapStatus] = useState(0);
    const [image, setImage] = useState([]);
    const [portfolio, setPortfolo] = useState({
        title: '',
        summary: '',
        content: '',
        type : "DOCUMENT",
    })

    const pdfFileUploaderRef = useRef();
    const imageFileUploaderRef = useRef();

    const getValue = e => {
        const { name, value } = e.target;
        setPortfolo({
            ...portfolio,
            [name]: value
        })
        console.log(portfolio);
    };

    const getTag = (tagList) => {
        setPortfolo({
            ...portfolio,
            tags: tagList.join(",")
        })
        console.log(portfolio)
    }

    const navi = useNavigate();

    const sumbitPorfolio = e => {
        console.log(portfolio);
        call("/portfolio/write", "POST", portfolio)
            .then((response) =>{ 
                console.log(response.pfId)
                const viewId = response.pfId;
                imageFileUploaderRef.current.fileInfo()
                imageFileUploaderRef.current.submitFile("/newfile/thumbnail", "POST", viewId, "Portfolio");
                if(TapStatus == 1){
                    pdfFileUploaderRef.current.fileInfo();
                    pdfFileUploaderRef.current.submitFile("/newfile/pdf", "POST" , viewId);
                }
               navi(`/portfolio/${viewId}`)
            }
        )
    }

    function changeForm(num) {
        console.log(num);
        if(num === 0){
            console.log("DocumentReady");
            setPortfolo({
                ...portfolio,
                type : "DOCUMENT"
            })
        }else{
            console.log("PDFReady");
            setPortfolo({
                ...portfolio,
                type : "PDF",
                content : ""
            })
        }
        setImage([]);
        setTapStatus(num);
    }
    const uploadList = {
        0: 
        
        
        <CKEditor
            editor={ClassicEditor}
            config={{
                extraPlugins: [uploadPlugin],
            }}
            data=""
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setPortfolo({
                    ...portfolio,
                    content: data
                })
                console.log(portfolio)
            }}

        />,
        1: <FileUploader ref={pdfFileUploaderRef}/>
    };

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


    
    return (
        <div className='editorWrapper'>
            <input type="text"
                id="inputPortfolioTitle"
                name="title"
                placeholder="제목을 입력하세요"
                onChange={getValue}
            ></input>

            <textarea type="text"
                id="inputPortfolioSummary"
                name="summary"
                placeholder="개요를 입력하세요"
                onChange={getValue}
            ></textarea>
            <div className="orderContainer">
                <div className="orderList">
                    <ul>
                        <li><button className={TapStatus === 0 ? "is-active" : ""} type="button" onClick={() => changeForm(0)}>WriteDocument</button></li>
                        <li><button className={TapStatus === 1 ? "is-active" : ""} type="button" onClick={() => changeForm(1)}>UploadPDF</button></li>
                    </ul>
                </div>
            </div>
            {uploadList[TapStatus]}
            <div style={{marginTop : "30px"}}>
            <ImageUploader ref={imageFileUploaderRef}/>
            </div>

            <InputTag getTag={getTag}></InputTag>
            <div className="btnDiv">
                <button className="btnSubmit" onClick={sumbitPorfolio}>작성하기</button>
            </div>
        </div>
    )
}

export default WritePortfolio;