import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { fileCall } from "../../Hook/FileService";
import { Document, Page, pdfjs } from 'react-pdf';
import "./FileUploader.css"
import { call } from "../../Hook/ApiService";


const FileUploader = forwardRef((props, ref) => {

    const [file, setFile] = useState([]);
    const [flag, setFlag] = useState(false);

    useImperativeHandle(ref, () => ({
        // 부모 컴포넌트에서 사용할 함수를 선언
        submitFile,
        fileInfo,
    }))

    const handleFile = (event) => {
        const uploadfile = event.target.files;
        console.log(uploadfile);
        setFile(uploadfile);
        setFlag(true);
    }

    const submitFile = (api, method, viewId) => {

        console.log("receive viewId : " + viewId);

        const pdfFd = new FormData();
        for (let i = 0; i < file.length; i++) {
            pdfFd.append("file", file[i]);
        }
        pdfFd.append("viewId", viewId)
        fileCall(api, method , pdfFd)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                alert("pdf 업로드 오류 발생!")
            })
    }

    useEffect(() => {
        if (props.getFile != null && props.getFile != undefined) {
            setFile([]);
            var fileName = "pdf";
            fileCall(`/newfile/pdf/${props.getFile}`, "GET", null)
                .then(async res => {
                    var temp =  decodeURIComponent(res.headers.get("Content-Disposition"))
                    fileName = temp.substring(temp.lastIndexOf("=")+1).replace(/\"/gi, '');
                    return(await res.blob())
                })
                .then(blob =>{
                    const oriFile = new File([blob], fileName , {type : blob.type})
                    setFile(file.concat(oriFile));
                })
                .then(() =>{
                    console.log(file);
                    setFlag(true)
                })
            }
    }, [])


    const cancelFile = e => {
        setFlag(false)
        setFile([]);
    }

    const fileInfo = () => {
        console.log(file);
    }

    const [numPages, setNumPages] = useState(null); // 총 페이지수
    const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
    const [pageScale, setPageScale] = useState(1); // 페이지 스케일
    const pages = [];
    function onDocumentLoadSuccess({ numPages }) {
        console.log(`numPages ${numPages}`);
        setNumPages(numPages);

    }

    const selectFile = useRef("");

    return (
        <>
            {
                flag ?
                    <div className="fileResult">
                        <span>{file[0].name}</span>
                        <button onClick={cancelFile}> X</button>
                        <Document file={file[0]} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page width={790} height={600} scale={pageScale} pageNumber={1} loading={<>Pdf is loading</>} />
                        </Document>
                    </div>
                    :
                    <div className="drag-area">
                        <div className="icon">
                            <img src={process.env.PUBLIC_URL + "/img/filetype-pdf.svg"} />
                        </div>
                        <header>Drag & Drop to Upload PDF File</header>
                        <span>OR</span>
                        <button onClick={() => selectFile.current.click()}>Browse File</button>
                        <input type="file" name="pdf" id="file" accept=".pdf" onChange={handleFile} ref={selectFile} hidden />
                    </div>
            }
        </>
    )
});

export default FileUploader;