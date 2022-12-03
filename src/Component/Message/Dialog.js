import React from 'react';
import styled from 'styled-components';

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

function Dialog({ title, children, confirmText, cancelText, onConfirm, onCancel, open }) {
    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <DarkBackground>
                    <DialogBlock>
                        <h3>{title}</h3>
                        <p>{children}</p>
                        <ButtonGroup>
                            <button onClick={onCancel}>{cancelText}</button>
                            <button onClick={onConfirm}>{confirmText}</button>
                        </ButtonGroup>
                    </DialogBlock>
                </DarkBackground>
            ) : null}
        </div>
    );
}

Dialog.defaultProps = {
    confirmText: '확인',
    cancelText: '취소'
};

export default Dialog;