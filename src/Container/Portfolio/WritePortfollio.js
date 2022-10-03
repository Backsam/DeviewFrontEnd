import "./WritePortfolio.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function WritePortfolio(props) {
    return (
        <div className='editorWrapper'>
            <input type="text" 
                    id="inputPortfolioTitle"
                    placeholder="제목을 입력하세요"
                    ></input>
            <CKEditor
                editor={ClassicEditor}
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

            <div className="additionalInput">
                추가입력 공간
            </div>
        </div>
    )
}

export default WritePortfolio;