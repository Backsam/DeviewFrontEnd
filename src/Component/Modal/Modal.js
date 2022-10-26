import React, { useEffect } from 'react';
import './Modal.css'
import styled from 'styled-components';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, footer } = props;

  function Header(props) {
    const open = props.open;
    return (
      <>
      { open && props.children}
      </>
    )
  }

function Footer(props) {
  const open = props.open;
  return (
    <footer>
      {open && props.children}
    </footer>
  )
}






return (
  // 모달이 열릴때 openModal 클래스가 생성된다.
  <div className={open ? 'openModal modal' : 'modal'}>
    {open ? (
      <MoadalSection width={props.width} height={props.height}>
        <Header open={header}>
          <header>
          {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
        </Header>
        <main>{props.children}</main>
        <Footer open={footer}>

          <button className="close" onClick={close}>
            button
          </button>

        </Footer>
      </MoadalSection>
    ) : null}
  </div>
);
};

export default Modal;

const MoadalSection = styled.section`
  max-width : ${(props) => props.width ||  "450px"};
`;