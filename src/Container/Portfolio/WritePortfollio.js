import "./WritePortfolio.css";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from "react";
import InputTag from "../../Component/Editor/InputTag";
import { call } from "../../Hook/ApiService";
import Editor from "../../Component/Editor/Editor";
import { useNavigate } from "react-router-dom";



function WritePortfolio({ props, setDesc, desc, setImage }) {
    const imgLink = "E:/과제물/3학년 2학기/Protofolio/front/public/"

    const [flag, setFlag] = useState(false);
    const [TapStatus, setTapStatus] = useState(0);

    const [portfolio, setPortfolo] = useState({
        title: '',
        summary: '',
        content: '',
        tags: ''
    })

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
                console.log(response)
                navi("/")
            }
        )
    }

    function changeForm(num) {
        setPortfolo({
            ...portfolio,
            content: ""
        })
        setTapStatus(num);
    }
    const uploadList = {
        0: <CKEditor
            editor={ClassicEditor}
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
                setPortfolo({
                    ...portfolio,
                    content: data
                })
                console.log(portfolio)
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />,
        1: <div className="FileUploadContainer">
            파일 업로드
        </div>
    };

    const customUploadAdapter = (loader) => { // (2)
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then((file) => {
                        data.append("name", file.name);
                        data.append("file", file);

                        // axios.post('/localhost:8080/api/uplode', data)
                        //     .then((res) => {
                        //         if (!flag) {
                        //             setFlag(true);
                        //             setImage(res.data.filename);
                        //         }
                        //         resolve({
                        //             default: `${imgLink}/${res.data.filename}`
                        //         });
                        //     })
                        //     .catch((err) => reject(err));
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

            <div className="FileUploadContainer">
                썸네일 업로드
            </div>
            <InputTag getTag={getTag}></InputTag>
            <button className="test" onClick={sumbitPorfolio}>클릭</button>
        </div>
    )
}

export default WritePortfolio;

