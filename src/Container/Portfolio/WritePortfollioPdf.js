import "./WritePortfolio.css";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from "react";
import InputTag from "../../Component/Editor/InputTag";

function WritePortfolio({ props, setDesc, desc, setImage }) {

    const [flag, setFlag] = useState(false);
    const imgLink = "E:/과제물/3학년 2학기/Protofolio/front/public/"

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
                placeholder="제목을 입력하세요"
            ></input>

            <textarea type="text"
                id="inputPortfolioSummary"
                placeholder="개요를 입력하세요"
            ></textarea>
            <div className="FileUploadContainer">
                썸네일 업로드
            </div>
            <div className="FileUploadContainer">
                파일 업로드
            </div>

            <InputTag></InputTag>
        </div>
    )
}

export default WritePortfolio;

