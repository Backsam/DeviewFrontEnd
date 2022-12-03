import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { fileCall } from "../../Hook/FileService";
import { Document, Page, pdfjs } from 'react-pdf';
import "./FileUploader.css"


const FileUploader = forwardRef((props, ref) => {

    const [flag, setFlag] = useState(false);
    const [imgFile, setImgFile] = useState([]);
    const [imgBase64, setImgBase64] = useState([]);

    useImperativeHandle(ref, () => ({
        // 부모 컴포넌트에서 사용할 함수를 선언
        submitFile,
        fileInfo
    }))

    const handleFile = (event) => {
        const uploadfile = event.target.files;
        console.log(uploadfile);
        setImgFile(uploadfile);
        setImgBase64([]);
        if (props.getFile == null && props.getFile == undefined) {
            for (let i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i]) {
                    let reader = new FileReader();
                    reader.readAsDataURL(uploadfile[i]);
                    reader.onloadend = () => {
                        const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
                        console.log(base64)
                        if (base64) {
                            let base64Sub = base64.toString()
                            setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        }
                    }
                }
            }
        }
        setFlag(true);
    }

    const submitFile = (api, method, viewId, viewType) => {
        console.log("receive viewId : " + viewId);
        if (imgFile !== null) {
            const fd = new FormData();
            for (let i = 0; i < imgFile.length; i++) {
                fd.append("file", imgFile[i]);
            }
            fd.append("viewId", viewId)
            fd.append("view", viewType)
            fileCall(api, method , fd)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                    alert("오류 발생!")
                })
        }
    }

    useEffect(() => {
        console.log(props.getFile);
        setImgFile([]);
        var fileName = "pdf";
        if (props.getFile != null && props.getFile != undefined) {
            fileCall(`/newfile/thumbnail/${props.getFile}`, "GET", null)
                .then(async res => {
                    var temp =  decodeURIComponent(res.headers.get("Content-Disposition"))
                    fileName = temp.substring(temp.lastIndexOf("=")+1).replace(/\"/gi, '');
                    console.log(decodeURI(fileName));
                    return (await res.blob())
                })
                .then(blob => {
                    console.log(blob)
                    const oriFile = new File([blob], fileName, { type: blob.type })
                    setImgFile(imgFile.concat(oriFile));
                })
        }
    }, [])

    useEffect(() => {
        if (props.getFile != null && props.getFile != undefined) {
            console.log(imgFile)
            setImgBase64([]);
            for (let i = 0; i < imgFile.length; i++) {
                if (imgFile[i]) {
                    let reader = new FileReader();
                    reader.readAsDataURL(imgFile[i]);
                    reader.onloadend = () => {
                        const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
                        console.log(base64)
                        if (base64) {
                            let base64Sub = base64.toString()
                            setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        }
                    }
                }
            }
            setFlag(true);
        }
    }, [imgFile])

    const cancelFile = e => {
        setFlag(false)
    }



    const fileInfo = () => {
        console.log(imgFile);
    }

    const selectFile = useRef("");

    return (
        <>
            {
                flag ?
                    <div className="fileResult">
                        <span>{imgFile[0] != null ? imgFile[0].name : imgFile.name}</span>
                        <button onClick={cancelFile}> X</button>
                        {
                            imgBase64?.map((item) => {
                                return (<img
                                    key={item}
                                    src={item}
                                    alt={"First slide"}
                                    style={{ width: "360px", height: "200px" }}
                                />
                                )
                            })
                        }
                    </div>
                    :
                    <div className="drag-area">
                        <div className="icon">
                            <img src={process.env.PUBLIC_URL + "/img/card-image.svg"} />
                        </div>
                        <header>Drag & Drop to Upload thumbnail File</header>
                        <span>OR</span>
                        <button onClick={() => selectFile.current.click()}>Browse File</button>
                        <input type="file" name="pdf" id="file" onChange={handleFile} ref={selectFile} hidden />
                    </div>
            }
        </>
    )
});

export default FileUploader;