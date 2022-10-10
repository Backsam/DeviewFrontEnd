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


            <CKEditor
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
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />

            <InputTag></InputTag>
        </div>
    )
}

export default WritePortfolio;

