import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { fileCall } from "../../Hook/FileService";
import { Document, Page, pdfjs } from 'react-pdf';
import "./FileUploader.css"


const FileUploader = forwardRef((props, ref) =>{

    const [flag, setFlag] = useState(false);
    const [imgFile, setImgFile] = useState(null);
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
        for(let i=0 ; i<uploadfile.length ; i++) {
            if(uploadfile[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(uploadfile[i]);
                reader.onloadend = () => {
                    const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
                    console.log(base64)
                    if(base64) {
                        let base64Sub = base64.toString()
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                    }
                }
            }
        }
        setFlag(true);
    }

    const submitFile = (api, viewId, viewType) =>{
        console.log("receive viewId : " + viewId);
        if(imgFile !== null){
            const fd = new FormData();
            for(let i=0 ; i<imgFile.length ; i++) {
                fd.append("file", imgFile[i]);
            }
            fd.append("viewId", viewId)
            fd.append("view", viewType)                 
            fileCall(api, "POST", fd)
            .then((response) =>{
                console.log(response)
            })
            .catch((error) =>{
                console.log(error)
                alert("오류 발생!")
            })
        }
    }

    const cancelFile = e =>{
        setFlag(false)
        setImgFile("")
    }

    
    const fileInfo = () => {
        console.log(imgFile);
    }

    const selectFile = useRef("");

    return(
        <>       
        {
            flag ?
            <div className="fileResult">
            <span>{imgFile[0].name}</span>
            <button onClick={cancelFile}> X</button>
            {
                    imgBase64.map((item) =>{
                       return( <img
                        key={item}
                        src={item}
                        alt={"First slide"}
                        style={{width:"360px", height:"200px"}}
                    />
                    )})
            }
            </div>
            :
            <div className="drag-area">
                <div className="icon">
                    <img src={process.env.PUBLIC_URL + "/img/card-image.svg"}/>
                </div>
                <header>Drag & Drop to Upload thumbnail File</header>
                <span>OR</span>
                <button onClick={() => selectFile.current.click()}>Browse File</button>
                <input type="file" name="pdf" id="file" onChange={handleFile} ref={selectFile} hidden/>
            </div>
        }
        </>
    )
});

export default FileUploader;