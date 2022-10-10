import React, {useState} from 'react';
import { useEffect } from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
    const [numPages, setNumPages] = useState(null); // 총 페이지수
    const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
    const [pageScale, setPageScale] = useState(1); // 페이지 스케일

    function onDocumentLoadSuccess({numPages}) {
        console.log(`numPages ${numPages}`);
        setNumPages(numPages);
    }
    
    

    return (
        <>
            {/* pdf 크기가 1280 * 720이 넘는 경우, overflow 처리 */}
            <div style={{width: '800px', height: 'auto', overflow: 'hidden', margin:'0 auto'}}>
                <Document file={process.env.PUBLIC_URL + "/pdf/TestPdf3.pdf"}  onLoadSuccess={onDocumentLoadSuccess}>
                    <Page width={790} height={600} scale={pageScale} pageNumber={1}/>
                </Document>
                <hr></hr>
                <Document file={process.env.PUBLIC_URL + "/pdf/TestPdf3.pdf"}  onLoadSuccess={onDocumentLoadSuccess}>
                    <Page width={790} height={600} scale={pageScale} pageNumber={2}/>
                </Document>
                <hr></hr>
                <Document file={process.env.PUBLIC_URL + "/pdf/TestPdf3.pdf"}  onLoadSuccess={onDocumentLoadSuccess}>
                    <Page width={790} height={1200} scale={pageScale} pageNumber={3}/>
                </Document>
            </div>
            <div>
                <p>
                    Page {pageNumber} of {numPages}
                </p>

                <p>페이지 이동 버튼</p>
                <button onClick={() => {
                    setPageNumber(numPages === pageNumber ? pageNumber : pageNumber + 1)
                }}> +
                </button>
                <button onClick={() => {
                    setPageNumber(pageNumber === 1 ? pageNumber : pageNumber - 1)
                }}> -
                </button>

                <p>페이지 스케일</p>
                <button onClick={() => {
                    setPageScale(pageScale === 3 ? 3 : pageScale + 0.1)
                }}> +
                </button>
                <button onClick={() => {
                    setPageScale((pageScale - 1) < 1 ? 1 : pageScale - 1)
                }}> -
                </button>
            </div>
        </>
    );
};

export default PdfViewer;